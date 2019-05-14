import {Dimensions, ScrollView, View} from 'react-native'
import React from 'react';
import {Button, Form, Icon, Input, Item, Text} from "native-base";
import {validateNotEmpty} from "../../../Utils/utils";

export class _ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBar: '',
            usersToAdd: []
        }
    }

    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    margin: 20
                }}>
                    <Form style={{
                        marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>

                        <Item style={{marginTop: 0}}>
                            <Icon active name='person'/>
                            <Input placeholder="Add users by pseudo" value={this.state.searchBar}
                                   onChangeText={(text) => this.setState({searchBar: text})}/>
                        </Item>
                    </Form>
                    <Button
                        disabled={!validateNotEmpty(this.state.searchBar) || this.state.usersToAdd.includes(this.state.searchBar)}
                        onPress={() => {
                            this.setState({
                                usersToAdd: [...this.state.usersToAdd, this.state.searchBar],
                                searchBar: ''
                            });
                            this.props.callAddUser([...this.state.usersToAdd, this.state.searchBar])
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
                                                this.props.callAddUser(this.state.usersToAdd)
                                            }}>
                                        <Text>{user}</Text>
                                        <Icon type='FontAwesome' name='remove'/>
                                    </Button>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }

}

export const ListUsers = _ListUsers;