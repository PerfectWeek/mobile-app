import React from 'react';
import {View, Platform} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {LoginReducer} from "./src/redux/Login/login.reducer";
import {createSwitchNavigator} from 'react-navigation';
import Home from "./src/views/home";
import {RegisterScreen} from "./src/views/register";
import {LoginScreen} from "./src/views/login";
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    reduxifyNavigator
} from 'react-navigation-redux-helpers';
import {LoginSagas} from "./src/redux/Login/login.sagas";

import {RegisterReducer} from "./src/redux/Register/register.reducer";
import {RegisterSagas} from "./src/redux/Register/register.sagas";

import {UserReducer} from "./src/redux/User/user.reducer";
import {UserSagas} from "./src/redux/User/user.sagas";

import {GroupReducer} from "./src/redux/Groups/groups.reducer";
import {GroupSaga} from "./src/redux/Groups/groups.saga";

import {fork, all} from "redux-saga/effects";
import createSagaMiddleware from 'redux-saga';

const AppNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        },
        Home: {
            screen: Home
        }
    },

    {
        initialRouteName: 'Login',
    });

const navReducer = createNavigationReducer(AppNavigator);

const reducer = combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    user: UserReducer,
    group: GroupReducer,
    nav: navReducer
});

const middleware = createReactNavigationReduxMiddleware("root", state => state.nav);

const App = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
    state: state.nav
});

// Creating Saga Middleware instance
const sagaMiddleware = createSagaMiddleware();

// Creating Saga Combination of Application Sagas
function* sagas() {
    yield all([
        fork(LoginSagas),
        fork(RegisterSagas),
        fork(UserSagas),
        fork(GroupSaga)
    ]);
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const Store = createStore(reducer, applyMiddleware(middleware, sagaMiddleware));

// Run Saga Middleware
sagaMiddleware.run(sagas);

export default class Root extends React.Component {
    async componentWillMount() {
        await Expo.Font.loadAsync({
            FontAwesome: require("expo/node_modules/@expo/vector-icons/fonts/FontAwesome.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({isReady: true});
    }

    render() {
        return (
            <Provider store={Store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}
