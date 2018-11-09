import axios from 'react-native-axios'
import {withNavigation} from "react-navigation";
import connect from "react-redux/es/connect/connect";
import {_Home} from "../views/home";
import {Alert} from 'react-native';

// axios.defaults.baseURL = 'http://192.168.1.6:3000';
axios.defaults.baseURL = 'http://api.perfectweek.benard.pl';
// axios.defaults.baseURL = 'https://api.kalastud.io';
// axios.defaults.baseURL = 'https://kalastud.io:3000';

export class Network {
    static access_token = null;

    static async Get(route) {
        try {
            if (this.access_token !== null)
                return await axios.get(route, {headers: {'Authorization': 'Bearer ' + this.access_token}});
            else
                return await axios.get(route);
        }
        catch (e) {
            Alert.alert('Something went wrong !');
            return e;
        }
    }

    static async Post(route, body) {
        try {
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
            Alert.alert('Something went wrong !');
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
        }
        catch (e) {
            return e.response;
        }
    }

    static async Delete(route) {
        try {
            if (this.access_token !== null) {
console.log("access_token non null");
                return await axios.delete(route, {
                    headers: {
                        'Authorization': 'Bearer ' + this.access_token
                    }
                });
            }

            else {

                console.log("access_token null");
                return await axios.delete(route);
            }
        }
        catch (e) {
            return e.response;
        }
    }

}

// const mapStateToProps = (state, ownProps) => {
//     return {
//         ...ownProps,
//         login: state.login
//     }
// };

// export const Home = withNavigation(connect(mapStateToProps)(_Home));

