const { Clothes } = require('./clothes/clothes.controllers')
const { Roles } = require('./users/role.controllers')
const { Users } = require('./users/user.controllers')
const { Cart } = require('./cart_items/cart_items.controllers');
const { Order } = require('./orders/orders.controllers');

module.exports = {
  Clothes,
  Roles,
  Users,
  Cart,
  Order
}