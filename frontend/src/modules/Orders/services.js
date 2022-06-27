import axios from "axios";
import { ORDER } from "../../constants/api";
import { getUserToken } from "../../utils/sessionManager";

const access_token = getUserToken();
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


export async function getMyOrder(data) {
  return new Promise((resolve, reject) => {
    axios.get(ORDER + '/myorders', {
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


export async function getOrderById(id) {
  return new Promise((resolve, reject) => {
    axios.get(ORDER + '/' + id, {
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