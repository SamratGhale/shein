const mongo = require("mongoose");
const RoleController = require("../modules/users/role.controllers");
const UserController = require("../modules/users/user.controllers");
require("dotenv").config();
mongo.connect(process.env.DATABASE_URL);

Role = RoleController.Role;
User = UserController.User;

const roleAdder = async () => {
	await Role.register({
		name: "Super Admin",
		permissions: [
			'user',
			'user_read',
			'user_write',
			'user_remove',
			'user_admin',
			'items_read',
			'items_write',
			'items_remove',
			'cart_read',
			'cart_write',
			'cart_remove',
			'order_read',
			'order_write',
			'order_remove',
			'app_admin',
		],
	});
	await Role.register({
		name: "Admin",
		permissions: [
			'user',
			'user_read',
			'user_write',
			'user_remove',
			'user_admin',
			'items_read',
			'items_write',
			'items_remove',
			'cart_read',
			'cart_write',
			'cart_remove',
			'order_read',
			'order_write',
			'order_remove',
			'app_admin',
		],
		is_system: true,
	});
	await Role.register({
		name: "Staff",
		permissions: [
			'user',
			'user_read',
			'items_read',
			'items_write',
			'items_remove',
			'order_read',
			'order_write',
			'order_remove',
		],
		is_system: true,
	});
	await Role.register({
		name: "USER",
		permissions: [
			'user',
			'user_read',
			'user_write',
			'user_remove',
			'user_admin',
			'items_read',
			'cart_read',
			'cart_write',
			'cart_remove',
			'order_read',
			'order_write',
		],
	});
	console.log("Admin Role is Added");
	console.log("Super Admin Role Added");
	console.log("Staff Manager Role Added");
};
const userAdder = async () => {
	await User.register({
		email: "samrat@gmail.com",
		firstName: "Samrat",
		phone: '9843773217',
		lastName: "Ghale",
		password: "9828",
		google_account: false,
		role: "SUPER ADMIN",
		address: "Mahankal",
		is_registered: true
	});
	await User.register({
		email: "ishan@gmail.com",
		firstName: "ishan",
		phone: '9843773218',
		lastName: "Chemjong",
		password: "ishan123",
		google_account: false,
		role: "SUPER ADMIN",
		address: "Mahankal",
		is_registered: true
	});
	await User.register({
		email: "apple@gmail.com",
		phone: '9843773219',
		firstName: "Apple",
		lastName: "Mango",
		password: "apple123",
		google_account: false,
		role: "STAFF",
		address: "Mahankal",
		is_registered: true
	});
};

try{
	roleAdder();
	userAdder();
}catch(err){
	console.log(err);
}