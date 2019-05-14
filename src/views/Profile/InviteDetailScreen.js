import React from 'react';
import {
    Dimensions, ScrollView,
    View
} from 'react-native';
import {
    Text,
    Title,
    Thumbnail,
    Button, Item, Icon
} from 'native-base';
import connect from "react-redux/es/connect/connect";


export class _InviteDetailScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <View style={{marginTop: 0, alignItems: 'center', justifyContent: 'center'}}>
                    <Thumbnail large
                               style={{width: Dimensions.get('window').width, height: 160, borderRadius: 0}}

                               source={{uri: 'https://picsum.photos/600/160?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                    <Title style={{color: 'black', fontFamily: 'Lato_Bold', fontSize: 26, marginTop:5}}>
                        {this.props.navigation.state.params.invite.title}
                    </Title>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 0
                    }}>

                        <Icon active name='clock-o' type={"FontAwesome"}/>
                        <Text style={{...textStyle, fontSize: 24, marginLeft: 10}}
                              placeholder="Description">
                            19 April
                        </Text>
                        <Text style={{...textStyle, fontSize: 16, marginLeft:0, marginTop:10}}
                              placeholder="Description">
                            11 - 12 pm
                        </Text>


                    </View>
                </View>

                <Text style={{...textStyle, color: '#3ab7ff', marginBottom: 0, marginTop:0}}
                      placeholder="Description">
                    Victor invited you
                </Text>

                <Text
                    style={{...textStyle, textAlign: 'left', marginTop: 0, marginLeft: 10, marginBottom:0, fontSize: 20, color: 'gray'}}
                    placeholder="Description">
                    Details :
                </Text>
                <ScrollView style={{height: Dimensions.get('window').height / 6}}>
                <Text style={{ fontSize: 18, textAlign : 'center', marginTop:0 }}
                          placeholder="Description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        Labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        {/*{this.props.navigation.state.params.invite.description}*/}
                    </Text>
                </ScrollView>

                <Text style={{fontSize: 18, fontFamily: 'Lato_Bold', textAlign: 'center', marginTop: 10}}>Accept
                    invitation ?</Text>


                <View style={{
                    marginTop: 5,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        <Button success>
                            <Icon active name='check' type={"FontAwesome"}/>
                        </Button>
                        <Text style={{color: 'grey', textAlign: 'center'}}>Yes</Text>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        marginLeft: 5
                    }}>
                        <Button danger>
                            <Icon active name='times' type={"FontAwesome"}/>
                        </Button>
                        <Text style={{color: 'grey', textAlign: 'center'}}>No</Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        marginLeft: 5
                    }}>
                        <Button info>
                            <Icon active name='bell-slash' type={"FontAwesome"}/>
                        </Button>
                        <Text style={{color: 'grey', textAlign: 'center'}}>Dismiss</Text>
                    </View>
                </View>
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

const textStyle = {margin: 10, color: 'black', fontFamily: 'Roboto_medium', fontSize: 18, textAlign: 'center'};


export const InviteDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_InviteDetailScreen);
