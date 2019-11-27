import {takeEvery, put, select} from "redux-saga/effects";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";
import {GetInvites as GetInvitesAction, InvitesActionType, SetInvites, SetLoading} from "./invites.actions";
import {InvitesService} from "../../Services/Invites/invites";
import {GetGroups} from "../Groups/groups.actions";
import {LoadCalendar} from "../Calendar/calendar.actions";

function* GetInvites() {
    try {
        yield put(SetLoading(true));
        let invites = [];
        const group_invites = yield InvitesService.GetGroupInvites();
        invites.push(...group_invites.map(i => {
            return {type: 'calendar', name: i.name, item: i}
        }));
        const event_invites = yield InvitesService.GetEventInvites();
        invites.push(...event_invites.map(i => {
            return {type: 'event', name: i.name, item: i}
        }));
        let friend_invites = yield InvitesService.GetFriendInvites();
        invites.push(...friend_invites.map(i => {
            return {type: 'friend', name: i.user.name, item: i}
        }));
        yield put(SetInvites(invites));
        yield put(SetLoading(false));
    } catch (err) {
        yield put(SetLoading(false));
        yield ShowErrorNotification(err);
    }
}

function* ReplyGroupInvite({group_id, response}) {
    try {
         yield InvitesService.ReplyGroupInvite(group_id, response);
        const pseudo = yield select((state) => {
            return state.login.pseudo
        });
        yield put(GetGroups(pseudo));
        yield put(GetInvitesAction());
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}

function* ReplyFriendInvite({user_id, response}) {
    try {
        yield InvitesService.ReplyFriendInvite(user_id, response);
        // const pseudo = yield select((state) => {
        //     return state.login.pseudo
        // });
        // yield put(GetGroups(pseudo));
        yield put(GetInvitesAction());
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}

function* ReplyEventInvite({event_id, response}) {
    try {
        yield InvitesService.ReplyEventInvite(event_id, response);
        const pseudo = yield select((state) => {
            return state.login.pseudo
        });
        yield put(LoadCalendar(pseudo));
        yield put(GetInvitesAction());
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}
export function* InvitesSaga() {
    yield takeEvery(InvitesActionType.GetInvites, GetInvites);
    yield takeEvery(InvitesActionType.ReplyGroupInvite, ReplyGroupInvite);
    yield takeEvery(InvitesActionType.ReplyEventInvite, ReplyEventInvite);
    yield takeEvery(InvitesActionType.ReplyFriendInvite, ReplyFriendInvite);
}
