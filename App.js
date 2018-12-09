import React from 'react';
import {Platform} from 'react-native';
import {StyleProvider, Root as RootNativeBase} from 'native-base';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {LoginReducer} from "./src/redux/Login/login.reducer";
import {createSwitchNavigator} from 'react-navigation';
import Home from "./src/views/home";
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
import LoginNavigator from "./src/views/LoginNavigator";
import getTheme from './native-base-theme/components';
import platform from "./native-base-theme/variables/platform";
import {CalendarSaga} from "./src/redux/Calendar/calendar.saga";
import {CalendarReducer} from "./src/redux/Calendar/calendar.reducer";


const AppNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginNavigator
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
    calendar: CalendarReducer,
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
        fork(GroupSaga),
        fork(CalendarSaga)
    ]);
}

const AppWithNavigationState = connect(mapStateToProps)(App);

const Store = createStore(reducer, applyMiddleware(middleware, sagaMiddleware));

// Run Saga Middleware
sagaMiddleware.run(sagas);

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isReady: false};
    }

    async componentWillMount() {
        let obj = {
            FontAwesome: require("expo/node_modules/@expo/vector-icons/fonts/FontAwesome.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("native-base/Fonts/Ionicons.ttf"),
            Lato_Bold: require("./Resources/Font/Lato-Bold.ttf"),
            'simple-line-icons': require('native-base/Fonts/SimpleLineIcons.ttf'),
            'Material Icons': require("native-base/Fonts/MaterialIcons.ttf")
        };
        if (Platform.OS !== 'ios')
            obj = {
                FontAwesome: require("expo/node_modules/@expo/vector-icons/fonts/FontAwesome.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("native-base/Fonts/Ionicons.ttf"),
                Lato_Bold: require("./Resources/Font/Lato-Bold.ttf"),
                SimpleLineIcons: require("native-base/Fonts/SimpleLineIcons.ttf"),
                // MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf")
            };
        await Expo.Font.loadAsync(obj);
        await Expo.Font.loadAsync("Material Design Icons", require("native-base/Fonts//MaterialCommunityIcons.ttf"));
        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading/>;
        }
        return (
            <Provider store={Store}>
                <StyleProvider style={getTheme(platform)}>
                    <RootNativeBase>
                        <AppWithNavigationState/>
                    </RootNativeBase>
                </StyleProvider>
            </Provider>
        );
    }
}
