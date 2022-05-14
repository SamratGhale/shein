import axios from 'axios';
import {CLOTHES} from '../../constants/api';

export async function getAllItems(){
    try{
        const res = await axios.get(CLOTHES);
        console.log(res.data);
        return res.data;
    }catch(err){
        console.error(err);
    }
}