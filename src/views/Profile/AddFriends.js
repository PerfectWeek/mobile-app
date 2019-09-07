import React, {Component} from 'react';
import {Form, View} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import {ListUsers} from "../Calendar/tools/ListUsers";
import {SendFriendRequest} from "../../redux/Friends/friends.actions";


import {Event, PageHit} from 'expo-analytics';


class _AddAddFriends extends Component {
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
        // console.log(this.state.usersToAdd);
        return (
            <Modal
                canValidate={(this.state.usersToAdd.length > 0)}
                onRef={ref => (this.modal = ref)} title='Add Friends'
                actionButtonTitle='Add' validateCallback={async () => {
                await this.props.login.analytics.hit(new PageHit('AddFriends'))
                    // .then(() => console.log("success"))
                    // .catch(e => console.log(e.message));

                await this.props.login.analytics.event(new Event('Friends', 'SendFriendRequests'));

                this.props.SendFriendRequest(this.state.usersToAdd);
                // this.setState({usersToAdd: [], searchBar: ''});
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
                                   displaySelection={true}
                                   newWidth={200}
                        />
                    </Form>
                </View>
                {/*{*/}
                    {/*(this.props.GroupStore.status === GroupsActionType.AddGroupMembers) ?*/}
                        {/*<Loader/>*/}
                        {/*: null*/}
                {/*}*/}
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
        SendFriendRequest: (pseudos) => dispatch(SendFriendRequest(pseudos)),
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
        // GroupStore: state.group
    }
};

export const AddFriends = connect(mapStateToProps, mapDispatchToProps)(_AddAddFriends);
