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
