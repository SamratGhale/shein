const mongo = require('mongoose');
const RoleController = require('../modules/users/role.controllers')
const UserController = require('../modules/users/user.controllers')
require('dotenv').config();
mongo.connect(process.env.DATABASE_URL)

Role = RoleController.Role;
User = UserController.User;

const roleAdder = async () => {
    await Role.register({
        name: 'Super Admin',
        permissions: [
            'app_admin',
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'cloth_read',
            'cloth_write',
            'cloth_remove',
            'cart_read',
            'cart_write',
            'cart_remove',
        ],
    });
    await Role.register({
        name: 'Admin',
        permissions: [
            'user_write',
            'user_delete',
            'user_read',
            'user_list',
            'user_admin',
            'cloth_read',
            'cloth_write',
            'cloth_remove',
            'cart_read',
            'cart_write',
            'cart_remove',
        ],
        is_system: true
    });
    await Role.register({
        name: 'Customer',
        permissions: [
            'cloth_read',
            'cloth_write',
            'cloth_remove',
            'cart_read',
            'cart_write',
            'cart_remove',
        ],
    });
    console.log('Admin Role is Added');
    console.log('Super Admin Role Added');
    console.log('Staff Manager Role Added');
}
const userAdder=async()=>{
    await User.register({
        email:'samrat@gmail.com',
        password:'9828',
        role: "SUPER ADMIN"
    })
    await User.register({
        email:'ishan@gmail.com',
        password:'ishan123',
        role: "SUPER ADMIN"
    })
    await User.register({
        email:'apple@gmail.com',
        password:'apple123',
        role: "CUSTOMER"
    })
}

userAdder();
roleAdder();