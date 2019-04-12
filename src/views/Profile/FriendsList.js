import React, {Component} from 'react';
import {Body, Container, Left, List, ListItem, Text, Thumbnail, View} from 'native-base';
import connect from 'react-redux/es/connect/connect';
import {ScreenBackgroundColor} from "../../../Style/Constant";
import {Dimensions, ScrollView} from "react-native";

export class _FriendsList extends Component {
    // static navigationOptions = {
    //     header: null
    // };

    constructor(props) {
        super(props);
    }

    render() {
        const IB = {
            1: {id: 1, title: 'Mathias Aliff'},
            2: {id: 2, title: 'Pierre Sad'},
            3: {id: 3, title: 'Guillaume Bainoire'},
            4: {id: 4, title: 'Ilian Rotaru'},
            5: {id: 5, title: 'Amin Boubou'},
            6: {id: 6, title: 'Julien Montag2'},
            7: {id: 7, title: 'Mehdi Bento'},
            8: {id: 8, title: 'Timour Almazou'}
        };
        return (
            <Container style={{
                backgroundColor: ScreenBackgroundColor
            }}>

                <ScrollView style={{
                    backgroundColor: ScreenBackgroundColor,
                    marginLeft: 10,
                    marginRight: 10,
                    height: Dimensions.get('window').height - 10
                }}>
                    <List>
                        {
                            Object.values(IB).map((invite) => {
                                return (

                                    <ListItem key={invite.id} onPress={() => {
                                        this.props.navigation.navigate('FriendDetails', {invite: invite});
                                    }} avatar>
                                        <Left>
                                            <Thumbnail
                                                large
                                                source={{uri: 'https://picsum.photos/200/300?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                                        </Left>
                                        <Body style={{height: 60}}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{invite.title}</Text>
                                        </Body>
                                    </ListItem>

                                )
                            })
                        }
                    </List>

                </ScrollView>
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

export const FriendsList = connect(mapStateToProps, mapDispatchToProps)(_FriendsList);
