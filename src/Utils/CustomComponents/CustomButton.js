import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo';

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[cstyles.button, this.props.style]}>
                <LinearGradient
                    colors={(this.props.disabled === undefined || !this.props.disabled) ?['#064c96', '#1ac092'] : ['#000000', '#141414']}
                    style={{borderRadius: 20}}
                >{
                    (this.props.disabled === undefined || !this.props.disabled) ?
                    <Button color={"#fff"} title={'Login'} onPress={this.props.onPress}/>
                        :
                    <Button color={"#636363"} title={'Login'} onPress={() => {}}/>
                }
                </LinearGradient>
            </View>
        )
    }
}

const cstyles = StyleSheet.create({
    button: {
        width: 200
    }
});