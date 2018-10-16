export const GroupsActionType = {
    GetGroup: 'GET_GROUP',
    GetGroupSuccess: 'GET_GROUPINFO_SUCCESS',
    GetGroupFail: 'GET_GROUPINFO_FAIL',
    // UpdateGroup: 'UPDATE_INFO'
};

export const GetGroup = (groupId) => {
    return {
        type: GroupsActionType.GetGroup,
        groupId: groupId
    }
};

export const GetGroupSuccess = (groups) => {
    // console.log('hehre', groups)
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