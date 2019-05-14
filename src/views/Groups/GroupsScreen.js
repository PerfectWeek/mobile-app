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
    Button, Icon, ActionSheet, Container
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {DeleteGroup, GetGroups, GroupsActionType} from "../../redux/Groups/groups.actions";
import * as Animatable from 'react-native-animatable';
import {HeaderBackgroundColor, ScreenBackgroundColor} from "../../../Style/Constant";
import {NavigationActions} from "react-navigation";
import Loader from "../../Components/Loader";

export class _GroupsScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.props.GetGroups(this.props.login.pseudo);
        
    }

    render() {
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                backgroundColor: ScreenBackgroundColor
            }}>
                <Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>
                    <Body>
                    <Title style={{color: 'black'}}>My groups</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate({routeName: 'CreateGroup'});
                        }}>
                            <Icon style={{fontSize: 28, fontWeight: 'bold', color: '#064C96'}} type={"MaterialIcons"} name='add'/>
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={{paddingLeft: 10, paddingRight: 10, height: Dimensions.get('window').height}}>
                    {this.props.GroupStore.loading === true ?
                        <Container style={{
                            backgroundColor: ScreenBackgroundColor,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Loader/>
                        </Container>
                        : (Object.values(this.props.groups).length === 0) ?
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
                            :
                            Object.values(this.props.groups).map((group) => {
                                return (
                                    <Animatable.View key={group.id} animation="fadeInUp">
                                        <List>
                                            <ListItem onPress={() => {
                                                this.props.navigation.navigate('Detail', {group: group});
                                            }} avatar>
                                                <Left>
                                                    <Thumbnail
                                                        source={{uri: group.image !== undefined ? group.image : null}}/>
                                                </Left>
                                                <Body>
                                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{group.name}</Text>
                                                <Text>{group.members !== undefined ? Object.keys(group.members).length : group.nb_members} members</Text>
                                                </Body>
                                                <Right>
                                                    <Icon style={{marginTop:10, fontSize:28}} type='SimpleLineIcons' name='options-vertical'
                                                          onPress={() => {
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
        GroupStore: state.group,
        groups: state.group.groups,
        login: state.login
    }
};

export const GroupsScreen = connect(mapStateToProps, mapDispatchToProps)(_GroupsScreen);
