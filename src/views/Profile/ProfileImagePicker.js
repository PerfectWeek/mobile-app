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
                onRef={ref => (this.modal = ref)} title='Edit Profile Picture'
                actionButtonTitle='Update' validateCallback={() => {
                this.props.UpdateUserImage(this.props.login.pseudo, this.state.image);
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
                            const res = await Expo.ImagePicker.launchImageLibraryAsync();
                            if (res.cancelled)
                                return;
                            this.setState({...this.state, image: res, display: res.uri, new: true});
                        }}>
                        <Text style={{fontSize: 18}}>Select image</Text>
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
        UpdateUserImage: (pseudo, image) => dispatch(UpdateUserImage(pseudo, image))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        login: state.login,
        UserStore: state.user,
        user: state.user.users[state.login.pseudo]
    }
};

export const ProfileImagePicker = connect(mapStateToProps, mapDispatchToProps)(_ProfileImagePicker);
