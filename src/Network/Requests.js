import axios from 'react-native-axios'
import {AsyncStorage} from 'react-native';
import Strapi from 'strapi-sdk-javascript';

// axios.defaults.baseURL = 'http://192.168.1.6:3000';
//axios.defaults.baseURL = 'https://perfect-week-test.herokuapp.com';
//  axios.defaults.baseURL = 'https://api.kalastud.io';
 axios.defaults.baseURL = 'https://strapi-perfect-week.herokuapp.com';

export class Network {
    static access_token = null;
    static storedTokenName = 'tokenAccess';
    static strapi = new Strapi('https://strapi-perfect-week.herokuapp.com', {
        localStorage: false
    });

    static async CheckToken() {
        try {
            const savedData = await AsyncStorage.getItem(this.storedTokenName);
            return JSON.parse(savedData);
        }
        catch (e) {
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
        }
        catch (e) {
            return null;
        }
    }
    static async deleteToken() {
        try {
            return await AsyncStorage.removeItem(this.storedTokenName);
        }
        catch (e){
            return null;
        }
    }

    static async Get(route) {
        try {
            return await this.strapi.request('get', route);

            // if (this.access_token !== null)
            //     return await axios.get(route, {headers: {'Authorization': 'Bearer ' + this.access_token}});
            // else
            //     return await axios.get(route);
        }
        catch (e) {
            return e;
        }
    }

    static async Post(route, body) {
        try {
            // return await strapi.request('post', route, {
            //     data : body
            // });
            if (this.access_token !== null)
                return await axios.post(route, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    }
                });
            else
                return await axios.post(route, body);
        }
        catch (e) {
            return e.response;
        }
    }

    static async PostMultiPart(route, body) {
        try {
            return await strapi.request('post', route, {
                data : body,
                headers: {'content-type': 'multipart/form-data'}
            });
            // if (this.access_token !== null)
            //     return await axios.post(route, body, {
            //         headers: {
            //             'Authorization': 'Bearer ' + this.access_token,
            //             'content-type': 'multipart/form-data'
            //         }
            //     });
            // else
            //     return await axios.post(route, body);
        }
        catch (e) {
            return e.response;
        }
    }

    static async Put(route, body) {
        try {
            return await strapi.request('put', route, {
                data : body
            });
            // if (this.access_token !== null)
            //     return await axios.put(route, body, {
            //         headers: {
            //             'Authorization': 'Bearer ' + this.access_token
            //         }
            //     });
            // else
            //     return await axios.put(route, body);
        }
        catch (e) {
            return e.response;
        }
    }

    static async Delete(route) {
        try {
            return await strapi.request('delete', route, {
                data : body
            });
            // if (this.access_token !== null) {
            //     return await axios.delete(route, {
            //         headers: {
            //             'Authorization': 'Bearer ' + this.access_token
            //         }
            //     });
            // }
            // else {
            //     return await axios.delete(route);
            // }
        }
        catch (e) {
            return e.response;
        }
    }

}

