import React from 'react';
import {Dimensions, Platform, View, ScrollView} from 'react-native';
import {Text, Header, Body, Title, List, ListItem, Card, CardItem} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroup} from "../redux/Groups/groups.actions";


export class _Groups extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetGroup(1);
    }

    render() {
        const groupInfo = this.props.groups.groups;
        return (
            <View style={{
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <Header androidStatusBarColor="#34495e" style={{backgroundColor: '#2477d6'}}>
                    <Body>
                    <Title>Groups</Title>
                    </Body>
                </Header>
                {groupInfo !== undefined ?
                    <ScrollView style={{height: Dimensions.get('window').height}}>
                        <Text style={{fontSize: 20, marginTop: 20}}>
                            Groups list
                        </Text>
                        <Card>
                            <CardItem header>
                                <Text style={{fontSize: 20, marginTop: 20}}>
                                    Group : {groupInfo.name}
                                </Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                <Text style={{fontSize: 20, marginTop: 20}}>
                                    Group members
                                </Text>
                                <List style={{width: Dimensions.get('window').width}}
                                      dataArray={groupInfo.members}
                                      renderRow={(item) =>
                                          <ListItem>
                                              <Text>{item.pseudo}</Text>
                                          </ListItem>
                                      }>
                                </List>
                                </Body>
                            </CardItem>
                        </Card>
                    </ScrollView>
                    : null
                }
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroup: (groupId) => dispatch(GetGroup(groupId))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group
    }
};

export const Groups = connect(mapStateToProps, mapDispatchToProps)(_Groups);
