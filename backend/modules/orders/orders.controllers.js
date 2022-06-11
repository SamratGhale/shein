const OrdersModel = require('./orders.model');
const ClothesModel = require('../clothes/clothes.model');
const CartItemsModel = require('../cart_items/cart_items.model')
const { User } = require('../users/user.controllers');
const { PAYMENT_METHODS, PLACEMENT } = require('../../constants/order');
const { DataUtils } = require('../../utils/data');
const userModel = require('../users/user.model');

const Orders = {
  async list({ start, limit }) {
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

  async add(payload, token) {
    var user = (await User.validateToken(token)).user;

    const { user_id, payment_method, items, delivery_type, location, lat_long } = payload;

    /* user_id is extracted from token but admin can pass a different user_id */

    if (user_id) {
      if (user.role == "ADMIN" || user.role == "SUPER ADMIN") {
        user = await userModel.findById(user_id);
      } else {
        throw { message: 'only admin can send user_id', code: 400 };
      }
    }

    if (!user) {
      throw { message: "Invalid user", code: 400 };
    }

    //Calculate duedate
    //TODO: make due days a constant variables
    var delivery_duedate = (new Date(Date.now()));
    delivery_duedate.setDate(delivery_duedate.getDate() + 3);

    //Most of the values are default, these are the values we need to get from users

    try {
      
      /* Parsing the items array and finding it's id ans storing it in an array*/
      const new_items = await Promise.all(items.map(async i => {

        /* i is a string */
        const item = JSON.parse(i);
        var item_info = [];
        if(item.item_code){
          item_info = await ClothesModel.find({ item_code: item.item_code });
        }
        else if(item.item_id){
          item_info = await ClothesModel.findById(item.item_id);
          if (!item_info) {
            throw { message: `item with item id ${item.item_id} not found `, code: 400 };
          }
          return item_info;
        }

        
        /*find returns array and if item dosen't exist it's length will be zero */
        if (!item_info.length) {
          throw { message: `item with item code ${item.item_code} not found `, code: 400 };
        }
        return item_info[0];
      }))

      const item_objects = new_items.map(i => {
        return { item_id: i.id, quantity: i.quantity}
      })
      const order = {
        user_id: user._id,
        payment_method: payment_method || PAYMENT_METHODS.CASH,
        delivery_type: delivery_type || PLACEMENT.SELF_PICKUP,
        delivery_duedate,
        location,
        lat_long,
        items: item_objects
      }

      const res = await OrdersModel.create(order);

       await Promise.all(item_objects.map(async (item)=>{
        await CartItemsModel.findOneAndDelete({item_id: item.item_id, user_id: user._id});
      }))

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

  add: (req) => {
    const token = req.params.token || req.headers.access_token;
    return Orders.add(req.payload, token);
  },
}