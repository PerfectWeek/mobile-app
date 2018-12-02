import React, {Component} from 'react';
import {View} from 'native-base';
import LottieView from "lottie-react-native";

class Loader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <View style={{
                    marginTop: 20, width: 80, height: 80
                }}>
                    <LottieView style={{}}
                                loop
                                source={require('../../Resources/Lottie/loading.json')}
                                autoPlay
                    />
                </View>
            </View>
        );
    }
}

export default Loader;