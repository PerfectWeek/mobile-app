import {Network} from "../../Network/Requests";

export class ProviderService {

    static async ConnectWithGoogleTokens(access_token, refresh_token) {
        const resp = await Network.Post('/auth/google-mobile/callback', {access_token, refresh_token});
        if (resp.status === 200)
            return resp.data;
        let err;
        console.log("resp: ", resp);
        
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async ConnectWithFacebookTokens(access_token) {
        const resp = await Network.Post('/auth/facebook/callback', {access_token});
        if (resp.status === 200)
            return resp.data;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }
}

