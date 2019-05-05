import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title, Container} from "native-base";
import Modal from "../../Components/Modal";
import {validateNotEmpty} from "../../Utils/utils";
import {CreateGroup, GroupsActionType} from "../../redux/Groups/groups.actions";
import {ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";

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
        if (this.props.groups.status === GroupsActionType.CreateGroupSuccess)
            this.props.navigation.navigate('Detail', {group: this.props.groups.createdGroup});
    }

    render() {
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
                        <Title style={{
                            color: 'black',
                            fontFamily: 'Lato_Bold',
                            fontSize: 18,
                            marginTop: 20,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>Members:</Title>
                    </Form>
                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    margin: 20
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
                <ScrollView style={{height: Dimensions.get('window').height / 4}}>
                    <View style={{margin: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
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
                </ScrollView>
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
        }
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
