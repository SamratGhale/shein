const ClothesModel = require('./clothes.model');
const fs = require('fs');

const Clothes= {
  async add(data) {
    try{
      const res = await ClothesModel.create(data);
      //Add image
    
      const dir = `./modules/clothes/images/${res._id}`;

      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive : true});
      }
      var failed = false;
      if(Array.isArray(data.images)){
        data.images.forEach((image, i)=>{
          const ext = image.hapi.filename.split('.').at(-1);
          if (!['img', 'jpg', 'png', 'gif'].includes(ext)) {
            failed = true;
            ClothesModel.findByIdAndDelete(res.id).then(() => {
              fs.rmSync(dir, { recursive: true, force: true });
              return;
            }
            );
          }
          fs.writeFileSync(`${dir}/${image.hapi.filename}`, image._data, err => {
              throw { message: "couldn't upload image please try again", code: 404 };
          })
        })
      }

      if (failed) {
        throw { message: "Image format not valid please try again!", code: 404 };
      }else{
        return res;
      }
    }catch(err){
      if(err.message){
        return err;
      }
      throw {message:"Could't add the item please try again", code:400};
    }
  },
  async list() {
    const res = await ClothesModel.find().lean();
    res.forEach(async (item, i) => {
      res[i].files = fs.readdirSync(`./modules/clothes/images/${item._id}`);
    })
    return res;
  },
  async getById(_id) {
    const ret = await ClothesModel.findOne({ _id, is_archived: false });
    return ret;
  },
  async update(id, data) {
    const item = await ClothesModel.findById(id);
    if (!item) {
      throw { message: "Item not found", code: 4000 };
    } else {
      return await ClothesModel.findByIdAndUpdate(id, data);
    }
  },
  async archive(id) {
    return ClothesModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async decreaseItem(id, qty) {
    const item = await this.getById(id);
    console.log(qty);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else if (item.quantity < qty) {
      throw { message: "Not enought item", code: 400 };
    } else {
      item.quantity = item.quantity -  qty;
      return await this.update(id, item);
    }
  },
  async increaseItem(id, qty) {
    const item = await this.getById(id);
    console.log(qty);
    if (!item) {
      throw { message: "Item not found", code: 400 };
    } else {
      item.quantity = item.quantity +  qty;
      return await this.update(id, item);
    }
  },
};

module.exports = {
  Clothes,
  register: (req) => Clothes.add(req.payload),
  list: (req) => Clothes.list(),
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
  archive: (req) => Clothes.archive(req.params.id),
};