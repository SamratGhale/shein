import axios from 'axios';
import { CLOTHES, CART } from '../../constants/api';
import { getUserToken } from '../../utils/sessionManager';

const access_token = getUserToken();

export async function getAllItems(query) {
    console.log(query)
    try {
        const res = await axios(`${CLOTHES}`, { params: query });
        console.log(res.data);
        return res.data.data;
    } catch (err) {
        console.error(err);
    }
}

export async function getAllTags() {
    try {
        const res = await axios.get(CLOTHES + '/tags');
        return res.data;
    } catch (err) {
        throw err;
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
export async function addToCart(payload) {
    return new Promise((resolve, reject) => {
        axios.post(CART, payload, {
            headers: {
                'access_token': access_token
            }
        })
            .then((res) => {
                resolve(res);
                console.log(res);
            }).catch((err) => {
                reject(err);
            });
    });
}

export async function getMyCart() {
    return new Promise((resolve, reject) => {
        axios.get(CART, {
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

export async function getMinMaxPrice() {
    return new Promise((resolve, reject) => {
        axios.get(CLOTHES + '/minmax', {
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