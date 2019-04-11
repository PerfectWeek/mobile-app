import React from 'react';
import {
    View} from 'react-native';
import {
    Text,
    Title,
    Thumbnail,
    Button} from 'native-base';
import connect from "react-redux/es/connect/connect";


export class _InviteDetailScreen extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <View style={{marginTop: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Thumbnail large
                               source={{uri: 'https://picsum.photos/200/300?image=' + Math.floor((Math.random() * 1000) % 200)}}/>
                    <Title style={{color: 'black', fontFamily: 'Lato_Bold', fontSize: 26, marginTop: 20}}>
                        {this.props.navigation.state.params.invite.title}
                    </Title>
                </View>

                <Text style={{fontSize: 18, fontFamily: 'Lato_Bold', textAlign:'center', marginTop: 40}}>Accept invitation ?</Text>


                <View style={{
                    marginTop: 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Button
                        onPress={() => {
                        }}>
                        <Text>Yes</Text>
                    </Button>
                    <Button style={{marginLeft: 10}} danger
                    >
                        <Text>No</Text>
                    </Button>
                    <Button style={{marginLeft: 15}} info
                    >
                        <Text>Dismiss</Text>
                    </Button>
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

export const InviteDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_InviteDetailScreen);
