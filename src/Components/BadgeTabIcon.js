import React, {Component} from 'react';
import {Icon, Text, View} from 'native-base';
import {connect} from "react-redux";

class _BadgeTabIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View>
                <Icon
                    name='user'
                    type='FontAwesome'
                    style={{color: this.props.tintColor, marginTop: 5, fontSize: 22}}/>
                {
                    this.props.invites !== undefined && this.props.invites.length > 0 && <View style={{
                        position: 'absolute',
                        left: 12,
                        top: 5,
                        backgroundColor: 'red',
                        borderRadius: 9,
                        width: this.props.invites.length > 9 ? 28 : 18,
                        height: 18,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: 'white'}}>{this.props.invites.length > 9 ? '9+' : this.props.invites.length}</Text>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        invites: state.invites.invites
    }
};

export default connect(mapStateToProps)(_BadgeTabIcon);
