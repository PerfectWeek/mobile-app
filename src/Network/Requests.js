import axios from 'react-native-axios'
axios.defaults.baseURL = 'http://192.168.1.7:3000';
//axios.defaults.baseURL = 'http://127.0.0.1:3000';

export async function Get(route) {
    try {
        return await axios.get(route);
    }
    catch (e) {
        return e;
    }
}

export async function Post(route, body) {
    try {
        const resp = await axios.post(route, body, {
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
        });
        return resp;
    }
    catch (e) {
        return e.response;
    }
}