const UserModel = require('./user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Role= require('./role.controllers').Role;
require('dotenv').config();

const User= {
    async add(data) {
        return await this.register(data);
    },
    async list() {
        return UserModel.find();
    },
    async getById(_id) {
        return UserModel.findOne({ _id, is_archived: false });
    },

    async update(request) {
        console.log(request.payload);
        const res = await UserModel.findOneAndUpdate({_id: request.params.id}, request.payload);
        return res;
    },

    async validateToken(token){
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email, is_approved: true, is_archived: false});
        if(!user){
            throw {message: "Token not correct please login and try again!", code:400};
        }
        const permissions = await Role.getPermissions(user.role);
        return {user, permissions};
    },
    async auth(request) {
        try {
            const token =
                request.params.token|| request.headers.access_token || request.cookies.access_token;
            const { user, permissions } = await User.validateToken(token);

            delete user.password;
            return {
                user,
                permissions,
            };
        } catch (e) {
            throw Error(`ERROR: ${e}`);
        }
    },
    async changePassword(req){
        token = req.headers.access_token;
        const { oldPassword,newPassword} = req.payload;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email });
        if (user) {
            try{
                //const res = await this.login({email: user.email, password: oldPassword});
                const salt = parseInt(process.env.TOKEN_KEY);
                encrypted_password = await bcrypt.hash(newPassword, salt);
                const done = await UserModel.findOneAndUpdate({email: decoded.email},{password: encrypted_password});
                if(done){
                    return {message: "Password change successfully"};
                }
            }catch(err){
                throw err;
            }
        } else {
            throw {message: "Token not correct please login and try again!", code:400};
        }
    },
    async findByRoles(role){
        return User.model.find({ role: role, is_archived: false }).select('-password');
    },
    async findById(id){
        return User.model.findOne({ _id: id, is_archived: false}).select('-password');
    },

    async register(data) {
        var {email, password, role } =  data;
        role = role.toUpperCase();

        if(!(email && password)){
            throw "All input is required";
        }

        const u= await UserModel.findOne({email: email});
        if(u){
            throw {message: "User email already exists!", code:400};
        }
        const salt = process.env.TOKEN_KEY;
        encrypted_password = await bcrypt.hash(password, parseInt(salt));

        const user = await UserModel.create({
            email: email.toLowerCase(),
            password: encrypted_password,
            role : role,
            is_approved:false 
        });
        const token = jwt.sign(
            {user_id : user._id, email, role: user.role, is_approved:user.is_approved},
            salt
        );
        user.token  = token;
        return user;
    },
    async login(data){
        try{
            const {email, password} = data;
            if (!(email && password)) {
                throw "All input is required";
            }
            var user = await UserModel.findOne({ email });
            if (user) {
                if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign(
                        {user_id : user._id, email, role: user.role},
                        process.env.TOKEN_KEY,
                    );
                    permissions = await Role.getPermissions(user.role);
                    return {user, permissions, token};
                }
                else{
                    throw {message :"Invalid password", code: 400};
                }
            }
            else{
                throw {message :"Invalid Email or password", code: 400};
            }

        } catch (err) {
            throw err;
        }
    },

    async archive(id) {
        return UserModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },
    async approve(id) {
        return UserModel.findOneAndUpdate({ _id: id }, [{$set:{is_approved:{$eq:[false,"$is_approved"]}}}]);
    },
}

module.exports = {
    User,
    add: (req) => User.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return User.list(start, limit, from);
    },
    getById: (req) =>      User.getById(req.params.id),
    register: (req) =>     User.register(req.payload),
    login: (req) =>        User.login(req.payload),
    archive: (req) =>      User.archive(req.params.id),
    approve: (req) =>      User.approve(req.params.id),
    findById: (req) =>      User.findById(req.params.id),
    findByRoles: (req) =>      User.findByRoles(req.params.role),
    validateToken : (req) =>  User.validateToken(req.params.token),
    update:(req)=>User.update(req),
    changePassword:(req)=> User.changePassword(req),
    auth:(req)=> User.auth(req),
  };
