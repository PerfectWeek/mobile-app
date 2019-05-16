import {Dimensions, ScrollView, View, TouchableOpacity, StyleSheet, Button, Text} from 'react-native'
import React from 'react';
import {Form, Icon, Input, Item} from "native-base";
import {validateNotEmpty} from "../../../Utils/utils";
import connect from "react-redux/es/connect/connect";
import {AskCompletion} from "../../../redux/AutoCompletion/autocompletion.actions";
import Autocomplete from 'react-native-autocomplete-input';


export class _ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            usersToAdd: (this.props.loadList !== undefined) ? this.props.loadList : [],
            listPseudo: ['tim', 'ok', 'v', 'tim9']
        }
        // console.log('list', this.props)
    }

    findPseudos(query) {
        if (query === '') {
            return [];
        }

        // const regex = new RegExp(`${query.trim()}`, 'i');
        return this.state.listPseudo;
    }

    render() {
        const { query } = this.state;
        const pseudos = this.findPseudos(query);

        return (
            <View>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    margin: 20
                }}>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        data={pseudos.length === 0 ? [] : pseudos}
                        defaultValue={query}
                        onChangeText={text => this.setState({ query: text })}
                        placeholder="Search pseudo"
                        renderItem={({ item, idx }) => (

                            <View><Button
                            onPress={() => {
                                console.log(item);
                            }}
                            title={item}
                            /></View>
                        )}
                    />
                    {/*<Form style={{*/}
                    {/*    marginLeft: 10, marginRight: 30, flexGrow: 3*/}
                    {/*}}>*/}

                    {/*    <Item style={{marginTop: 0}}>*/}
                    {/*        <Icon active name='person'/>*/}
                    {/*        <Input placeholder="Add users by pseudo" value={this.state.searchBar}*/}
                    {/*               onChangeText={(text) => this.setState({searchBar: text})}/>*/}
                    {/*    </Item>*/}
                    {/*</Form>*/}
                    {/*<Button*/}
                    {/*    disabled={!validateNotEmpty(this.state.searchBar) || this.state.usersToAdd.includes(this.state.searchBar)}*/}
                    {/*    onPress={() => {*/}
                    {/*        this.setState({*/}
                    {/*            usersToAdd: [...this.state.usersToAdd, this.state.searchBar],*/}
                    {/*            searchBar: ''*/}
                    {/*        });*/}
                    {/*        this.props.callAddUser([...this.state.usersToAdd, this.state.searchBar])*/}
                    {/*    }}>*/}
                    {/*    <Icon name='add'/>*/}
                    {/*</Button>*/}
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