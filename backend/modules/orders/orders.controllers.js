const OrdersModel = require('./orders.model');
const { User } = require('../users/user.controllers');
const { PAYMENT_METHODS, PLACEMENT } = require('../../constants/order');
const OrderItemsModel = require('./order_items.model');
const { DataUtils } = require('../../utils/data');

const Orders = {
  async list({start, limit}){
    const query = [];
    query.push({
      $lookup: {
        from: 'OrderItems',
        localField: '_id',
        foreignField: 'order_id',
        as: 'items',
      }
    });
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
            "user_detail.password":0,
            "user_detail.is_archived":0,
            "user_detail.is_registered":0,
            "user_detail.role":0,
            "user_detail.created_at":0,
            "user_detail.updated_at":0,
            "user_detail.__v":0
        }

    })

    const res = await DataUtils.paging({
      start,
      limit,
      sort: {created_at: -1},
      model: OrdersModel,
      query,
    });
    return res;
  },
  async add(payload, token) {
    const user = (await User.validateToken(token)).user;
    if (!user) {
      throw { message: "Invalid user", code: 404 };
    }

    const { payment_method,items, delivery_type, location, lat_long } = payload;
    
    //Calculate duedate
    //TODO: make due days a constant variables
    var delivery_duedate = (new Date(Date.now()));
    delivery_duedate.setDate(delivery_duedate.getDate() + 3);

    //Most of the values are default, these are the values we need to get from users
    const order = {
      user_id: user._id,
      payment_method: payment_method || PAYMENT_METHODS.CASH,
      delivery_type: delivery_type || PLACEMENT.SELF_PICKUP,
      delivery_duedate,
      location,
      lat_long
    }
    const res = await OrdersModel.create(order);
    const item_objects = items.map(i=>{
      const item = JSON.parse(i);
      return {item_id: item.item_id, quantity: item.quantity, order_id: res.id }
    })

    await OrderItemsModel.insertMany(item_objects)
    return res;
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