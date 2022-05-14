const RoleModel = require('./role.model')
require('dotenv').config();

const Role={
    async add(data){
        return await this.register(data);
    },
    async register(data){
        console.log(data);
        const {name, permissions } = data;
        oldRole = await RoleModel.findOne({name: name});
        if(oldRole){
            throw `Role with name ${name} already exists`;
        }

        if(permissions == null){
           permissions =  []
        }
        const role = await RoleModel.create({
            name : name.toUpperCase(),
            permissions: permissions
        });
        return role;
    },
    async removePermissions(data){
        const {id , permissions } = data;
        const oldRole = await RoleModel.findById(id);
        if(!oldRole){
            throw `Role with id ${id } dosen't exists`;
        }
        if(permissions == null){
           permissions =  []
        }
        const toRemove = new Set(permissions);

        const newPermissions = oldRole.permissions.filter(x=>!toRemove.has(x));
        const newRole = await RoleModel.findByIdAndUpdate(id, {permissions: newPermissions});
        return newRole;
    },
    async get(id){
        const role = RoleModel.findById(id);
        return role;
    },
    list() {
        return RoleModel.find();
    },

    async addPermissions(data){
        const {id , permissions } = data;
        const oldRole = await RoleModel.findOne({_id : id, is_archived: false});
        if(!oldRole){
            throw `Role with id ${id} dosen't exists`;
        }
        if(permissions == null){
           permissions =  []
        }
        newPermissions = oldRole.permissions.concat(permissions);
        const newRole = await RoleModel.findOneAndUpdate({_id: id}, {permissions: newPermissions});
        return newRole;
    },
    async archive(id){
        const oldRole = await RoleModel.findOne({_id: id, is_archived: false});
        if(!oldRole){
            throw `Role with id ${id} dosen't exists`;
        }
        const newRole = await RoleModel.findByIdAndUpdate({id}, {is_archived:true});
        return newRole;
    },
    async getPermissions(name){
        const r = await RoleModel.findOne({name: name.toUpperCase()});
        return r ? r.permissions: [];
    },
    async isValidRole(name){
        const r = await RoleModel.findOne({name: name});
        return r != null;
    }
}

module.exports = {
    Role,
    add: (req) => Role.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Role.list(start, limit, from);
    },
    get:(req)=> Role.get(req.params.id),
    delete: (req) =>         Role.archive(req.params.id),
    addPermissions:(req)=>    Role.addPermissions(req.payload),
    removePermissions:(req)=> Role.removePermissions(req.payload),
    getPermissions:(req)=>    Role.getPermissions(req.params.name),
    isValidRole:(req)=>    Role.isValidRole(req.params.name)
  };
