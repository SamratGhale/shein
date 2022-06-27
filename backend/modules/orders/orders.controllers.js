const OrdersModel = require('./orders.model');
const fs = require('fs')
const ClothesModel = require('../clothes/clothes.model');
const CartItemsModel = require('../cart_items/cart_items.model')
const { User } = require('../users/user.controllers');
const { PAYMENT_METHODS, PLACEMENT } = require('../../constants/order');
const { DataUtils } = require('../../utils/data');
const userModel = require('../users/user.model');
const { default: mongoose } = require('mongoose');

const Orders = {
  async getById(id) {
    const res = await OrdersModel.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $lookup: {
        from: 'User',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user_detail',
      }
    },
    {
      $lookup: {
        from: 'clothes',
        localField: 'items.item_id',
        foreignField: '_id',
        as: 'item_details',
      }
    }
      , {
      $project: {
        "user_detail.password": 0,
        "user_detail.is_archived": 0,
        "user_detail.is_registered": 0,
        "user_detail.role": 0,
        "user_detail.created_at": 0,
        "user_detail.updated_at": 0,
        "user_detail.__v": 0
      },
    }
    ]);
    console.log(res)
    res[0].item_details.forEach(async (item, i) => {
      if (fs.existsSync(`./modules/clothes/images/${item._id}`)) {
        res[0].item_details[i].files = fs.readdirSync(
          `./modules/clothes/images/${item._id}`
        );
        res[0].item_details[i].cart_quantity = res[0].items[i].quantity;
      } else {
        res.data[i].files = new Array();
      }
    });
    return res;
  },
  async list({ start, limit, token }) {
    const query = [];
    query.push({
      $lookup: {
        from: 'User',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user_detail',
      },
    })
    query.push({
      $project: {
        "user_detail.password": 0,
        "user_detail.is_archived": 0,
        "user_detail.is_registered": 0,
        "user_detail.role": 0,
        "user_detail.created_at": 0,
        "user_detail.updated_at": 0,
        "user_detail.__v": 0
      }

    })

    const res = await DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: OrdersModel,
      query,
    });
    return res;
  },
  async getMyOrders({ start, limit, token }) {
    const query = [];

    var user = (await User.validateToken(token)).user;
	
	if(!user){
		throw {message :" User dosen't exist", code : 404}
	}

    query.push({
      $lookup: {
        from: 'clothes',
        localField: 'items.item_id',
        foreignField: '_id',
        as: 'items_details',
      },
    })

    query.push({
      $match: {
		user_id: user._id
      },
    })

    query.push({
      $project: {
        "user_detail.password": 0,
        "user_detail.is_archived": 0,
        "user_detail.is_registered": 0,
        "user_detail.role": 0,
        "user_detail.created_at": 0,
        "user_detail.updated_at": 0,
        "user_detail.__v": 0
      }

    })

    const res = await DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: OrdersModel,
      query,
    });

	  res.data.forEach(async (item, i) => {
		  if (item.items_details[0]) {
			  item.items_details.forEach((cloth,j) => {
				  res.data[i].items_details[j].files = fs.readdirSync(`./modules/clothes/images/${item.items_details[j]._id}`);
			  })
		  }
	  })
    return res;
  },

  async add(payload, token) {
    var user = (await User.validateToken(token)).user;

    var { user_email, status, payment_method, items, delivery_type, delivery_duedate, location, lat_long } = payload;

    /* user_email is extracted from token but admin can pass a different user_id */
    var is_admin = false

    if (user_email) {
      if (user.role == "ADMIN" || user.role == "SUPER ADMIN") {
        user = await userModel.findOne({ email: user_email });
        is_admin = true;
      } else {
        throw { message: 'only admin can send user_id', code: 400 };
      }
    }

    if (!user) {
      throw { message: "Invalid user", code: 400 };
    }

    //Calculate duedate
    //TODO: make due days a constant variables
    if (!delivery_duedate) {
      delivery_duedate = (new Date(Date.now()));
      delivery_duedate.setDate(delivery_duedate.getDate() + 3);
    }

    //Most of the values are default, these are the values we need to get from users

    try {

      /* Parsing the items array and finding it's id ans storing it in an array*/
      const new_items = await Promise.all(items.map(async i => {

        /* i is a string */
        const item = JSON.parse(i);
        var item_info = [];
        if (item.item_code) {
          item_info = await ClothesModel.findOne({ item_code: item.item_code });
          if (!item_info) {
            throw { message: `item with item code ${item.item_code} not found `, code: 400 };
          }
        }

        else if (item.item_id) {
          item_info = await ClothesModel.findById(item.item_id);
          if (!item_info) {
            throw { message: `item with item id ${item.item_id} not found `, code: 400 };
          }
        }


        return { item_id: item_info._id, quantity: item.cart_quantity || item.quantity };
      }))

      var order = {
        user_id: user._id,
        payment_method: payment_method || PAYMENT_METHODS.CASH,
        delivery_type: delivery_type || PLACEMENT.SELF_PICKUP,
        delivery_duedate,
        location,
        lat_long,
        items: new_items
      }

      if (is_admin && status) {
        console.log("I'm here");
        order = { ...order, status: status };
      }

      const res = await OrdersModel.create(order);
      return res;
    } catch (err) {
      throw err;
    }
  },
  async update(order ,id, token) {
    var user = (await User.validateToken(token)).user;
    const old_order = await OrdersModel.findById(id);
    if (!user) {
      throw { message: "Invalid user", code: 400 };
    }
    if(!old_order){
      throw {message : "Order not found", code : 404};
    }

    var {  items } = order;

    try {
      /* Parsing the items array and finding it's id ans storing it in an array*/
      if (items) {
        const new_items = await Promise.all(items.map(async i => {

          /* i is a string */
          const item = i;
          var item_info = [];
          if (item.item_code) {
            item_info = await ClothesModel.findOne({ item_code: item.item_code });
            if (!item_info) {
              throw { message: `item with item code ${item.item_code} not found `, code: 400 };
            }
          }

          else if (item.item_id) {
            item_info = await ClothesModel.findById(item.item_id);
            if (!item_info) {
              throw { message: `item with item id ${item.item_id} not found `, code: 400 };
            }
          }


          return { item_id: item_info._id, quantity: item.cart_quantity || item.quantity };
        }))
        var order = {
          ...order,
          items: new_items
        }
      }

      const res = await OrdersModel.findByIdAndUpdate(id, order);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  Orders,
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 8;
    return Orders.list({
      start,
      limit,
    })
  },
  getById: (req) => Orders.getById(req.params.id),
  getMyOrders: (req)=>{
    const token = req.params.token || req.headers.access_token;
    const start = req.query.start || 0;
    const limit = req.query.limit || 8;
    return Orders.getMyOrders({
      start,
      limit,
	  token
    })
  },
  add: (req) => {
    const token = req.params.token || req.headers.access_token;
    return Orders.add(req.payload, token);
  },
  update: (req) => {
    const token = req.params.token || req.headers.access_token;
    const id = req.params.id ;
    return Orders.update(req.payload,id, token);
  },
}