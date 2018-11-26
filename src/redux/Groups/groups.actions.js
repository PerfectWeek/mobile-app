export const GroupsActionType = {
    GetGroups: 'GET_GROUPS',
    GetGroupSuccess: 'GET_GROUPS_SUCCESS',
    GetGroupFail: 'GET_GROUPS_FAIL',
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
        type : GroupsActionType.GetGroupFail,
        error_message: error_message
    }
};