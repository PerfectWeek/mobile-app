import React, {Component} from 'react';
import {Icon, Item, Input, Form, Button, Toast, Text, View} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import {validateNotEmpty} from "../../Utils/utils";
import PropTypes from 'prop-types';
import {AddGroupMembers, GroupsActionType} from "../../redux/Groups/groups.actions";
import Loader from "../../Components/Loader";
import {Dimensions, ScrollView} from "react-native";
import {ListUsers} from "../Calendar/tools/ListUsers";

class _AddUsers extends Component {
    static propTypes = {
        groupId: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            searchBar: '',
            usersToAdd: []
        };
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const {groupId} = this.props;

        return (
            <Modal
                canValidate={(this.state.usersToAdd.length > 0 && this.props.GroupStore.status !== GroupsActionType.AddGroupMembers)}
                canClose={(this.props.GroupStore.status !== GroupsActionType.AddGroupMembers)}
                onRef={ref => (this.modal = ref)} title='Add members'
                actionButtonTitle='Add' validateCallback={() => {
                this.props.AddGroupMembers(groupId, this.state.usersToAdd);
                this.setState({usersToAdd: [], searchBar: ''});
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>

                        <ListUsers callAddUser={(userList) => {
                            this.setState({usersToAdd: userList})
                        }}
                                   displaySelection={false}
                                   formatAdd={(item) => {return ({name: item, role: 'actor'})}}
                                   newWidth={200}
                        />
                    </Form>
                </View>
                {
                    (this.props.GroupStore.status === GroupsActionType.AddGroupMembers) ?
                        <Loader/>
                        : null
                }
            </Modal>
        )
    }

    openModal() {
        this.modal.toggle();
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        AddGroupMembers: (id, members) => dispatch(AddGroupMembers(id, members)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        GroupStore: state.group
    }
};

export const AddUsers = connect(mapStateToProps, mapDispatchToProps)(_AddUsers);
