import axios from 'axios';
import { PATH_HOME } from '../../routes/paths';
import { AUTH } from '../../constants/api';
import {saveUser, saveUserToken} from '../../utils/sessionManager'

export async function googleLogin(payload) {
    return new Promise((resolve, reject) => {
        axios.post(AUTH + `/google_login/${payload}`,{})
            .then((res) => {
                console.log(res);
                saveUser(res.data.user);
                saveUserToken(res.data.token);
                resolve({sucess: true, status: 200, data: res.data})
                window.location = PATH_HOME.app;
            }).catch((err)=>{
                reject(err);
            });
    });
}