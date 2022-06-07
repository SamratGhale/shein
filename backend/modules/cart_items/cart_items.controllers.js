const CartModel = require('./cart_items.model');
const fs = require('fs');

const { User } = require('../users/user.controllers');

/* Create verify token function and use it to take user_id for adding cart */
/*get all cart items by user_id */

const Cart = {
    async add(data, token) {
        const { item_id, quantity } = data;
        try {
            const user = await (await User.validateToken(token)).user;
            if (!user) {
                throw { message: "Invalid user", code: 404 };
            }
            const exists = await CartModel.findOne({ user: user._id, item: item_id, is_archived: false });
            if (exists) {
                return await CartModel.findByIdAndUpdate(exists._id, { quantity: exists.quantity + quantity });
            } else {
                const cart = {
                    item: item_id,
                    user: user._id,
                    quantity: quantity
                }
                return await CartModel.create(cart);
            }
        } catch (err) {
            throw err;
        }
    },
    async getMyCart(token) {
        const user = (await User.validateToken(token)).user;
        if (!user) {
            throw { message: "Invalid user", code: 404 };
        }
        const res = await CartModel.find({ user: user._id, is_archived: false }).populate('item').lean();
        res.forEach(async (item, i) => {
            res[i].item.files = fs.readdirSync(`./modules/clothes/images/${item.item._id}`);
        })
        return res;

    }
}

module.exports = {
    Cart,
    add: (req) => {
        const token = req.params.token || req.headers.access_token;
        return Cart.add(req.payload, token);
    },
    getMyCart: (req) => {
        const token = req.params.token || req.headers.access_token;
        return Cart.getMyCart(token);
    }
}