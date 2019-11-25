import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Button, Form, Icon, Input, Item, Text, Picker, Container} from "native-base";
import { ColorPicker } from 'react-native-color-picker'
import {CreateGroup, GetGroups, GroupsActionType} from "../../redux/Groups/groups.actions";
import {ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import {ListUsers} from "../Calendar/tools/ListUsers";
import {Event} from "expo-analytics";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

export class _CreateGroupScreen extends React.Component {
    static navigationOptions = {
        title: Localization.locale !== 'fr-FR' ? 'Create group': 'Créer un groupe'
    };


    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            color: '',
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
        const idx = parseInt(slp[1]);
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
                                   placeholder={i18n.t('groups.groupname')} value={this.state.groupName}
                                   onChangeText={(text) => this.setState({groupName: text})}/>
                        </Item>
                    </Form>
                </View>
                <ColorPicker
                    onColorSelected={color => this.setState({color})}
                    style={{flex: 1}}
                />
                <View style={{margin: 15}}>
                {/*<ListUsers callAddUser={(userList) => {*/}
                {/*    this.setState({usersToAdd: userList})*/}
                {/*}}*/}
                {/*           displaySelection={false}*/}
                {/*           formatAdd={(item) => {return ({name: item, role: 'actor'})}}*/}
                {/*/>*/}
                </View>
                {
                    this.props.groups.status === GroupsActionType.CreateGroup ? <Loader/> :
                        <Button success
                                disabled={this.state.groupName === '' || this.props.groups.status === GroupsActionType.CreateGroup}
                                rounded style={{margin: 30, marginTop: 5}}
                                onPress={() => {
                                    this.props.login.analytics.event(new Event('Groups', 'Creation'));

                                    this.props.CreateGroup({
                                        name: this.state.groupName,
                                        color: this.state.color,
                                        // members: this.state.usersToAdd
                                    }, this.props.login.pseudo)
                                    this.props.navigation.pop();
                                }}>
                            <Text>
                                {i18n.t('groups.creatgroup')}
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
