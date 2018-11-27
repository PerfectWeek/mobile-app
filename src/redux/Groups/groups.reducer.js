import {GroupsActionType} from "./groups.actions";

export const GroupReducer = (state = { status: 'NONE'}, action) => {
    switch (action.type) {
        case GroupsActionType.GetGroups:
            return {
                ...state,
                status: GroupsActionType.GetGroups
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
        case GroupsActionType.GetGroupMembers:
            return {
                ...state,
                status: GroupsActionType.GetGroupMembers
            };
        case GroupsActionType.GetGroupMembersSuccess:
            const groupIndex = state.groups.findIndex((g) => {return (g.id === action.groupId)});
            state.groups[groupIndex].members = action.members;
            return {
                ...state,
                status: GroupsActionType.GetGroupMembersSuccess,
                error_message: action.error
            };
        case GroupsActionType.GetGroupMembersFail:
            return {
                ...state,
                status: GroupsActionType.GetGroupMembersFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};