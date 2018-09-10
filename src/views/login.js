import React from 'react';
import {View, Text, Button} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {Test} from "../redux/test.actions";

class _Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.store);
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Text>{this.props.test.name}</Text>
                        <Item>
                            <Input placeholder="Username"/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"/>
                        </Item>
                        <Button title="Login" rounded bordered info small onPress={() => {
//                            this.props.navigation.navigate('Home');
                            console.log(this.props.test.name);
                            this.props.callTest();
                            console.log(this.props.test.name);
                            // TODO Login
                            /*const moveToLogin = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Home'})],
                            });
                            this.props.navigation.dispatch(moveToLogin);*/
                        }}>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        callTest: () => dispatch(Test())
    }
};


const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        test: state.test
    }
};

export const Login = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_Login));
