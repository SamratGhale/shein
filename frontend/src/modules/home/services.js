import axios from 'axios';
import { CLOTHES } from '../../constants/api';

export async function getAllItems() {
    try {
        const res = await axios.get(CLOTHES);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getById(id) {
    try {
        const res = await axios.get(CLOTHES + '/' + id);
        return res.data;
    } catch (err) {
        throw err;
    }
}