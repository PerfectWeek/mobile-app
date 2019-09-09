import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Modal as ReactModal
} from 'react-native';
import {
    Text,
    View
} from 'native-base';
import {Button, Icon, Title} from "native-base";

import i18n from 'i18n-js';

class Modal extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        actionButtonTitle: PropTypes.string,
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
                                      width: Dimensions.get('window').width,
                                      zIndex: 1
                                  }}
                                  onPress={() => {
                                      this.toggle();
                                  }}>

                    <View style={{
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#cccccc',
                        margin: 30,
                        marginBottom: 60,
                        backgroundColor: 'white',
                        borderRadius: 10
                    }}>
                        <View onStartShouldSetResponder={() => true}>
                            <ScrollView>
                                <View style={{margin: 30}}>

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
                                        marginTop: 30
                                    }}>
                                        {
                                            actionButtonTitle &&
                                            <Button success
                                                    disabled={(canValidate !== undefined && canValidate === false)}
                                                    rounded onPress={validateCallback}>
                                                <Text>
                                                    {actionButtonTitle}
                                                </Text>
                                            </Button>
                                        }

                                        <Button rounded disabled={(canClose !== undefined && canClose === false)}
                                                style={{backgroundColor: '#7e7e7e'}}
                                                onPress={() => {
                                                    this.toggle();
                                                }}>
                                            <Text>
                                                {i18n.t('other.cancel')}
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableOpacity>
            </ReactModal>
        );
    }
}

export default Modal;