export const GroupsActionType = {
    GetGroups: 'GET_GROUPS',
    GetGroupSuccess: 'GET_GROUPS_SUCCESS',
    GetGroupFail: 'GET_GROUPS_FAIL',
    GetGroupsImage: 'GET_GROUPS_IMAGE',
    GetGroupsImageSuccess: 'GET_GROUPS_IMAGE_SUCCESS',
    GetGroupsImageFail: 'GET_GROUPS_IMAGE_FAIL',
    GetGroupInfo: 'GET_GROUP_INFO',
    GetGroupInfoSuccess: 'GET_GROUP_INFO_SUCCESS',
    GetGroupInfoFail: 'GET_GROUP_INFO_FAIL',
    GetGroupMembers: 'GET_GROUP_MEMBERS',
    GetGroupMembersSuccess: 'GET_GROUP_MEMBERS_SUCCESS',
    GetGroupMembersFail: 'GET_GROUP_MEMBERS_FAIL',
    UpdateMemberRole: 'UPDATE_MEMBER_ROLE',
    UpdateMemberRoleSuccess: 'UPDATE_MEMBER_ROLE_SUCCESS',
    UpdateMemberRoleFail: 'UPDATE_MEMBER_ROLE_FAIL',
    AddGroupMembers: 'ADD_GROUP_MEMBERS',
    AddGroupMembersSuccess: 'ADD_GROUP_MEMBERS_SUCCESS',
    AddGroupMembersFail: 'ADD_GROUP_MEMBERS_FAIL',
    RemoveGroupMember: 'REMOVE_GROUP_MEMBER',
    RemoveGroupMemberSuccess: 'REMOVE_GROUP_MEMBER_SUCCESS',
    RemoveGroupMemberFail: 'REMOVE_GROUP_MEMBER_FAIL',
    EditGroupInfo: 'EDIT_GROUP_INFO',
    EditGroupInfoSuccess: 'EDIT_GROUP_INFO_SUCCESS',
    EditGroupInfoFail: 'EDIT_GROUP_INFO_FAIL',
    CreateGroup: 'CREATE_GROUP',
    CreateGroupSuccess: 'CREATE_GROUP_SUCCESS',
    CreateGroupFail: 'CREATE_GROUP_FAIL',
    DeleteGroup: 'DELETE_GROUP',
    DeleteGroupSuccess: 'DELETE_GROUP_SUCCESS',
    DeleteGroupFail: 'DELETE_GROUP_FAIL',
    UpdateGroupImage: 'UPDATE_GROUP_IMAGE',
    UpdateGroupImageSuccess: 'UPDATE_GROUP_IMAGE_SUCCESS',
    UpdateGroupImageFail: 'UPDATE_GROUP_IMAGE_FAIL',
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
        type: GroupsActionType.GetGroupFail,
        error_message: error_message
    }
};

export const GetGroupsImage = (groups) => {
    return {
        type: GroupsActionType.GetGroupsImage,
        groups
    }
};

export const GetGroupsImageSuccess = (groups) => {
    return {
        type: GroupsActionType.GetGroupsImageSuccess,
        groups,
        error_message: null
    }
};

export const GetGroupsImageFail = (error_message) => {
    return {
        type: GroupsActionType.GetGroupsImageFail,
        error_message: error_message
    }
};


export const GetGroupInfo = (id) => {
    return {
        type: GroupsActionType.GetGroupInfo,
        id
    }
};

export const GetGroupInfoSuccess = (group) => {
    return {
        type: GroupsActionType.GetGroupInfoSuccess,
        group,
        error_message: null
    }
};

export const GetGroupInfoFail = (error_message) => {
    return {
        type: GroupsActionType.GetGroupInfoFail,
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
        type: GroupsActionType.GetGroupMembersFail,
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
        type: GroupsActionType.UpdateMemberRoleFail,
        error_message: error_message
    }
};

export const AddGroupMembers = (groupId, members) => {
    return {
        type: GroupsActionType.AddGroupMembers,
        groupId,
        members,
    }
};

export const AddGroupMembersSuccess = (groupId, members) => {
    return {
        type: GroupsActionType.AddGroupMembersSuccess,
        error_message: null,
        groupId,
        members
    }
};

export const AddGroupMembersFail = (error_message) => {
    return {
        type: GroupsActionType.AddGroupMembersFail,
        error_message: error_message
    }
};

export const RemoveGroupMember = (groupId, member, Selfpseudo) => {
    return {
        type: GroupsActionType.RemoveGroupMember,
        groupId,
        member,
        Selfpseudo
    }
};

export const RemoveGroupMemberSuccess = (groupId, members, selfKick) => {
    return {
        type: GroupsActionType.RemoveGroupMemberSuccess,
        error_message: null,
        groupId,
        members,
        selfKick
    }
};

export const RemoveGroupMemberFail = (error_message) => {
    return {
        type: GroupsActionType.RemoveGroupMemberFail,
        error_message: error_message
    }
};

export const EditGroupInfo = (group) => {
    return {
        type: GroupsActionType.EditGroupInfo,
        group
    }
};

export const EditGroupInfoSuccess = (group) => {
    return {
        type: GroupsActionType.EditGroupInfoSuccess,
        error_message: null,
        group
    }
};

export const EditGroupInfoFail = (error_message) => {
    return {
        type: GroupsActionType.EditGroupInfoFail,
        error_message: error_message
    }
};

export const CreateGroup = (group) => {
    return {
        type: GroupsActionType.CreateGroup,
        group
    }
};

export const CreateGroupSuccess = (group) => {
    return {
        type: GroupsActionType.CreateGroupSuccess,
        error_message: null,
        group
    }
};

export const CreateGroupFail = (error_message) => {
    return {
        type: GroupsActionType.CreateGroupFail,
        error_message: error_message
    }
};

export const DeleteGroup = (groupId) => {
    return {
        type: GroupsActionType.DeleteGroup,
        groupId
    }
};

export const DeleteGroupSuccess = (groupId) => {
    return {
        type: GroupsActionType.DeleteGroupSuccess,
        error_message: null,
        groupId
    }
};

export const DeleteGroupFail = (error_message) => {
    return {
        type: GroupsActionType.DeleteGroupFail,
        error_message: error_message
    }
};

export const UpdateGroupImage = (groupId, image) => {
    return {
        type: GroupsActionType.UpdateGroupImage,
        groupId,
        image
    }
};

export const UpdateGroupImageSuccess = (groupId, image) => {
    return {
        type: GroupsActionType.UpdateGroupImageSuccess,
        error_message: null,
        groupId,
        image
    }
};

export const UpdateGroupImageFail = (error_message) => {
    return {
        type: GroupsActionType.UpdateGroupImageFail,
        error_message: error_message
    }
};