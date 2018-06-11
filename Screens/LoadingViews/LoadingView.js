import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    ActivityIndicator,
    AsyncStorage,
    Dimensions
} from 'react-native'

export default class LoadingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._initiateViews();
    }

    _initiateViews() {
        this.props.navigation.navigate('SignInView');
    }

    render() {
        return (
            <View style={styles.body}>
                <ActivityIndicator />
                <Text style={styles.title}>LOADING !</Text>
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'red',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3d4563'
    },
    title: {
        fontSize: 20,
        color: '#e87eb0',
        textAlign:'center'
    }
});