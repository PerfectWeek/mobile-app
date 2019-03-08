import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    Modal as ReactModal
} from 'react-native';
import {
    Text,
    View
} from 'native-base';
import {Button, Icon, Title} from "native-base";

class Modal extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        actionButtonTitle: PropTypes.string.isRequired,
        validateCallback: PropTypes.func,
        children: PropTypes.node,
        canValidate: PropTypes.bool,
        canClose: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    toggle() {
        const {canClose} = this.props;
        if (canClose === undefined || canClose === true)
            this.setState({...this.state, modalVisible: !this.state.modalVisible});
    }

    render() {
        const {title, actionButtonTitle, validateCallback, children, canValidate, canClose} = this.props;

        return (
            <ReactModal animationType={"slide"} transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({...this.state, modalVisible: !this.state.modalVisible});
                        }}>
                <TouchableOpacity activeOpacity={1}
                                  style={{
                                      height: Dimensions.get('window').height,
                                      width: Dimensions.get('window').width
                                  }}
                                  onPress={() => {
                                      this.toggle();
                                  }}>

                    <View style={{
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#cccccc',
                        margin: 30,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }}>
                        <TouchableWithoutFeedback>
                            <View style={{padding: 30}}>
                                <View style={{
                                    borderStyle: 'solid',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#cccccc',
                                    marginBottom: 20
                                }}>
                                    <Title
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Lato_Bold',
                                            fontSize: 22,
                                            marginBottom: 30
                                        }}>
                                        {title}
                                    </Title>
                                </View>
                                {children}
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Button success disabled={(canValidate !== undefined && canValidate === false)}
                                            rounded style={{marginTop: 30}}
                                            onPress={validateCallback}>
                                        <Text>
                                            {actionButtonTitle}
                                        </Text>
                                    </Button>
                                    <Button rounded disabled={(canClose !== undefined && canClose === false)}
                                            style={{marginTop: 30, backgroundColor: '#7e7e7e'}}
                                            onPress={() => {
                                                this.toggle();
                                            }}>
                                        <Text>
                                            Close
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </ReactModal>
        );
    }
}

export default Modal;