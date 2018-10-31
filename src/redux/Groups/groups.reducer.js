import {GroupsActionType} from "./groups.actions";

export const GroupReducer = (state = { status: 'NONE'}, action) => {
    switch (action.type) {
        case GroupsActionType.GetGroup:
            return {
                ...state,
                status: GroupsActionType.GetGroup
            };
        case GroupsActionType.GetGroupSuccess:
            return {
                ...state,
                status: GroupsActionType.GetGroupSuccess,
                error_message: action.error,
                groups: action.groups
            };
        case GroupsActionType.GetGroupFail:
            return {
                ...state,
                status: GroupsActionType.GetGroupFail,
                error_message: action.error_message
            };
        // case GroupsActionType.UpdateGroup:
        //     return {
        //         ...state,
        //         status: GroupsActionType.UpdateGroup
        //     };
        default:
            return state;
    }
};