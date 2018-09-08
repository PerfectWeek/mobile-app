import React from 'react';
import {View, Text, Button} from 'react-native';
import {Container, Header, Content, Form, Item, Input} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';

export class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Username"/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"/>
                        </Item>
                        <Button title="Login" rounded bordered info small onPress={() => {
//                            this.props.navigation.navigate('Home');
                            // TODO Login
                            const moveToLogin = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Home'})],
                            });
                            this.props.navigation.dispatch(moveToLogin);
                        }}>
                            <Text>Setup</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
