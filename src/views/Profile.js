import React from 'react';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {Login} from "../redux/Login/login.actions";
import {View} from "react-native";
import {GetInfo, UserActionsType} from "../redux/User/user.actions";


export class _Profile extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.user.status !== UserActionsType.GetInfoSuccess)
            this.props.GetInfo(this.props.login.login_info.pseudo);
    }

    render() {
        return (
            <Container>
                <Text>Profile</Text>
                <Text>{this.props.login.login_info.pseudo}</Text>
                {
                    this.props.user.user_info !== undefined ?
                        <View>
                            <Text>{this.props.user.user_info.email}</Text>
                            <Text>{this.props.user.user_info.pseudo}</Text>
                        </View>

                        : null
                }
                <Text>{this.props.user.status}</Text>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetInfo: (pseudo) => dispatch(GetInfo(pseudo))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login,
        user: state.user
    }
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile);
