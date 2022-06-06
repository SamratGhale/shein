const Clothes = require('./clothes/clothes.routes')
const Role = require('./users/role.routes')
const Users = require('./users/user.routes')
const Cart = require('./cartItems/cart.routes')

module.exports = {
  Clothes,
  Role,
  Users,
  Cart
}