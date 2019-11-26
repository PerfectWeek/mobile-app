import React from 'react';
import {
    View, TouchableOpacity
} from 'react-native';
import {
    Title,
    Icon, Form, Item, Input, Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import Modal from "../../Components/Modal";
import {EditGroupInfo, GroupsActionType, UpdateGroupImage} from "../../redux/Groups/groups.actions";
import {validateNotEmpty} from "../../Utils/utils";
import Loader from "../../Components/Loader";
import {Primary} from "../../../Style/Constant";

import i18n from 'i18n-js';
import Constants from "expo-constants";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from "expo-image-picker";

export class _GroupDetailScreenImagePicker extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const {group} = this.props;
        this.state = {display: group.image, new: false};
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const {group} = this.props;
        return (
            <Modal
                canValidate={(this.state.new)}
                onRef={ref => (this.modal = ref)} title={i18n.t('groups.edit.title')}
                actionButtonTitle={i18n.t('other.update')} validateCallback={() => {
                this.props.UpdateGroupImage(group.id, this.state.image);
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
                        // onPress={async () => {
                        //     console.log('ij')
                        //     const res = await Expo.ImagePicker.launchImageLibraryAsync();
                        //     if (res.cancelled)
                        //         return;
                        //     this.setState({...this.state, image: res, display:res.uri, new: true});
                        // }}
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
                        <Text style={{fontSize: 18}}>{i18n.t('groups.edit.selectimage')}</Text>
                    </TouchableOpacity>
                </View>
                {this.props.groups.status === GroupsActionType.UpdateGroupImage &&
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
        UpdateGroupImage: (groupId, image) => dispatch(UpdateGroupImage(groupId, image))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
    }
};

export const GroupDetailScreenImagePicker = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreenImagePicker);
