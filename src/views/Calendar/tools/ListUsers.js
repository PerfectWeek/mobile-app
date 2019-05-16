import {Dimensions, ScrollView, View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import React from 'react';
import {Form, Icon, Input, Item, Container, Button} from "native-base";
import {validateNotEmpty} from "../../../Utils/utils";
import connect from "react-redux/es/connect/connect";
import {AskCompletion} from "../../../redux/AutoCompletion/autocompletion.actions";
import ProgressiveInput from 'react-native-progressive-input';


export class _ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            isLoading: false,
            usersToAdd: (this.props.loadList !== undefined) ? this.props.loadList : [],
            listPseudo: ['tim', 'ok', 'v', 'tim9']
        }
        // console.log('list', this.props)
    }

    findPseudos(query) {
        this.setState({query: query});
        if (query === '') {
            this.setState({listPseudo: []});
        }

        this.props.AskCompletion(query)

        // const regex = new RegExp(`${query.trim()}`, 'i');
        // return this.state.listPseudo;
    }


    render() {
        // const { query } = this.state;
        // const pseudos = this.findPseudos(query);
        console.log('q', this.state.query)
        return (
            <Container>
                <View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        margin: 20
                    }}>
                        <Form style={{
                            marginLeft: 10, marginRight: 30, flexGrow: 3
                        }}>
                            {/*<Item>*/}
                            {/*    <Input style={{color: 'black', fontFamily: 'Roboto_medium', fontSize: 26}}*/}
                            {/*           placeholder="Event name" value={this.state.query}*/}
                            {/*           onChangeText={(text) => this.setState({query: text})}/>*/}
                            {/*</Item>*/}


                            <Item style={{marginTop: 0}}>
                                <Icon active name='person'/>
                                <Input placeholder="Add users by pseudo" value={this.state.query}
                                       onChangeText={(text) => this.findPseudos(text)} clearButtonMode="always"/>
                            </Item>
                        </Form>
                        <Button
                            disabled={!validateNotEmpty(this.state.query) || this.state.usersToAdd.includes(this.state.query)}
                            onPress={() => {
                                this.setState({
                                    usersToAdd: [...this.state.usersToAdd, this.state.searchBar],
                                    query: ''
                                });
                                this.props.callAddUser([...this.state.usersToAdd, this.state.query])
                            }}>
                            <Icon name='add'/>
                        </Button>

                    </View>
                    <ScrollView style={{height: Dimensions.get('window').height / 4}}>
                        <View style={{margin: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                this.state.usersToAdd.map((user, index) => {
                                    return (
                                        <Button rounded key={user} small style={{margin: 5, backgroundColor: 'grey'}}
                                                onPress={() => {
                                                    this.state.usersToAdd.splice(index, 1);
                                                    this.setState({
                                                        usersToAdd: this.state.usersToAdd
                                                    });
                                                    this.props.callAddUser(this.state.usersToAdd)
                                                }}>
                                            <Text>{user}</Text>
                                            <Icon type='FontAwesome' name='remove'/>
                                        </Button>
                                    );
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        AskCompletion: (pseudo) => dispatch(AskCompletion(pseudo))
        // CreateNewEvent: (event) => dispatch(CreateNewEvent(event)),
    // RefreshCalendar: () => dispatch(RefreshCalendar())
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        pseudoMatched: state.pseudoMatched,
        // login: state.login
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10,
        width: 100,
        // height: 300,
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        color: 'black',
        textAlign: 'center'
    },
});

export const ListUsers = connect(mapStateToProps, mapDispatchToProps)(_ListUsers);