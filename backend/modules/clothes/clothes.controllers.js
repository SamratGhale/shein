const ClothesModel = require("./clothes.model");
const fs = require("fs");
const { DataUtils } = require("../../utils/data");

const Clothes = {
  async add(data) {
    try {
      const res = await ClothesModel.create(data);
      //Add image

      const dir = `./modules/clothes/images/${res._id}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      var failed = false;
      if (Array.isArray(data.images)) {
        data.images.forEach((image, i) => {
          console.log(image.hapi.filename.split("."));
          var arr = image.hapi.filename.split(".");
          const ext = arr[arr.length - 1];
          if (!["img", "jpg", "png", "gif", "jpeg", "jfif"].includes(ext)) {
            failed = true;
            ClothesModel.findByIdAndDelete(res.id).then(() => {
              fs.rmSync(dir, { recursive: true, force: true });
              return;
            });
          }
          fs.writeFileSync(
            `${dir}/${image.hapi.filename}`,
            image._data,
            (err) => {
              throw {
                message: "couldn't upload image please try again",
                code: 404,
              };
            }
          );
        });
      }

      if (failed) {
        throw {
          message: "Image format not valid please try again!",
          code: 404,
        };
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);
      if (err.message) {
        return err;
      }
      throw { message: "Could't add the item please try again", code: 400 };
    }
  },
  async list({ start, limit, search, category, min_price, max_price }) {
    const query = [];
    if (search) {
      query.push({
        $match: {
          'item_name': {
            $regex: new RegExp(search, 'gi')
          }
        }
      });
    }
    if (category) {
      query.push({
        $match: {
          'tags': {
            $in: [category]
          }
        }
      });
    }
    if (min_price) {
      query.push({
        $match: {
          item_price: {
            $gte: min_price
          }
        }
      });
    }
    if (max_price) {
      query.push({
        $match: {
          item_price: {
            $lte: max_price
          }
        }
      });
    }
    const res = await DataUtils.paging({
      start,
      limit,
      model: ClothesModel,
      query,
    });

    res.data.forEach(async (item, i) => {
      if (fs.existsSync(`./modules/clothes/images/${item._id}`)) {
        res.data[i].files = fs.readdirSync(
          `./modules/clothes/images/${item._id}`
        );
      } else {
        res.data[i].files = new Array();
      }
    });

    return res;
  },
  async getById(_id) {
    const ret = await ClothesModel.findOne({ _id, is_archived: false }).lean();
    if(!ret){
      throw {message: `Item with code ${item_code} dosen't exist`, code : 404};
    }
    if(fs.existsSync(`./modules/clothes/images/${ret._id}`)){
      ret.files = fs.readdirSync(`./modules/clothes/images/${ret._id}`);
    }else{
      ret.files = []
    }
    return ret;
  },
  async getByItemCode(item_code) {
    const ret = await ClothesModel.findOne({ item_code, is_archived: false }).lean();
    if(!ret){
      throw {message: `Item with code ${item_code} dosen't exist`, code : 404};
    }
    if(fs.existsSync(`./modules/clothes/images/${ret._id}`)){
      ret.files = fs.readdirSync(`./modules/clothes/images/${ret._id}`);
    }else{
      ret.files = []
    }
    return ret;
  },
  async update(id, data) {
    console.log(data)
    const item = await ClothesModel.findById(id);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else {
      try {
        //Add image

        const res = await ClothesModel.findByIdAndUpdate(id, data);

        var dir = `./modules/clothes/images/${id}`;

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }else{
          fs.rmSync(dir, { recursive: true, force: true });
          fs.mkdirSync(dir, { recursive: true });
        }
        var failed = false;
        if (Array.isArray(data.images)) {
          data.images.forEach((image, i) => {
            console.log(image.hapi.filename.split("."));
            var arr = image.hapi.filename.split(".");
            var ext = arr[arr.length - 1];
            if (!["img", "jpg", "png", "gif", "jpeg", "jfif"].includes(ext)) {
              failed = true;
              ClothesModel.findByIdAndDelete(res.id).then(() => {
                fs.rmSync(dir, { recursive: true, force: true });
                return;
              });
            }
            if (!fs.existsSync(`./modules/clothes/images/${id}/${image.hapi.filename}`)) {
              console.log(image.hapi)
              fs.writeFileSync(
                `${dir}/${image.hapi.filename}`,
                image._data,
                (err) => {
                  throw {
                    message: "couldn't upload image please try again",
                    code: 404,
                  };
                }
              );
            }
          });
        }

        if (failed) {
          throw {
            message: "Image format not valid please try again!",
            code: 404,
          };
        } else {
          return res;
        }
      } catch (err) {
        console.log(err);
        if (err.message) {
          return err;
        }
        throw { message: "Could't add the item please try again", code: 400 };
      }
    }
  },
  async getAllTags() {
    const found = await ClothesModel.find().lean();
    const ret = new Set();
    found.forEach(i => {
      i.tags.forEach((j) => ret.add(j));
    })
    return Array.from(ret);
  },
  async getMinMaxPrice() {
    const min = (await ClothesModel.find().sort('item_price'))[0].item_price;
    const max = (await ClothesModel.find().sort([['item_price', -1]]))[0].item_price;
    return { max, min };
  },
  async archive(id) {
    return ClothesModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async decreaseItem(id, qty) {
    const item = await this.getById(id);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else if (item.quantity < qty) {
      throw { message: "Not enought item", code: 400 };
    } else {
      item.quantity = item.quantity - qty;
      return await this.update(id, item);
    }
  },
  async increaseItem(id, qty) {
    const item = await this.getById(id);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else {
      item.quantity = item.quantity + qty;
      return await this.update(id, item);
    }
  },
};

module.exports = {
  Clothes,
  register: (req) => Clothes.add(req.payload),
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 8;
    const category = req.query.category || '';
    const search = req.query.search || '';
    const min_price = Number(req.query.min_price) || 0;
    const max_price = Number(req.query.max_price) || 0;
    return Clothes.list({
      start,
      limit,
      category,
      search,
      min_price,
      max_price
    })
  },

  getMinMaxPrice: () => {
    return Clothes.getMinMaxPrice();
  },
  decreaseItem: (req) => {
    return Clothes.decreaseItem(req.params.id, req.payload.qty);
  },
  increaseItem: (req) => {
    return Clothes.increaseItem(req.params.id, req.payload.qty);
  },
  update: (req) => {
    return Clothes.update(req.params.id, req.payload);
  },
  getById: (req) => Clothes.getById(req.params.id),
  getByItemCode: (req) => Clothes.getByItemCode(req.params.item_code),
  archive: (req) => Clothes.archive(req.params.id),
  getAllTags: (req) => Clothes.getAllTags(),
};
