import { createStackNavigator } from 'react-navigation';
import Login from './Login';

const AppNavigator = createStackNavigator({
  Home: { screen: Login },
});

export default AppNavigator;