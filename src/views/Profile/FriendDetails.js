import React, {Component} from 'react';
import {Dimensions, View, ScrollView, Alert} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {
    Thumbnail,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Title,
    Right,
    Button,
    Icon,
    Badge,
    ActionSheet,
    Header
} from "native-base";
import {ScreenBackgroundColor} from "../../../Style/Constant";


export class _FriendDetails extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null
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
            <View style={{backgroundColor: ScreenBackgroundColor}}>
                <Header
                    androidStatusBarColor="#000"
                    style={{backgroundColor: "#FFF"}}
                >
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon type={"SimpleLineIcons"} name='arrow-left' style={{color: '#064C96', fontSize:20}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color: '#000000', textAlign: 'center'}}>Profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            const BUTTONS = [];
                            const ButtonsCallback = [];
                            BUTTONS.push("Unfriend");
                            ButtonsCallback.push(() => {
                            });
                            BUTTONS.push("Cancel");
                            ButtonsCallback.push(() => {
                            });
                            const CANCEL_INDEX = BUTTONS.length - 1;
                            ActionSheet.show(
                                {
                                    options: BUTTONS,
                                    cancelButtonIndex: CANCEL_INDEX,
                                    title: "Options"
                                },
                                buttonIndex => {
                                    ButtonsCallback[buttonIndex]();
                                })

                        }}>
                            <Icon type={"SimpleLineIcons"} name='options-vertical' style={{color: '#064C96'}}/>
                        </Button>
                    </Right>
                </Header>
                <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                    <Thumbnail large source={{uri: 'https://picsum.photos/200/300?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                    <Text style={{fontSize: 18, fontFamily: 'Lato_Bold'}}>{this.props.navigation.state.params.invite.title}</Text>
                </View>

                <Text style={{
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 18,
                    fontWeight: "bold"
                }}> Common events</Text>
                <ScrollView style={{
                    backgroundColor: ScreenBackgroundColor,
                    marginLeft: 10,
                    marginRight: 10,
                    height: 400
                }}>
                    <List>
                        {
                            Object.values(IB).map((invite) => {
                                return (

                                    <ListItem key={invite.id} avatar>
                                        <Left>
                                            <Thumbnail
                                                small source={{uri: 'https://picsum.photos/200/300?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                                        </Left>
                                        <Body style={{height: 70}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{invite.title}</Text>
                                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>From : 12/12 - To : 31/12</Text>
                                        </Body>
                                    </ListItem>

                                )
                            })
                        }
                    </List>
                </ScrollView>
            </View>
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

export const FriendDetails = connect(mapStateToProps, mapDispatchToProps)(_FriendDetails);