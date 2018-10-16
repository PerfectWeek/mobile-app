import React from 'react';
import {View} from 'react-native';
import {Container, Text, Header, Content, Footer, FooterTab, Button, Icon} from 'native-base';
import connect from "react-redux/es/connect/connect";
import {GetGroup, GroupsActionType} from "../redux/Groups/groups.actions";


export class _Groups extends React.Component {
    constructor(props) {
        super(props);
        this.props.GetGroup(1);
        console.log('123',this.props)
    }

    // componentWillMOunt() {
    //
    // }

    render() {
        return (
            <View>
                <Text>Groupes</Text>
                {/*<Text>{this.props.groups.status}</Text>*/}
                {/*{this.props.groups !== undefined ?*/}
                {/*<View>*/}
                    {/*<Text>Groupes</Text>*/}
                    {/*<Text>{this.props.groups.id}</Text>*/}
                {/*</View>*/}
                {/*: null*/}
            {/*}*/}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        GetGroup: (groupId) => dispatch(GetGroup(groupId))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group
    }
};

export const Groups = connect(mapStateToProps, mapDispatchToProps)(_Groups);
