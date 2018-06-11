import React, {Component} from 'react'
import {
    View,
    StyleSheet, Dimensions,
    Text,
    TextInput,
    Alert,
    TouchableHighlight
} from 'react-native';
// import {
//     Container,
//     Form,
//     Item,
//     Input,
//     Button,
//     Text
// } from 'native-base'
import MyButton from './../../CustomsComponents/MyButton';

export default class SignInView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            borderColorLogin: '#e87eb0',
            borderColorPassword: '#e87eb0',
            blurColorLogin: '#d2d2d2',
            blurColorPassword: '#d2d2d2',
            marginBot: 10
        };
    }

    _signInAsync = async () => {
        //GET CATS LISTE
        // if (response === null)
        //     return;
        if (this.state.password !== 'tim123') {
            Alert.alert("Sorry !", "Incorrect login or password");
            return;
        }
        this.props.navigation.navigate('DashboardView')
    };

    onfocus(type) {
        if (type === 'log')
            this.setState({borderColorLogin: '#E8740C', blurColorLogin: 'white'});
        else
            this.setState({borderColorPassword: '#E8740C', blurColorPassword: 'white'});
        this.setState({
            marginBot: 10
        })
    }
    onBlur(type) {
        if (type === 'log')
            this.setState({borderColorLogin: '#e87eb0',
                blurColorLogin: '#d2d2d2'});
        else
            this.setState({borderColorPassword: '#e87eb0',
                blurColorPassword: '#d2d2d2'});
        this.setState({
            marginBot: 10
        })
    }

    render () {
        return (
            <View style={{width: Dimensions.get('window').width,
                height: Dimensions.get('window').height}}>
                <View style={styles.body}>
                    <Text style={{fontSize: 30, backgroundColor: '#3d4563', textAlign: 'center', color:'#fff', width: 300,marginBottom:100}}>PerfectWeek</Text>
                    <View style={{height: 200, marginBottom: 30}}>
                        <TextInput onChangeText={(text) => this.setState({email: text})}
                                   onFocus={ () => this.onfocus('log')}
                                   onBlur={() => this.onBlur('log')}
                                   value={this.state.email}
                                   autoCapitalize='none'
                                   placeholder=' Mail or pseudo'
                                   clearButtonMode='always'
                                   placeholderTextColor={this.state.blurColorLogin}
                                   style={[styles.testinput, {borderColor: this.state.borderColorLogin, marginBottom: this.state.marginBot}]}></TextInput>
                        <TextInput onChangeText={(text) => this.setState({password: text})}
                                   onFocus={ () => this.onfocus('pwd')}
                                   onBlur={() => this.onBlur('pwd')}
                                   value={this.state.password}
                                   autoCapitalize='none'
                                   placeholder=' Password'
                                   secureTextEntry={true}
                                   clearButtonMode='always'
                                   placeholderTextColor={this.state.blurColorPassword}
                                   style={[styles.testinput, {borderColor: this.state.borderColorPassword, marginBottom: this.state.marginBot}]}></TextInput>
                    </View>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('RegisterView')}>
                        <Text style={{color:'#FFD60D', textDecorationLine:'underline', textAlign:'center', width: 300}}>Register</Text>
                    </TouchableHighlight>
                </View>
                <View style={{alignItems: 'center'}}>
                    <MyButton style={styles.login} textStyle={{fontSize: 20}} title="VALIDATE" onPress={this._signInAsync}></MyButton>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    body: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height- 40,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#3d4563',
        paddingLeft: 35
    },
    testinput: {
        backgroundColor: '#3d4563',
        color: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        borderWidth: 2,
        width: 300,
        height: 30,
        paddingLeft: 10
    },
    login: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#006dc5',
        height: 40,
        width: Dimensions.get('window').width
    }
})