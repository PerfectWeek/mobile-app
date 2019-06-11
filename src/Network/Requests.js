import axios from 'react-native-axios'
import {AsyncStorage} from 'react-native';

// axios.defaults.baseURL = 'http://192.168.1.6:3000';
axios.defaults.baseURL = 'https://perfect-week-test.herokuapp.com';
//axios.defaults.baseURL = 'https://api.kalastud.io';



export class Network {
    static access_token = null;
    static storedTokenName = 'tokenAccess';

    static async CheckToken() {
        try {
            const savedData = await AsyncStorage.getItem(this.storedTokenName);
            return JSON.parse(savedData);
        } catch (e) {
            return null;
        }
    }

    static async SaveToken(email, name) {
        try {
            const jData = {
                token: this.access_token,
                email: email,
                name: name
            };
            return await AsyncStorage.setItem(this.storedTokenName, JSON.stringify(jData));
        } catch (e) {
            return null;
        }
    }

    static async deleteToken() {
        try {
            return await AsyncStorage.removeItem(this.storedTokenName);
        } catch (e) {
            return null;
        }
    }

    static async Get(route, params = {}) {
        try {
            if (this.access_token !== null)
                return await axios.get(route, {
                    headers: {'Authorization': 'Bearer ' + this.access_token},
                    params: params
                });
            else
                return await axios.get(route, {params: params});
        } catch (e) {
            return e;
        }
    }

    static async Post(route, body) {
        // console.log('body', body)
        try {
            if (this.access_token !== null)
                return await axios.post(route, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    }
                });
            else
                return await axios.post(route, body);
        } catch (e) {
            return e.response;
        }
    }

    static async PostMultiPart(route, body) {
        try {
            if (this.access_token !== null)
                return await axios.post(route, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                        'content-type': 'multipart/form-data'
                    }
                });
            else
                return await axios.post(route, body);
        } catch (e) {
            return e.response;
        }
    }

    static async Put(route, body) {
        try {
            if (this.access_token !== null)
                return await axios.put(route, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    }
                });
            else
                return await axios.put(route, body);
        } catch (e) {
            return e.response;
        }
    }

    static async Delete(route) {
        try {
            if (this.access_token !== null) {
                return await axios.delete(route, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    }
                });
            } else {
                return await axios.delete(route);
            }
        } catch (e) {
            return e.response;
        }
    }

}

