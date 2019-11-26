import React from 'react';
import {
    View, TouchableOpacity
} from 'react-native';
import {
    Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";
import {UpdateUserImage, UserActionsType} from "../../redux/User/user.actions";
import * as ImagePicker from 'expo-image-picker';
import {Permissions} from 'expo';
import Constants from 'expo-constants';

import i18n from 'i18n-js';

export class _ProfileImagePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {display: this.props.user.image, new: false};
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        return (
            <Modal
                canValidate={(this.state.new)}
                onRef={ref => (this.modal = ref)} title={i18n.t('profile.edit.editimg')}
                actionButtonTitle={i18n.t('other.update')} validateCallback={() => {
                this.props.UpdateUserImage(this.props.login.id, this.state.image);
            }}>
                <View style={{
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {this.state.display &&
                    <Thumbnail large source={{uri: this.state.display}}/>}

                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderColor: '#5CB85C',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 10,
                            margin: 10
                        }}
                        onPress={async () => {
                            if (Constants.platform.ios) {
                                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                                if (status !== 'granted') {
                                    alert(i18n.t('profile.edit.alertcamera'));
                                }
                            }
                            const res = await ImagePicker.launchImageLibraryAsync();
                            if (res.cancelled)
                                return;
                            this.setState({...this.state, image: res, display: res.uri, new: true});
                        }}>
                        <Text style={{fontSize: 18}}>{i18n.t('dashboard.createvent.selectimg')}</Text>
                    </TouchableOpacity>
                </View>
                {this.props.UserStore.status === UserActionsType.UpdateUserImage &&
                <Loader/>
                }
            </Modal>
        )
    }

    openEditModal() {
        this.modal.toggle();
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        UpdateUserImage: (id, image) => dispatch(UpdateUserImage(id, image))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login,
        UserStore: state.user,
        user: state.user.users[state.login.id]
    }
};

export const ProfileImagePicker = connect(mapStateToProps, mapDispatchToProps)(_ProfileImagePicker);
