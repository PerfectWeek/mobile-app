import React from 'react';
import {
    View
} from 'react-native';
import {
    Title,
    Icon, Form, Item, Input, Button, Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import Modal from "../../Components/Modal";
import {EditGroupInfo, GroupsActionType} from "../../redux/Groups/groups.actions";
import {validateNotEmpty} from "../../Utils/utils";
import Loader from "../../Components/Loader";
import {Primary} from "../../../Style/Constant";

export class _GroupDetailScreenImagePicker extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        // const {group} = this.props;
        // this.state = {groupName: group.name, groupDescription: group.description};
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const {group} = this.props;
        return (
                <Modal
                    // canValidate={(this.state.groupName !== '' && this.props.groups.status !== GroupsActionType.EditGroupInfo)}
                    // canClose={(this.props.groups.status !== GroupsActionType.EditGroupInfo)}
                    onRef={ref => (this.modal = ref)} title='Edit Group Image'
                    actionButtonTitle='Update' validateCallback={() => {
                }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                    </View>
                    {/*{*/}
                        {/*(this.props.groups.status === GroupsActionType.EditGroupInfo) ?*/}
                            {/*<Loader/>*/}
                            {/*: null*/}
                    {/*}*/}
                </Modal>
        )
    }

    openEditModal() {
        this.modal.toggle();
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        // EditGroupInfo: (group) => dispatch(EditGroupInfo(group))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
    }
};

export const GroupDetailScreenImagePicker = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreenImagePicker);
