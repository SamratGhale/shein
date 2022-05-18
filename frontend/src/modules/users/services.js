import axios from 'axios';
import { PATH_HOME } from '../../routes/paths';
import { AUTH, USER } from '../../constants/api';
import { saveUser, saveUserToken } from '../../utils/sessionManager'

export async function googleLogin(payload) {
    return new Promise((resolve, reject) => {
        axios.post(AUTH + `/google_login/${payload}`, {})
            .then((res) => {
                console.log(res);
                saveUser(res.data.user);
                saveUserToken(res.data.token);
                resolve({ sucess: true, status: 200, data: res.data })
                window.location = PATH_HOME.app;
            }).catch((err) => {
                reject(err);
            });
    });
}


export async function signUp(payload) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/register`, payload)
            .then((res) => {
                console.log(res);
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
    });
}

export async function login(payload) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/login`, payload)
            .then((res) => {
                saveUser(res.data.user);
                saveUserToken(res.data.token);
                resolve({ sucess: true, status: 200, data: res.data })
                window.location = PATH_HOME.app;
            }).catch((err) => {
                reject(err);
            });
    });
}

export async function verifyEmail(token) {
    return new Promise((resolve, reject) => {
        axios.post(USER + `/validate/${token}`)
            .then((res) => {
                resolve({ sucess: true, status: 200, data: res.data })
            }).catch((err) => {
                reject(err);
            });
    });
}
