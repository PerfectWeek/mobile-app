import React from 'react';
import { View, Text, Button } from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

export class Home extends React.Component {
    navSecond(){
        this.props.navigator.push({
          id: 'Login'
        })
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Home</Text>
                <Button title="Hey" rounded bordered info small onPress={() => {
                                                this.props.navigation.navigate('Login');
                                            }}>
                                                <Text>Setup</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

export const Welcome = withNavigation(connect(mapStateToProps)(Home));
