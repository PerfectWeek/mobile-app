import React from 'react';
import {
    Button,
    Right,
    Header,
    Title,
    Body,
    Form,
    Icon,
    Input,
    Item,
    Text,
    View,
    Toast,
    Badge,
    Container,
    Thumbnail,
    ActionSheet, List, ListItem, Left
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Alert, Dimensions, Platform, ScrollView} from "react-native";
import {Logout} from "../../redux/Login/login.actions";
import {HeaderBackgroundColor, ScreenBackgroundColor} from "../../../Style/Constant";
import Loader from "../../Components/Loader";
import * as Animatable from "../Groups/GroupsScreen";


export class _Invite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const IB = {
            1: {id: 1, title: 'Party', type: 'event'},
            2: {id: 2, title: 'The Bros', type: 'Group'},
            3: {id: 3, title: 'Football', type: 'Event'},
            4: {id: 4, title: 'Football', type: 'Event'},
            5: {id: 5, title: 'Football', type: 'Event'},
            6: {id: 6, title: 'Football', type: 'Event'},
            7: {id: 7, title: 'Football', type: 'Event'},
            8: {id: 8, title: 'Football', type: 'Event'},
            9: {id: 9, title: 'Football', type: 'Event'},
            10: {id: 10, title: 'Football', type: 'Event'}
        };
        return (
            <Container style={{
                backgroundColor: ScreenBackgroundColor
            }}>
                <View>

                    <ScrollView style={{
                        backgroundColor: ScreenBackgroundColor,
                        marginLeft: 10,
                        marginRight: 10,
                        height: Dimensions.get('window').height
                    }}>
                        <List>
                            {
                                Object.values(IB).map((invite) => {
                                    return (

                                        <ListItem key={invite.id} onPress={() => {
                                            this.props.navigation.navigate('InviteDetail', {invite: invite});
                                        }} avatar>
                                            <Left>
                                                <Thumbnail
                                                    source={{uri: 'https://picsum.photos/200/300?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                                            </Left>
                                            <Body style={{height: 70}}>
                                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{invite.title}</Text>
                                            <Text>{invite.type}</Text>
                                            </Body>
                                            <Right>
                                                <Icon style={{marginTop: 10, fontSize: 28}}
                                                      type='SimpleLineIcons' name='options-vertical'/>
                                            </Right>
                                        </ListItem>

                                    )
                                })
                            }
                        </List>

                    </ScrollView>

                </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,

    }
};

export const Invite = connect(mapStateToProps, mapDispatchToProps)(_Invite);
