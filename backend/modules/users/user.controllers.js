const UserModel = require('./user.model')
const bcrypt = require('bcrypt');
const Common = require('../../utils/common');
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken');
const { USER } = require('../../constants/permissions');
const Role = require('./role.controllers').Role;
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const User = {
    async add(data) {
        return await this.register(data);
    },
    async list() {
        return UserModel.find();
    },
    async getById(_id) {
        console.log(_id);
        return UserModel.findOne({ _id, is_archived: false });
    },

    async update(request) {
		const params = request.payload;
		/** Noone can change role, admin can directly change role from backend*/
		delete params.role;
        const res = await UserModel.findOneAndUpdate({ _id: request.params.id }, params);
        return res;
    },

    async validateToken(token) {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email, is_approved: true, is_archived: false });
        if (!user) {
            throw { message: "Token not correct please login and try again!", code: 400 };
        }
        const permissions = await Role.getPermissions(user.role);
        return { user, permissions };
    },
    async registerEmail(request) {
        const token =
            request.params.token || request.headers.access_token || request.cookies.access_token;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findOneAndUpdate({ email: decoded.email, is_archived: false }, { is_registered: true });
        return user;
    },
    async auth(request) {
        try {
            const token =
                request.params.token || request.headers.access_token || request.cookies.access_token;
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
    async changePassword(req) {
        token = req.headers.access_token;
        const { oldPassword, newPassword } = req.payload;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email });
        if (user) {
            try {
                //const res = await this.login({email: user.email, password: oldPassword});
                const salt = parseInt(process.env.TOKEN_KEY);
                encrypted_password = await bcrypt.hash(newPassword, salt);
                const done = await UserModel.findOneAndUpdate({ email: decoded.email }, { password: encrypted_password });
                if (done) {
                    return { message: "Password change successfully" };
                }
            } catch (err) {
                throw err;
            }
        } else {
            throw { message: "Token not correct please login and try again!", code: 400 };
        }
    },
    async findByRoles(role) {
        return User.model.find({ role: role, is_archived: false }).select('-password');
    },
    async findById(id) {
        return User.model.findOne({ _id: id, is_archived: false }).select('-password');
    },

    async register(data) {
        var {firstName,is_registered, lastName,address, email, phone, password, role } = data;
        role = role.toUpperCase();

        if (!(email && password)) {
            throw "All input is required";
        }

        const u = await UserModel.findOne({ email});
        const p = await UserModel.findOne({ phone });
        if (u) {
            throw { message: "User email already exists!", code: 400 };
        }
        if (p) {
            throw { message: "Phone already exists!", code: 400 };
        }
        if(!is_registered){
            is_registered = false;
        }
        const salt = process.env.TOKEN_KEY;
        encrypted_password = await bcrypt.hash(password, parseInt(salt));

        const user = await UserModel.create({
            email: email.toLowerCase(),
            password: encrypted_password,
            role,
            firstName,
            lastName,
            address,
            is_registered,
            google_account: false,
            phone
        });
        const token = jwt.sign(
            { user_id: user._id, email, role: user.role, is_approved: user.is_approved },
            salt
        );
        if(!is_registered){
            Common.sentMailVerificationLink(user, token);
        }
        return user;
    },
    async register_google(payload) {
        const { email, name } = payload;
        const user = await UserModel.create({
            email: email.toLowerCase(),
            role: "USER",
            is_approved: true,
            google_account: true,
            is_registered: true
        });
        return user;
    },

    async google_login(crediential) {

        const salt = process.env.TOKEN_KEY;
        try {
            const ticket = await client.verifyIdToken({
                idToken: crediential,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const { email, name } = ticket.getPayload();
            var u = await UserModel.findOne({ email: email });
            console.log(u)
            if (!u) {
                u = await this.register_google({ email, name });
            }
            const token = jwt.sign(
                { user_id: u._id, email, role: u.role, is_approved: u.is_approved },
                salt
            );
            return { user: u, token: token };
        } catch (err) {
            console.log(err);
            throw { message: "Google login failed", code: 404 }
        }
    },

    async login(data) {
        try {
            const { email, password } = data;
            if (!(email && password)) {
                throw "All input is required";
            }
            var user = await UserModel.findOne({ email });
            if (user) {
                if (user.google_account) {
                    throw { message: "User dosen't exist", code: 400 }
                }
                if (!user.is_registered) {
                    throw { message: "Please verify email first", code: 400 }
                }
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign(
                        { user_id: user._id, email, role: user.role },
                        process.env.TOKEN_KEY,
                    );
                    permissions = await Role.getPermissions(user.role);
                    return { user, permissions, token };
                }
                else {
                    throw { message: "Invalid password", code: 400 };
                }
            }
            else {
                throw { message: "Invalid Email or password", code: 400 };
            }

        } catch (err) {
            throw err;
        }
    },


	async archive(id) {
		const { user, permissions } = await User.validateToken(token);
		if(!permissions.includes(USER.ADMIN) && user._id != id){
			throw { message: "You can't arvhice other user!", code : 400};
		}
		return UserModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
	},
    async approve(id) {
        return UserModel.findOneAndUpdate({ _id: id }, [{ $set: { is_approved: { $eq: [false, "$is_approved"] } } }]);
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
    getById: (req) => User.getById(req.params.id),
    register: async (req) => {
        if(req.payload.is_registered){
            const token = req.query.access_token || req.headers.access_token;
            if(!token){
                throw {message: "1 only admin can add add user with is_registered set true", code :400};
            }
           const {user, permissions} = await User.validateToken(token);
           if(user.role != "ADMIN" && user.role != "SUPER ADMIN"){
                throw {message: "2 only admin can add add user with is_registered set true", code :400};
           }
        }
        return User.register(req.payload)
    },
    login: (req) => User.login(req.payload),
    google_login: (req) => User.google_login(req.params.cred),
    archive: (req) => {
        const token = req.query.access_token || req.headers.access_token;
		return User.archive(req.params.id, token)
	},
    approve: (req) => User.approve(req.params.id),
    findById: (req) => User.findById(req.params.id),
    findByRoles: (req) => User.findByRoles(req.params.role),
    validateToken: (req) => User.validateToken(req.params.token),
    update: (req) => User.update(req),
    changePassword: (req) => User.changePassword(req),
    auth: (req) => User.auth(req),
    registerEmail: (req) => User.registerEmail(req)
};
