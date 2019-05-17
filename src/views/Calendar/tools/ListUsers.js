import {Dimensions, ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react';
import {Form, Icon, Input, Item, Container, Button, Text, Picker} from "native-base";
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

    onValueChange(item) {
        const slp = item.split('-');
        const idx = parseInt(slp[1]);
        this.state.usersToAdd[idx].role = slp[0];
        this.forceUpdate();
    }

    checkLengthString(string) {
        const nbMax = 15;
        if (string.length > nbMax)
        {
            let tmp = string.slice(0, nbMax);
            tmp = tmp + '...';
            return tmp
        }
        return string
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
                            <Item style={{marginTop: 0, width: (this.props.newWidth === undefined) ? 300 : this.props.newWidth}}>
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
                            <Item key={idx} style={{width: (this.props.newWidth === undefined) ? 300 : this.props.newWidth}}>
                                <TouchableOpacity onPress={()=>{this.setState({
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
                    { this.props.displaySelection === undefined || this.props.displaySelection === true ?
                        <View style={{margin: 30, flexDirection: 'row', flexWrap: 'wrap'}}>
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
                        :
                        <View style={{margin: 20, flexDirection: 'column', paddingTop: 10}}>
                            {
                                this.state.usersToAdd.map((user, index) => {
                                    return (
                                        <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap', borderColor: 'rgba(0,0,0,0.3)', borderRadius: 5, borderWidth: 1, paddingTop:15, backgroundColor: 'rgba(25,81,127,0.2)'}}>
                                            <Text style={{marginTop: 8}}>{this.checkLengthString(user.name)}</Text>
                                            <Item><Picker
                                                note
                                                mode="dropdown"
                                                style={{ width: 90, paddingBottom:15}}
                                                selectedValue={user.role+"-"+index}
                                                onValueChange={this.onValueChange.bind(this)}
                                            >
                                                <Picker.Item label="Admin" value={"admin-"+index} />
                                                <Picker.Item label="Actor" value={"actor-"+index} />
                                                <Picker.Item label="Spectator" value={"spectator-"+index} />
                                                <Picker.Item label="Outsider" value={"outsider-"+index} />
                                            </Picker>
                                            </Item>

                                            <Button rounded key={index} small style={{backgroundColor: 'grey'}}
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