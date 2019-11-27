import axios from 'react-native-axios'
import {AsyncStorage} from 'react-native';
import { Notifications } from "expo";

axios.defaults.baseURL = 'https://perfect-week-api.herokuapp.com';
// axios.defaults.baseURL = 'http://api.perfect-week.pw';

// axios.defaults.baseURL = 'https://perfect-week-test.herokuapp.com';
// axios.defaults.baseURL = 'https://api.kalastud.io';



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

    static async setToken(access_token) {
        this.access_token = access_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        // console.log("Je demande le token");
        try {
            let expoToken = await Notifications.getExpoPushTokenAsync();
            console.log(expoToken);
            if (expoToken) {
                let res = await axios.post("/expo/token", {token : expoToken});
                console.log(res);
            }    
        } catch (error) {
            // console.log(erro);
            
        }
        
    }

    static getToken() {
        return this.access_token;
    }

    static async SaveToken(email, name, id) {
        try {
            const jData = {
                token: this.access_token,
                email: email,
                name: name,
                id
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

    static async PutMultiPart(route, body) {
        try {
            if (this.access_token !== null)
                return await axios.put(route, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token,
                        'content-type': 'multipart/form-data'
                    }
                });
            else
                return await axios.put(route, body);
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

