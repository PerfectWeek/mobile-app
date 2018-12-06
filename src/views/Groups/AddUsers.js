import React, {Component} from 'react';
import {Icon, Item, Input, Form, Button, Toast, Text, View} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import {validateNotEmpty} from "../../Utils/utils";
import PropTypes from 'prop-types';
import {AddGroupMembers, GroupsActionType} from "../../redux/Groups/groups.actions";
import Loader from "../../Components/Loader";

class _AddUsers extends Component {
    static propTypes = {
        groupId: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {searchBar: '', usersToAdd: []};
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
                canValidate={(this.state.usersToAdd.length > 0 && this.props.groups.status !== GroupsActionType.AddGroupMembers)}
                canClose={(this.props.groups.status !== GroupsActionType.AddGroupMembers)}
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

                        <Item style={{marginTop: 0}}>
                            <Icon active name='person'/>
                            <Input placeholder="Pseudo" value={this.state.searchBar}
                                   onChangeText={(text) => this.setState({searchBar: text})}/>
                        </Item>
                    </Form>
                    <Button
                        disabled={!validateNotEmpty(this.state.searchBar) || this.state.usersToAdd.includes(this.state.searchBar)
                        || (this.props.groups.status === GroupsActionType.AddGroupMembers)}
                        onPress={() => {
                            this.setState({
                                usersToAdd: [...this.state.usersToAdd, this.state.searchBar],
                                searchBar: ''
                            });
                        }}>
                        <Icon name='add'/>
                    </Button>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 15}}>
                    {
                        this.state.usersToAdd.map((user, index) => {
                            return (
                                <Button rounded key={user} small style={{margin: 5, backgroundColor: 'grey'}}
                                        onPress={() => {
                                            this.state.usersToAdd.splice(index, 1);
                                            this.setState({
                                                usersToAdd: this.state.usersToAdd
                                            });
                                        }}>
                                    <Text>{user}</Text>
                                    <Icon type='FontAwesome' name='remove'/>
                                </Button>
                            );
                        })
                    }
                </View>
                {
                    (this.props.groups.status === GroupsActionType.AddGroupMembers) ?
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
        groups: state.group
    }
};

// export default AddUsers;
export const AddUsers = connect(mapStateToProps, mapDispatchToProps)(_AddUsers);
