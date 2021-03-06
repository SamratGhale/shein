import axios from 'axios';
import { USER, AUTH, ROLES } from '../_apis_/urls';
import { logoutUser, getUserToken, saveUser, saveUserPermissions, saveUserToken } from '../utils/sessionManager';

const access_token = getUserToken();
export async function login(payload) {
  return new Promise((resolve, reject) => {
    axios.post(USER + '/login', payload)
      .then((res) => {
        saveUser(res.data.user);
        saveUserToken(res.data.token);
        saveUserPermissions(res.data.permissions);
        resolve({ sucess: true, status: 200, data: res.data })
      }).catch((err) => {
        reject(err);
      });
  });
}
export function logout() {
  logoutUser();
}
export async function verifyToken() {
  try {
    const res = await axios.post(`${USER}/validate/${access_token}`);
  
    saveUser(res.data);
    return ({ sucess: true, status: 200, data: res.data })
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function addUser(payload) {
  return new Promise((resolve, reject) => {
    axios.post(USER + '/register', payload, {
      headers:{
        access_token: access_token
      }
    })
      .then((res) => {
        resolve({ sucess: true, status: 200, data: res.data })
      }).catch((err) => {
        reject(err);
      });
  });
}

export async function getAllUser() {
  try {
    const res = await axios.get(USER, {
      headers: {
        'access_token': access_token
      }
    });
    console.log(res)
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getById(id) {
  try {
    const res = await axios.get(USER+`/${id}`, {
      headers: {
        'access_token': access_token
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}


export async function approveUser(id) {
  try {
    const res = await axios.put(USER + `/${id}`, {}, {
      headers: {
        'access_token': access_token
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(id, data) {
  try {
    const res = await axios.post(USER + `/${id}/update`, data, {
      headers: {
        'access_token': access_token
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllRoles() {
  try {
    const res = await axios.get(ROLES);
    return res.data.data;
  } catch (err) {
    return err;
  }
}