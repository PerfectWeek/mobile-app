import React from 'react';
import {Container} from 'native-base';
import connect from "react-redux/es/connect/connect";
import HomeNavigator from "./HomeNavigator";
import {BackHandler, Platform} from "react-native";
import {NavigationActions} from "react-navigation";

export class _Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (Platform.OS !== 'ios') {
            BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    componentWillUnmount() {
        if (Platform.OS !== 'ios') {
            BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
        }
    }

    onBackPress = () => {
        return true;
    };

    render() {
        return (
            <Container>
                <HomeNavigator/>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(_Home);
