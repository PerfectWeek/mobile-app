import axios from 'react-native-axios'

const address = 'http://localhost:3000/';

export async function axiosGet(route) {
    try {
        return await axios.get(address + route);
    }
    catch (e) {
        return e;
    }
}

export async function axiosPost(route, body) {
    try {
        const resp = await axios.post(address + route, body, {
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
        });
        return resp;
    }
    catch (e) {
        return {status : e.status}
    }
}