import axios from 'axios';
import {ORDER} from "../_apis_/urls";
import { getUserToken } from '../utils/sessionManager';


const access_token = getUserToken();


export async function getAllOrders() {
 
  try {
    const res = await axios.get(ORDER,{
        headers: {
          'access_token' : access_token
        }
    });
  
    return res.data;
  } catch(err) {
    console.error(err);
  }
}


export async function addOrder(data) {
  return new Promise((resolve, reject) => {
    axios.post(ORDER, data, {
      headers: {
        'access_token': access_token
      }
    })
      .then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
  });
}

export async function getById(id) {
  return new Promise((resolve, reject) => {
    axios.get(ORDER + `/${id}`, {
      headers: {
        'access_token': access_token
      }
    })
      .then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
  });
}
export async function updateOrder(id, data) {
  return new Promise((resolve, reject) => {
    axios.put(ORDER + `/${id}`,data, {
      headers: {
        'access_token': access_token
      }
    })
      .then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
  });
}