import { Network } from "../../Network/Requests";
import axios from 'react-native-axios'
const uuidv4 = require('uuid/v4');

export class FriendsService {
  static async GetFriends() {
    const resp = await Network.Get(`/friends`);
    if (resp.status === 200)
      return [
        ...resp.data.sent
          .filter(i => i.confirmed === true)
          .map(i => {
            return {
              ...i,
              image: `${axios.defaults.baseURL}/users/${i.user.id}/images/profile?rand=${uuidv4()}`
            };
          }),
        ...resp.data.received
          .filter(i => i.confirmed === true)
          .map(i => {
            return {
              ...i,
              image: `${axios.defaults.baseURL}/users/${i.user.id}/images/profile?rand=${uuidv4()}`
            };
          })
      ];
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async SendFriendRequest(pseudo) {
    const resp = await Network.Post(`/friends/${pseudo.id}`);
    if (resp.status === 200) return "ok";
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }
}
