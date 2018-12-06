import React from 'react';
import {Dimensions, Platform, View, ScrollView, Alert} from 'react-native';
import {
    Text,
    Header,
    Body,
    Title,
    List,
    ListItem,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Right,
    Content,
    Button, Icon, ActionSheet
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {DeleteGroup, GetGroups} from "../../redux/Groups/groups.actions";
import * as Animatable from 'react-native-animatable';
import {HeaderBackgroundColor} from "../../../Style/Constant";
import {NavigationActions} from "react-navigation";

export class _GroupsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.props.GetGroups(this.props.login.pseudo);
    }

    render() {
        const groups = this.props.groups.groups;
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title>My groups</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate({routeName: 'CreateGroup'});
                        }}>
                            <Icon style={{fontSize: 28, fontWeight: 'bold'}} type={"MaterialIcons"} name='add'/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={{marginLeft: 10, marginRight: 10, height: Dimensions.get('window').height}}>
                    {groups === undefined ? null : (groups.length === 0) ?
                        <View>
                            <Text style={{marginTop: 20, textAlign: 'center', fontSize: 22}}>
                                You are not in any groups
                            </Text>
                            <Button style={{alignSelf: 'center', margin: 30}} primary
                                    onPress={() => {
                                        this.props.navigation.navigate({routeName: 'CreateGroup'});
                                    }}>
                                <Text>
                                    Create a Group
                                </Text>
                            </Button>
                        </View>
                        : groups.map((group) => {
                            return (
                                <Animatable.View key={group.id} animation="fadeInUp">
                                    <List>
                                        <ListItem onPress={() => {
                                            this.props.navigation.navigate('Detail', {group: group});
                                        }} avatar>
                                            <Left>
                                                <Thumbnail
                                                    source={{uri: 'https://picsum.photos/200/300/?random'}}/>
                                            </Left>
                                            <Body>
                                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{group.name}</Text>
                                            <Text>11 users</Text>
                                            </Body>
                                            <Right>
                                                <Icon type='SimpleLineIcons' name='options-vertical' onPress={() => {
                                                    const BUTTONS = ["Delete Group", "Cancel"];
                                                    const CANCEL_INDEX = BUTTONS.length - 1;
                                                    const ButtonsCallback = [() => {
                                                        Alert.alert('Delete group ?', '', [{
                                                            text: 'Yes', onPress: () => {
                                                                this.props.DeleteGroup(group.id);
                                                            }
                                                        }, {
                                                            text: 'Cancel', onPress: () => {
                                                            }, style: 'cancel'
                                                        }], {cancelable: false})
                                                    }, () => {
                                                    }];
                                                    ActionSheet.show(
                                                        {
                                                            options: BUTTONS,
                                                            cancelButtonIndex: CANCEL_INDEX,
                                                            title: "Manage group"
                                                        },
                                                        buttonIndex => {
                                                            ButtonsCallback[buttonIndex]();
                                                        })

                                                }}/>
                                            </Right>
                                        </ListItem>

                                    </List>
                                </Animatable.View>
                            );
                        })}
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroups: (pseudo) => dispatch(GetGroups(pseudo)),
        DeleteGroup: (groupId) => dispatch(DeleteGroup(groupId))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
        login: state.login
    }
};

export const GroupsScreen = connect(mapStateToProps, mapDispatchToProps)(_GroupsScreen);
