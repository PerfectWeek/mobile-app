import {put, takeEvery} from "redux-saga/effects";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";
import {FriendsService} from "../../Services/friends/friends";
import {FriendsActionType, SetFriends, SetLoading} from "./friends.actions";
import {UserService} from "../../Services/Users/users";

function* GetFriends({}) {
    try {
        yield put(SetLoading(true));
        const friends = yield FriendsService.GetFriends();
        yield put(SetFriends(friends));
        yield put(SetLoading(false));
        for (let i = 0; i < friends.length; i++) {
            friends[i].image = yield UserService.GetUserImage(friends[i].pseudo);
        }
        yield put(SetFriends(friends));
    } catch (err) {
        yield put(SetLoading(false));
        yield ShowErrorNotification(err);
    }
}


function* SendFriendRequest({pseudos}) {
    try {
        // yield put(SetLoading(true));
        for (let i = 0; i < pseudos.length; i++) {
            yield FriendsService.SendFriendRequest(pseudos[i]);
        }
        // yield put(SetInvites(invites));
        // yield put(SetLoading(false));
        yield ShowSuccessNotification();
    } catch (err) {
        // yield put(SetLoading(false));
        yield ShowErrorNotification(err);
    }
}

export function* FriendsSaga() {
    yield takeEvery(FriendsActionType.SendFriendRequest, SendFriendRequest);
    yield takeEvery(FriendsActionType.GetFriends, GetFriends);
}
