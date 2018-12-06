import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Title} from "native-base";
import Modal from "../../Components/Modal";
import {validateNotEmpty} from "../../Utils/utils";
import {CreateGroup, GroupsActionType} from "../../redux/Groups/groups.actions";

export class _CreateGroupScreen extends React.Component {
    static navigationOptions = {
        title: 'Create group'
    };

    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            searchBar: '',
            usersToAdd: []
        }
    }

    componentWillMount() {
        console.log("WillMount");
    }

    componentDidUpdate() {
        if (this.props.groups.status === GroupsActionType.CreateGroupSuccess)
            this.props.navigation.navigate('Detail', {group: this.props.groups.createdGroup});
    }

    render() {
        return (
            <View>
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
                <ScrollView style={{height: Dimensions.get('window').height / 3}}>
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
                <Button success disabled={this.state.groupName === ''}
                        rounded style={{margin: 30}}
                        onPress={() => {
                            this.props.CreateGroup({name: this.state.groupName, members: this.state.usersToAdd})
                        }}>
                    <Text>
                        Create Group
                    </Text>
                </Button>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        CreateGroup: (group) => {
            dispatch(CreateGroup(group))
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
