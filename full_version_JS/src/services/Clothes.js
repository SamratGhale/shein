import axios from 'axios';
import { CLOTHES } from '../_apis_/urls';
import { getUserToken } from '../utils/sessionManager';
import { CLOTHES_IMAGE } from '../_apis_/constants'

const access_token = getUserToken();

export async function addCloth(payload) {
  return new Promise((resolve, reject) => {
    axios.post(CLOTHES + '/register', payload, {
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

export async function getAllClothes() {
  try {
    const res = await axios.get(CLOTHES, {
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
    const res = await axios.get(CLOTHES+`/${id}`, {
      headers: {
        'access_token': access_token
      }
    });

    res.data.images = []

    await res.data.files.forEach(async(i)=>{
      const img = await axios.get(CLOTHES_IMAGE + `/${id}/${i}`,{
        responseType: 'blob'
      })
      var file = new File([img.data], i,{
        type:'image/jpeg',
      })
      file.preview  = CLOTHES_IMAGE + `/${id}/${i}`;
      res.data.images.push(file)
    })
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateClothes(id, data) {
  try {
    const res = await axios.put(CLOTHES+ `/update/${id}`, data, {
      headers: {
        'access_token': access_token
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}