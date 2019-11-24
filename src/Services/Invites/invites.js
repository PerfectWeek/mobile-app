import { Network } from "../../Network/Requests";
import axios from 'react-native-axios'

export class InvitesService {
  static async GetGroupInvites() {
    const resp = await Network.Get("/calendars?invitation_status=pending");
    if (resp.status === 200) return resp.data.calendars;
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async GetEventInvites() {
    const resp = await Network.Get("/events?only_statuses[]=invited");
    if (resp.status === 200) return resp.data.events;
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async GetFriendInvites() {
    const resp = await Network.Get("/friends?invitation_status=pending/");
    if (resp.status === 200)
      return resp.data.received
        .filter(i => i.confirmed === false)
        .map(i => {
          return {
            ...i,
            image: `${axios.defaults.baseURL}/users/${i.user.id}/images/profile`
          };
        });
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async ReplyGroupInvite(group_id, response) {
    const resp = await Network.Post(
      `/group-invites/${group_id}/${
        response ? "accept-invite" : "decline-invite"
      }`
    );
    if (resp.status === 200) return "ok";
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async ReplyFriendInvite(user_id, response) {
    const resp = await Network.Post(
      `/friends/${user_id}/${response ? "accept" : "decline"}`
    );
    if (resp.status === 200) return "ok";
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }

  static async ReplyEventInvite(group_id, response) {
    const resp = await Network.Put(`/events/${group_id}/attendees/me/status`, {
      status: response ? "going" : "no"
    });
    if (resp.status === 200) return "ok";
    let err;
    if (resp.data !== undefined && resp.data.message !== undefined)
      err = resp.data.message;
    else err = "Connection error";
    throw err;
  }
}
