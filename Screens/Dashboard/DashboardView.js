import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet, Dimensions
} from 'react-native';

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <View style={styles.body}>
                <Text style={styles.Tt}>HELLO WORLD !</Text>
            </View>
        )
    }
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
  Tt: {
      color: '#fff'
  }

})