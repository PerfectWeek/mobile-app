import {Dimensions, ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react';
import {Form, Icon, Input, Item, Container, Button,Text} from "native-base";
import {validateNotEmpty} from "../../../Utils/utils";
import connect from "react-redux/es/connect/connect";
import {AskCompletion, AskCompletionNone, AutoCompletionType} from "../../../redux/AutoCompletion/autocompletion.actions";


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


    render() {
        return (
                <View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        margin: 20
                    }}>
                        <Form style={{
                            // marginLeft: 10, marginRight: 30, flexGrow: 3
                        }}>
                            <Item style={{marginTop: 0, width: 300}}>
                                <Icon active name='person'/>
                                <Input placeholder="Add users by pseudo" value={this.state.query}
                                       onChangeText={(text) => this.findPseudos(text)} clearButtonMode="always"/>
                            </Item>
                        </Form>
                    </View>
                    <Form style={{
                        marginLeft: 20, flexGrow: 3
                    }}>
                        {this.state.listPseudo.map((item, idx) =>
                            <Item key={idx}>
                                <TouchableOpacity onPress={()=>{this.setState({
                                    usersToAdd: [...this.state.usersToAdd, item],
                                    query: '',
                                    listPseudo: []
                                });
                                    this.props.callAddUser([...this.state.usersToAdd, item])
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
                        <View style={{margin: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                this.state.usersToAdd.map((user, index) => {
                                    return (
                                        <Button rounded key={index} small style={{margin: 5, backgroundColor: 'grey'}}
                                                onPress={() => {
                                                    this.state.usersToAdd.splice(index, 1);
                                                    this.setState({
                                                        usersToAdd: this.state.usersToAdd,
                                                        listPseudo: []
                                                    });
                                                }}>
                                            <Text>{user}</Text>
                                            <Icon type='FontAwesome' name='remove'/>
                                        </Button>
                                    );
                                })
                            }
                        </View>
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
        fontSize: 15,
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