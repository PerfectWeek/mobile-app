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
        case GroupsActionType.AddGroupMembers:
            return {
                ...state,
                status: GroupsActionType.AddGroupMembers
            };
        case GroupsActionType.AddGroupMembersSuccess: {

            const groupIndex = state.groups.findIndex((g) => {
                return (g.id === action.groupId)
            });
            state.groups[groupIndex].members = action.members;
            return {
                ...state,
                status: GroupsActionType.AddGroupMembersSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.AddGroupMembersFail:
            return {
                ...state,
                status: GroupsActionType.AddGroupMembersFail,
                error_message: action.error_message
            };
        case GroupsActionType.RemoveGroupMember:
            return {
                ...state,
                status: GroupsActionType.RemoveGroupMember
            };
        case GroupsActionType.RemoveGroupMemberSuccess: {
            const groupIndex = state.groups.findIndex((g) => {
                return (g.id === action.groupId)
            });
            state.groups[groupIndex].members = action.members;
            return {
                ...state,
                status: GroupsActionType.RemoveGroupMemberSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.RemoveGroupMemberFail:
            return {
                ...state,
                status: GroupsActionType.RemoveGroupMemberFail,
                error_message: action.error_message
            };
        case GroupsActionType.EditGroupInfo:
            return {
                ...state,
                status: GroupsActionType.EditGroupInfo
            };
        case GroupsActionType.EditGroupInfoSuccess: {
            const groupIndex = state.groups.findIndex((g) => {
                return (g.id === action.group.id)
            });
            console.log("Before");
            console.log(state.groups[groupIndex]);
            state.groups[groupIndex] = { ...state.groups[groupIndex], ...action.group };
            console.log("After");
            console.log(state.groups[groupIndex]);
            return {
                ...state,
                status: GroupsActionType.EditGroupInfoSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.EditGroupInfoFail:
            return {
                ...state,
                status: GroupsActionType.EditGroupInfoFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};