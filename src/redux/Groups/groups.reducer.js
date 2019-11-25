import {GroupsActionType} from "./groups.actions";
import {UserActionsType} from "../User/user.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {
    status: 'NONE',
    groups: {}
};

export const GroupReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case GroupsActionType.SetLoading:
            return {
                ...state,
                loading: action.loading
            };
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
        case GroupsActionType.GetGroupsImage:
            return {
                ...state,
                status: GroupsActionType.GetGroupsImage
            };
        case GroupsActionType.GetGroupsImageSuccess:
            return {
                ...state,
                status: GroupsActionType.GetGroupsImageSuccess,
                error_message: action.error,
                groups: action.groups
            };
        case GroupsActionType.GetGroupsImageFail:
            return {
                ...state,
                status: GroupsActionType.GetGroupsImageFail,
                error_message: action.error_message
            };
        case GroupsActionType.GetGroupInfo:
            return {
                ...state,
                status: GroupsActionType.GetGroupInfo
            };
        case GroupsActionType.GetGroupInfoSuccess:
            state.groups[action.group.id] = {...state.groups[action.group.id], ...action.group};
            return {
                ...state,
                status: GroupsActionType.GetGroupInfoSuccess,
                error_message: action.error
            };
        case GroupsActionType.GetGroupInfoFail:
            return {
                ...state,
                status: GroupsActionType.GetGroupInfoFail,
                error_message: action.error_message
            };
        case GroupsActionType.GetGroupMembers:
            return {
                ...state,
                status: GroupsActionType.GetGroupMembers
            };
        case GroupsActionType.GetGroupMembersSuccess: {
            state.groups[action.groupId].members = action.members;
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
            state.groups[action.groupId].members[action.member.pseudo] = action.member;
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
            state.groups[action.groupId].members = action.members;
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
            if (action.selfKick)
                delete state.groups[action.groupId];
            else {
                state.groups[action.groupId].members = action.members;
            }
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
            state.groups[action.group.id] = {...state.groups[action.group.id], ...action.group};
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

        case GroupsActionType.CreateGroup:
            return {
                ...state,
                status: GroupsActionType.CreateGroup
            };
        case GroupsActionType.CreateGroupSuccess: {
            console.log("EHHHH", action.group, state.groups)
            state.groups[action.group.id] = action.group;
            return {
                ...state,
                status: GroupsActionType.CreateGroupSuccess,
                error_message: action.error_message,
                createdGroup: action.group
            };
        }
        case GroupsActionType.CreateGroupFail:
            return {
                ...state,
                status: GroupsActionType.CreateGroupFail,
                error_message: action.error_message
            };

        case GroupsActionType.DeleteGroup:
            return {
                ...state,
                status: GroupsActionType.DeleteGroup
            };
        case GroupsActionType.DeleteGroupSuccess: {
            delete state.groups[action.groupId];
            return {
                ...state,
                status: GroupsActionType.DeleteGroupSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.DeleteGroupFail:
            return {
                ...state,
                status: GroupsActionType.DeleteGroupFail,
                error_message: action.error_message
            };
        case GroupsActionType.UpdateGroupImage:
            return {
                ...state,
                status: GroupsActionType.UpdateGroupImage
            };
        case GroupsActionType.UpdateGroupImageSuccess: {
            state.groups[action.groupId].image = action.image;
            return {
                ...state,
                status: GroupsActionType.UpdateGroupImageSuccess,
                error_message: action.error_message
            };
        }
        case GroupsActionType.UpdateGroupImageFail:
            return {
                ...state,
                status: GroupsActionType.UpdateGroupImageFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};
