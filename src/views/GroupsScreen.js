import React from 'react';
import {Dimensions, Platform, View, ScrollView, Alert} from 'react-native';
import {Text, Header, Body, Title, List, ListItem, Card, CardItem, Thumbnail, Left, Right, Content} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroups} from "../redux/Groups/groups.actions";
import * as Animatable from 'react-native-animatable';
import {HeaderBackgroundColor} from "../../Style/Constant";

export class _GroupsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetGroups(this.props.login.pseudo);
    }

    render() {
        const groups = this.props.groups.groups;
        return (
            <View>
                {/*<Header androidStatusBarColor="#00AE93" style={{backgroundColor: HeaderBackgroundColor}}>*/}
                    {/*<Body>*/}
                    {/*<Title>Groups</Title>*/}
                    {/*</Body>*/}
                {/*</Header>*/}
                <ScrollView style={{marginLeft: 10, marginRight: 10, height: Dimensions.get('window').height}}>
                    {groups === undefined ? null : (groups.length === 0) ?
                        <Text style={{marginTop: 20, textAlign:'center', fontSize: 22}}>
                            You are not in any groups
                        </Text>
                        : groups.map((group) => {
                        return (
                            <Animatable.View key={group.id} animation="fadeInUp">
                                <List>
                                    <ListItem onPress={() => {
                                        this.props.navigation.navigate('Detail', { group: group });
                                    }} avatar>
                                        <Left>
                                            <Thumbnail
                                                source={{uri: 'https://picsum.photos/200/300/?random'}}/>
                                        </Left>
                                        <Body>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{group.name}</Text>
                                        <Text>3 New event</Text>
                                        </Body>
                                        <Right>
                                            <Text note>11 users</Text>
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
        GetGroups: (pseudo) => dispatch(GetGroups(pseudo))
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
