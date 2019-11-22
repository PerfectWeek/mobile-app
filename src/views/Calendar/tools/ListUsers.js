import {Dimensions, ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, {useRef} from 'react';
import {Form, Icon, Input, Item, Container, Button, Text, Picker} from "native-base";
import {validateNotEmpty} from "../../../Utils/utils";
import connect from "react-redux/es/connect/connect";
import {
    AskCompletion,
    AskCompletionNone,
    AutoCompletionType
} from "../../../redux/AutoCompletion/autocompletion.actions";

import i18n from 'i18n-js';

export class _ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            isLoading: false,
            usersToAdd: (this.props.loadList !== undefined) ? this.props.loadList : [],
            listPseudo: []

    }
    }

    findPseudos(query) {
        this.setState({query: query});
        if (query === '') {
            this.setState({listPseudo: []});
        }

        this.props.AskCompletion(query)
    }

    componentWillUpdate() {
        if (this.props.pseudoMatched !== undefined && this.props.status === AutoCompletionType.AskCompletionSuccess) {
            this.setState({listPseudo: this.props.pseudoMatched});
            this.props.AskCompletionNone()
        }
    }

    onValueChange(item) {
        const slp = item.split('-');
        const idx = parseInt(slp[1]);
        this.state.usersToAdd[idx].role = slp[0];
        (this.props.formatAdd === undefined) ? this.props.callAddUser([...this.state.usersToAdd]) : this.props.callAddUser([...this.state.usersToAdd])
        this.forceUpdate();
    }

    checkLengthString(string) {
        const nbMax = 15;
        if (string.length > nbMax) {
            let tmp = string.slice(0, nbMax);
            tmp = tmp + '...';
            return tmp
        }
        return string
    }


    render() {

        return (
            <View>
                {this.props.editMode === undefined || this.props.editMode === true ?
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between'
                }}>
                    <Form style={{
                        // marginLeft: 10, marginRight: 30, flexGrow: 3
                    }}>
                        <Item style={{
                            marginTop: 0,
                            width: (this.props.newWidth === undefined) ? 300 : this.props.newWidth
                        }}>
                            <Icon active name='person'/>
                            <Input placeholder={i18n.t('other.addusers.title')} value={this.state.query}
                                   autoCapitalize='none'
                                   onChangeText={(text) => this.findPseudos(text)}
                                   clearButtonMode="always"
                                   onFocus={() => {this.props.enableToggle ? this.props.enableToggle() : () => {}}}
                                   onBlur={() => {this.props.enableToggle ? this.props.enableToggle() : () => {}}}
                            />
                        </Item>
                    </Form>
                </View>
                    :
                    <Text style={styles.itemText}>
                        {i18n.t('other.addusers.attendees')}
                    </Text>
                }
                <Form style={{flexGrow: 3}}>
                    {this.state.listPseudo.map((item, idx) =>
                        <Item key={idx}
                              style={{width: (this.props.newWidth === undefined) ? 300 : this.props.newWidth}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    usersToAdd: [...this.state.usersToAdd, (this.props.formatAdd === undefined) ? item : this.props.formatAdd(item)],
                                    query: '',
                                    listPseudo: []
                                });
                                (this.props.formatAdd === undefined) ? this.props.callAddUser([...this.state.usersToAdd, item]) : this.props.callAddUser([...this.state.usersToAdd, this.props.formatAdd(item)])
                            }}
                                              style={styles.touch}
                            >
                                <Text style={styles.itemText}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        </Item>
                    )}
                </Form>
                {this.props.displaySelection === undefined || this.props.displaySelection === true ?
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            this.state.usersToAdd.map((user, index) => {
                                return (
                                    <Button rounded key={index} small style={{margin: 5, backgroundColor: 'grey'}}
                                            onPress={() => {
                                                if (this.props.editMode === undefined || this.props.editMode === true) {
                                                    this.state.usersToAdd.splice(index, 1);
                                                    this.setState({
                                                        usersToAdd: this.state.usersToAdd,
                                                        listPseudo: []
                                                    });
                                                }
                                            }}>
                                        <Text>{user.name}</Text>
                                        {this.props.editMode === undefined || this.props.editMode === true ?
                                            <Icon type='FontAwesome' name='remove'/> : null}
                                    </Button>
                                );
                            })
                        }
                    </View>
                    :
                    <View style={{flexDirection: 'column'}}>
                        {
                            this.state.usersToAdd.map((user, index) => {
                                return (
                                    <View key={index} style={{
                                        flexDirection: 'column',
                                        flexWrap: 'wrap',
                                        borderColor: 'rgba(0,0,0,0.3)',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        marginTop: 15,
                                        backgroundColor: 'rgba(25,81,127,0.2)'
                                    }}>
                                        <Text style={{marginTop: 8}}>{this.checkLengthString(user.name)}</Text>
                                        <Picker
                                            note
                                            mode="dropdown"
                                            selectedValue={user.role + "-" + index}
                                            onValueChange={this.onValueChange.bind(this)}
                                        >
                                            <Picker.Item label={i18n.t('other.adduser.admin')} value={"admin-" + index}/>
                                            <Picker.Item label={i18n.t('other.adduser.actor')} value={"actor-" + index}/>
                                            <Picker.Item label={i18n.t('other.adduser.spectator')} value={"spectator-" + index}/>
                                            <Picker.Item label={i18n.t('other.adduser.outsider')} value={"outsider-" + index}/>
                                        </Picker>
                                        <Button full key={index} small style={{backgroundColor: 'grey'}}
                                                onPress={() => {
                                                    this.state.usersToAdd.splice(index, 1);
                                                    this.setState({
                                                        usersToAdd: this.state.usersToAdd,
                                                        listPseudo: []
                                                    });
                                                }}>
                                            <Icon type='FontAwesome' name='remove'/>
                                        </Button>
                                    </View>
                                );
                            })
                        }
                    </View>
                }
            </View>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        AskCompletion: (pseudo) => dispatch(AskCompletion(pseudo)),
        AskCompletionNone: () => dispatch(AskCompletionNone())
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        pseudoMatched: state.autocompletion.pseudoMatched,
        status: state.autocompletion.status,
    }
};

const styles = StyleSheet.create({
    itemText: {
        fontSize: 18,
        margin: 2,
        color: 'black',
        textAlign: 'center'
    },
    touch: {
        // borderColor: 'rgba(0, 0, 0, 0.3)',
        // backgroundColor: 'rgba(0, 51, 102, 0.2)',
        // marginBottom: 3,
        // marginLeft: 10,
        // borderWidth: 1,
        // borderRadius: 5
    }
});

export const ListUsers = connect(mapStateToProps, mapDispatchToProps)(_ListUsers);
