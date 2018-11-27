export const GroupsActionType = {
    GetGroups: 'GET_GROUPS',
    GetGroupSuccess: 'GET_GROUPS_SUCCESS',
    GetGroupFail: 'GET_GROUPS_FAIL',
    GetGroupMembers: 'GET_GROUP_MEMBERS',
    GetGroupMembersSuccess: 'GET_GROUP_MEMBERS_SUCCESS',
    GetGroupMembersFail: 'GET_GROUP_MEMBERS_FAIL',
};

export const GetGroups = (pseudo) => {
    return {
        type: GroupsActionType.GetGroups,
        pseudo: pseudo
    }
};

export const GetGroupSuccess = (groups) => {
    return {
        type: GroupsActionType.GetGroupSuccess,
        groups: groups,
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
        id: id
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