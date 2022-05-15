const { Clothes } = require('./clothes/clothes.controllers')
const { Roles } = require('./users/role.controllers')
const { Users } = require('./users/user.controllers')
const { Cart } = require('./cart/cart.controllers');

module.exports = {
  Clothes,
  Roles,
  Users,
  Cart
}