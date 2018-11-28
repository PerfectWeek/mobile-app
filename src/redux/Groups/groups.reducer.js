import {GroupsActionType} from "./groups.actions";

export const GroupReducer = (state = {status: 'NONE'}, action) => {
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
        case GroupsActionType.GetGroupMembersSuccess: {
            const groupIndex = state.groups.findIndex((g) => {
                return (g.id === action.groupId)
            });
            state.groups[groupIndex].members = action.members;
            return {
                ...state,
                status: GroupsActionType.GetGroupMembersSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.GetGroupMembersFail:
            return {
                ...state,
                status: GroupsActionType.GetGroupMembersFail,
                error_message: action.error_message
            };
        case GroupsActionType.UpdateMemberRole:
            return {
                ...state,
                status: GroupsActionType.UpdateMemberRole
            };
        case GroupsActionType.UpdateMemberRoleSuccess: {

            const groupIndex = state.groups.findIndex((g) => {
                return (g.id === action.groupId)
            });
            const memberIndex = state.groups[groupIndex].members.findIndex(m => {
                return m.pseudo === action.member.pseudo
            });
            state.groups[groupIndex].members[memberIndex] = action.member;
            return {
                ...state,
                status: GroupsActionType.UpdateMemberRoleSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.UpdateMemberRoleFail:
            return {
                ...state,
                status: GroupsActionType.UpdateMemberRoleFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};