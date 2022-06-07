const Clothes = require('./clothes/clothes.routes')
const Role = require('./users/role.routes')
const Users = require('./users/user.routes')
const Cart = require('./cart_items/cart_items.routes')
const Order = require('./orders/orders.routes')

module.exports = {
  Clothes,
  Role,
  Users,
  Cart,
  Order
}