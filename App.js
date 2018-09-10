import React from 'react';
import { View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { test } from "./src/redux/test.reducer";
import { createStackNavigator } from 'react-navigation';
import {Home} from "./src/views/home";
import {Login} from "./src/views/login";
import { createNavigationReducer, createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import {testSagas} from "./src/redux/test.sagas";
import {fork, all} from "redux-saga/effects";
import createSagaMiddleware from 'redux-saga';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Login: {
            screen: Login
        }
    },
    {
        initialRouteName: 'Login'
    });

const navReducer = createNavigationReducer(AppNavigator);

const reducer = combineReducers({
    test: test,
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
        fork(testSagas),
    ]);
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const Store = createStore(reducer, applyMiddleware(middleware, sagaMiddleware));

// Run Saga Middleware
sagaMiddleware.run(sagas);

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}
