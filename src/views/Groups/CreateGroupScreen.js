import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Picker, Container} from "native-base";
import Modal from "../../Components/Modal";
import {validateNotEmpty} from "../../Utils/utils";
import {CreateGroup, GetGroups, GroupsActionType} from "../../redux/Groups/groups.actions";
import {ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import {ListUsers} from "../Calendar/tools/ListUsers";

export class _CreateGroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Create group'
    };


    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            description: '',
            searchBar: '',
            usersToAdd: []
        }
    }

    componentDidUpdate() {
        if (this.props.groups.status === GroupsActionType.CreateGroupSuccess) {
            this.props.GetGroups(this.props.login.pseudo);
            this.props.navigation.navigate('Master')
        }
    }

    onValueChange(item) {
        const slp = item.split('-');
        const idx = parseInt(slp[1])
        this.state.usersToAdd[idx].role = slp[0];
        this.forceUpdate();
    }

    render() {
        // console.log(this.state.usersToAdd);
        return (
            <Container style={{backgroundColor: ScreenBackgroundColor}}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item>
                            <Input style={{textAlign: 'center', color: 'black', fontFamily: 'Lato_Bold', fontSize: 26}}
                                   placeholder="Group name" value={this.state.groupName}
                                   onChangeText={(text) => this.setState({groupName: text})}/>
                        </Item>
                        <Item>
                            <Input
                                style={{textAlign: 'center', color: 'black', fontFamily: 'Lato_Medium', fontSize: 16}}
                                placeholder="Description" value={this.state.description}
                                onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                        {/*<Title style={{*/}
                        {/*    color: 'black',*/}
                        {/*    fontFamily: 'Lato_Bold',*/}
                        {/*    fontSize: 18,*/}
                        {/*    marginTop: 20,*/}
                        {/*    flexDirection: 'row',*/}
                        {/*    justifyContent: 'flex-start',*/}
                        {/*}}>Members:</Title>*/}
                    </Form>
                </View>
                <ListUsers callAddUser={(userList) => {
                    this.setState({usersToAdd: userList})
                }}
                           displaySelection={false}
                           formatAdd={(item) => {return ({name: item, role: 'actor'})}}
                />
                {/*  DISPLAY LIST USERS */}
                <View style={{margin: 20, flexDirection: 'column'}}>
                    {
                        this.state.usersToAdd.map((user, index) => {
                            return (
                                <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                <Text style={{marginTop: 8}}>{user.name}</Text>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 120 }}
                                        selectedValue={user.role+"-"+index}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Admin" value={"admin-"+index} />
                                        <Picker.Item label="Actor" value={"actor-"+index} />
                                        <Picker.Item label="Spectator" value={"spectator-"+index} />
                                        <Picker.Item label="Outsider" value={"outsider-"+index} />
                                    </Picker>

                                <Button rounded key={index} small style={{margin: 5, backgroundColor: 'grey'}}
                                        onPress={() => {
                                            this.state.usersToAdd.splice(index, 1);
                                            this.setState({
                                                usersToAdd: this.state.usersToAdd,
                                                listPseudo: []
                                            });
                                        }}>
                                    <Icon type='FontAwesome' name='remove'/>
                                </Button>
                                </View>
                            );
                        })
                    }
                </View>
                {
                    this.props.groups.status === GroupsActionType.CreateGroup ? <Loader/> :
                        <Button success
                                disabled={this.state.groupName === '' || this.props.groups.status === GroupsActionType.CreateGroup}
                                rounded style={{margin: 30, marginTop: 5}}
                                onPress={() => {
                                    this.props.CreateGroup({
                                        name: this.state.groupName,
                                        description: this.state.description,
                                        members: this.state.usersToAdd
                                    }, this.props.login.pseudo)
                                    // this.props.navigation.pop();
                                }}>
                            <Text>
                                Create Group
                            </Text>
                        </Button>
                }

            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        CreateGroup: (group, pseudo) => {
            dispatch(CreateGroup(group, pseudo))
        },
        GetGroups: (pseudo) => dispatch(GetGroups(pseudo)),

    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
        login: state.login
    }
};

export const CreateGroupScreen = connect(mapStateToProps, mapDispatchToProps)(_CreateGroupScreen);
