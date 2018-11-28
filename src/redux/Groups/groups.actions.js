export const GroupsActionType = {
    GetGroups: 'GET_GROUPS',
    GetGroupSuccess: 'GET_GROUPS_SUCCESS',
    GetGroupFail: 'GET_GROUPS_FAIL',
    GetGroupMembers: 'GET_GROUP_MEMBERS',
    GetGroupMembersSuccess: 'GET_GROUP_MEMBERS_SUCCESS',
    GetGroupMembersFail: 'GET_GROUP_MEMBERS_FAIL',
    UpdateMemberRole: 'UPDATE_MEMBER_ROLE',
    UpdateMemberRoleSuccess: 'UPDATE_MEMBER_ROLE_SUCCESS',
    UpdateMemberRoleFail: 'UPDATE_MEMBER_ROLE_FAIL',

};

export const GetGroups = (pseudo) => {
    return {
        type: GroupsActionType.GetGroups,
        pseudo
    }
};

export const GetGroupSuccess = (groups) => {
    return {
        type: GroupsActionType.GetGroupSuccess,
        groups,
        error_message: null
    }
};

export const GetGroupFail = (error_message) => {
    return {
        type : GroupsActionType.GetGroupMembersFail,
        error_message: error_message
    }
};

export const GetGroupMembers = (id) => {
    return {
        type: GroupsActionType.GetGroupMembers,
        id
    }
};

export const GetGroupMembersSuccess = (id, members) => {
    return {
        type: GroupsActionType.GetGroupMembersSuccess,
        groupId: id,
        members: members,
        error_message: null
    }
};

export const GetGroupMembersFail = (error_message) => {
    return {
        type : GroupsActionType.GetGroupMembersFail,
        error_message: error_message
    }
};

export const UpdateMemberRole = (groupId, member, newRole) => {
    return {
        type: GroupsActionType.UpdateMemberRole,
        groupId,
        member,
        newRole
    }
};

export const UpdateMemberRoleSuccess = (groupId, member) => {
    return {
        type: GroupsActionType.UpdateMemberRoleSuccess,
        error_message: null,
        groupId,
        member
    }
};

export const UpdateMemberRoleFail = (error_message) => {
    return {
        type : GroupsActionType.UpdateMemberRoleFail,
        error_message: error_message
    }
};