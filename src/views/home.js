import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon, Form} from 'native-base';
import {Profile} from './Profile';
import {News} from './News';
import {withNavigation} from "react-navigation";
import connect from "react-redux/es/connect/connect";
import { NavigationActions, StackActions } from 'react-navigation'
import {Network, Post} from "../Network/Requests";

const TabScreens = [
    Profile,
    News
]

export class _Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIdx: 0
        };
    }

    render() {
        const TabScreen = TabScreens[this.state.tabIdx];
        return (
            <Container>
                <Header/>
                <TabScreen>
                </TabScreen>
                <Text>{this.props.login.status}</Text>
                <Text>{this.props.login.access_token}</Text>

                <Content/>
                <Footer>
                    <FooterTab>
                        <Button active={this.state.tabIdx === 0} onPress={() => {
                            this.setState({
                                tabIdx: 0
                            })
                        }}>
                            <Icon name="person"/>
                        </Button>
                        <Button active={this.state.tabIdx === 1} onPress={() => {
                            this.setState({
                                tabIdx: 1
                            })
                        }}>
                            <Icon name="apps"/>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login
    }
};

export const Home = withNavigation(connect(mapStateToProps)(_Home));

