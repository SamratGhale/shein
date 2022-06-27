const CartModel = require('./cart_items.model');
const fs = require('fs');
const { DataUtils } = require('../../utils/data');

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
	    const exists = await CartModel.findOne({ user: user._id, item_id, is_archived: false });
	    console.log(exists);
	    if (exists) {
		return await CartModel.findByIdAndUpdate(exists._id, { quantity: exists.quantity + quantity });
	    } else {
		const cart = {
		    item_id,
		    user_id: user._id,
		    quantity: quantity
		}
		return await CartModel.create(cart);
	    }
	} catch (err) {
	    throw err;
	}
    },

    async deleteById(id, token){
	try {
	    const user = await (await User.validateToken(token)).user;
	    if (!user) {
		throw { message: "Invalid user", code: 404 };
	    }
	    const exists = await CartModel.findById(id);
	    console.log(user);
	    console.log(exists);
	    if(exists.user_id.equals(user._id)){
		return await CartModel.findByIdAndDelete(id);
	    }else{
		throw { message: "Invalid user", code: 404 };
	    }
	    return exists;
	} catch (err) {
	    throw err;
	}
	
    },

    async update(id, data, token){
	const cart_item = await CartModel.findById(id);
	const user =  await User.validateToken(token);
	if(!cart_item){
	    throw {message: "Cart dosen't exist", code :404};
	}
	console.log(user.user._id)
	console.log(cart_item.user_id)
	if(!user.user._id.equals(cart_item.user_id)){
	    throw {message: "You are not the owner of this cart!", code :400};
	}
	return await CartModel.findByIdAndUpdate(id, data);
    },
    async getMyCart(token) {
	const user = (await User.validateToken(token)).user;
	if (!user) {
	    throw { message: "Invalid user", code: 404 };
	}
	const query = []
	query.push({
	    $lookup:{
		from: 'clothes',
		localField: 'item_id',
		foreignField: '_id',
		as:'item'
	    }
	}
		  )

	const res = await DataUtils.paging({
	    sort :{created_at : -1},
	    model:CartModel,
	    query
	})
	console.log(res)


	res.data.forEach(async (item, i) => {
	    if(item.item[0]){
		res.data[i].item[0].files = fs.readdirSync(`./modules/clothes/images/${item.item[0]._id}`);
	    }
	})

	console.log(res.data);
	return res.data;
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
    },
    update: (req) => {
	const token = req.params.token || req.headers.access_token;
	const id = req.params.id;
	return Cart.update(id, req.payload, token);
    },
    deleteById:(req)=> {
	const token = req.params.token || req.headers.access_token;
	const id = req.params.id;
	return Cart.deleteById(id, token);
    }
}
