import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { LinearGradient } from 'expo';

export default class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[cstyles.button, this.props.style]}>
                <LinearGradient
                    colors={(this.props.disabled === undefined || !this.props.disabled) ?['#064c96', '#1ac092'] : ['#000000', '#999999']}
                    style={{borderRadius: 20}}
                >{
                    (this.props.disabled === undefined || !this.props.disabled) ?
                        <TouchableOpacity color={"#fff"} title={this.props.title} onPress={this.props.onPress}>
                            <Text style={{margin:10, color:'white', textAlign:'center', fontSize:18, fontWeight:'bold'}}>{this.props.title}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity color={"#636363"} title={this.props.title} onPress={() => {}}>
                            <Text style={{margin:10, color:'white', textAlign:'center', fontSize:18, fontWeight:'bold'}}>{this.props.title}</Text>
                        </TouchableOpacity>
                }
                </LinearGradient>
            </View>)
    }
}

const cstyles = StyleSheet.create({
    button: {
        width: 200
    }
});