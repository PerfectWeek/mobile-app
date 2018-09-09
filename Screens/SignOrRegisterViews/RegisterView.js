import React, {Component} from 'react'
import {
    View,
    StyleSheet, Dimensions,
    Text,
    TextInput,
    Alert
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
import {axiosPost} from "../../Networking/Requests";

export default class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pseudo: '',
            password: '',
            password2: '',
            borderColorLogin: '#e87eb0',
            borderColorPassword: '#e87eb0',
            blurColorLogin: '#d2d2d2',
            blurColorPassword: '#d2d2d2',
            borderColorLogin2: '#e87eb0',
            borderColorPassword2: '#e87eb0',
            blurColorLogin2: '#d2d2d2',
            blurColorPassword2: '#d2d2d2',
            marginBot: 10,
            validation: false
        };
    }

    async  _signInAsync()  {
        if (this.state.validation === false) {
            Alert.alert('Some fields are invalide');
            return ;
        }
        else if (!this.state.pseudo || !this.state.email || !this.state.password || !this.state.password2) {
            Alert.alert('You have to specify all fields');
            return ;
        }
        else if (this.state.password !== this.state.password2) {
            Alert.alert('Passwords don\'t match ');
            return ;
        }
        // try {
            const resp = await axiosPost('users', {
                email: this.state.email,
                pseudo: this.state.pseudo,
                password: this.state.password
            });
            if (resp.status === 201)
                Alert.alert('Account created !');
            else
                Alert.alert('Something went wrong');
        // }
        // catch (e) {
        //     console.log(e);
        //     console.log('tim'
        //     );
        //     Alert.alert('tim')
        // }
        this.props.navigation.goBack()
    };

    onfocus(type) {
        if (type === 'log')
            this.setState({borderColorLogin: '#E8740C', blurColorLogin: 'white'});
        else if (type === 'pwd')
            this.setState({borderColorPassword: '#E8740C', blurColorPassword: 'white'});
        this.setState({
            marginBot: 10
        });
        if (type === 'log2')
            this.setState({borderColorLogin2: '#E8740C', blurColorLogin2: 'white'});
        else if (type === 'pwd2')
            this.setState({borderColorPassword2: '#E8740C', blurColorPassword2: 'white'});
        this.setState({
            marginBot: 10
        });
    }

    hasUpperCase(str) {
        return (/[a-z]/.test(str));
    }

    isMail() {
        return (/(?:\w+\.)*\w+@(?:\w+\.)+\w+/.test(this.state.email));
    }

    onBlur(type) {
        if (type === 'log') {
            if (this.isMail())
                this.setState({borderColorLogin: '#e87eb0', blurColorLogin: '#d2d2d2', validation: true});
            else
                this.setState({borderColorLogin: 'red', blurColorLogin: 'red', validation: false});
        }
        else if (type === 'pwd') {
            if (this.hasUpperCase(this.state.password) && this.state.password.length < 7)
                this.setState({borderColorPassword: 'red', blurColorPassword: 'red', validation: false});
            else
                this.setState({borderColorPassword: '#e87eb0', blurColorPassword: '#d2d2d2', validation: true});
        }
        if (type === 'log2')
            this.setState({borderColorLogin2: '#e87eb0',
                blurColorLogin2: '#d2d2d2'});
        else if (type === 'pwd2')
            this.setState({borderColorPassword2: '#e87eb0',
                blurColorPassword2: '#d2d2d2'});
        this.setState({
            marginBot: 10
        })
    }

    render () {
        return (
            <View style={{width: Dimensions.get('window').width,
                height: Dimensions.get('window').height}}>
                <View style={styles.body}>
                    <Text style={{fontSize: 30, backgroundColor: '#3d4563', textAlign: 'center', color:'#fff', width: 300,marginBottom:100}}>Register to PerfectWeek</Text>
                    <View style={{height: 200, marginBottom: 30}}>
                        <TextInput onChangeText={(text) => this.setState({email: text})}
                                   onFocus={ () => this.onfocus('log')}
                                   onBlur={() => this.onBlur('log')}
                                   value={this.state.email}
                                   autoCapitalize='none'
                                   placeholder=' Email'
                                   clearButtonMode='always'
                                   placeholderTextColor={this.state.blurColorLogin}
                                   style={[styles.testinput, {borderColor: this.state.borderColorLogin, marginBottom: this.state.marginBot}]}></TextInput>
                        <TextInput onChangeText={(text) => this.setState({pseudo: text})}
                                   onFocus={ () => this.onfocus('log2')}
                                   onBlur={() => this.onBlur('log2')}
                                   value={this.state.pseudo}
                                   autoCapitalize='none'
                                   placeholder=' Pseudo'
                                   clearButtonMode='always'
                                   placeholderTextColor={this.state.blurColorLogin2}
                                   style={[styles.testinput, {borderColor: this.state.borderColorLogin2, marginBottom: this.state.marginBot}]}></TextInput>
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
                        <TextInput onChangeText={(text) => this.setState({password2: text})}
                                   onFocus={ () => this.onfocus('pwd2')}
                                   onBlur={() => this.onBlur('pwd2')}
                                   value={this.state.password2}
                                   autoCapitalize='none'
                                   placeholder=' Password'
                                   secureTextEntry={true}
                                   clearButtonMode='always'
                                   placeholderTextColor={this.state.blurColorPassword2}
                                   style={[styles.testinput, {borderColor: this.state.borderColorPassword2, marginBottom: this.state.marginBot}]}></TextInput>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <MyButton style={styles.login} textStyle={{fontSize: 20}} title="VALIDATE" onPress={this._signInAsync.bind(this)}></MyButton>
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