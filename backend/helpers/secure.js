// const { User } = require('../modules/users/user.controllers');

const Secure = async (reoutePermissions, req) => {
  if (reoutePermissions.length === 0) return true;

  const token = req.query.access_token || req.headers.access_token;
  if (!token) throw Error('No access token was sent');

  try {
    //const decoded = await User.validateToken(token);
    //const {user, permissions} = decoded;
    //return permissions.some((permission)=>reoutePermissions.includes(permission));
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = Secure;