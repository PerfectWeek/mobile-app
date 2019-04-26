import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Icon} from "native-base";

function fontSizer (screenWidth) {
    if(screenWidth > 400){
        return 18;
    }else if(screenWidth > 250){
        return 14;
    }else {
        return 12;
    }
}

export default class CustomInput extends Component {
    constructor(props) {
        super(props);
    }

    handleChanges(txt) {
        if (this.props.onChangeText !== undefined)
            this.props.onChangeText(txt)
    }
    render() {
        let er = false;
        if (this.props.error !== undefined)
            er = this.props.error;
        return (
            <View style={[cstyles.textinputView, this.props.style]}>
                {
                    this.props.iconName !== undefined ?
                    <Icon active name={this.props.iconName} style={{marginRight: 5}}/>
                    : null
                }
                <TextInput style={cstyles.textInput}
                           keyboardType={(this.props.type === undefined) ? 'default' : this.props.type}
                           placeholder={this.props.placeholder ? this.props.placeholder : ''}
                           selectTextOnFocus={true}
                           secureTextEntry={this.props.secureTextEntry ? this.props.secureTextEntry : false}
                           onChangeText={(text) => this.handleChanges(text)}
                           autoCapitalize={this.props.autoCapitalize ? this.props.autoCapitalize : 'none'}
                />
                {
                    er ?
                        <Icon active name={'alert'} style={{color: 'red'}}/>
                        : null
                }
            </View>
        )
    }
}

const cstyles = StyleSheet.create({
   textinputView: {
       elevation: 2,
       alignItems: 'center',
        paddingRight: 25,
        paddingLeft: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        borderRadius: 20,
        height: 40,
        width: Dimensions.get('window').width*0.90,
       flexDirection: 'row'
   },
    textInput : {
        fontSize: fontSizer(Dimensions.get('window').width),
        // backgroundColor: 'red',
        width: '90%',
        alignSelf: 'stretch'
    }

});