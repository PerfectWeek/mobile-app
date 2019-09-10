import React from 'react';
import {
    View
} from 'react-native';
import {
    Title,
    Icon, Form, Item, Input, Button, Text, Thumbnail
} from 'native-base';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import Modal from "../../Components/Modal";
import {EditGroupInfo, GroupsActionType} from "../../redux/Groups/groups.actions";
import {validateNotEmpty} from "../../Utils/utils";
import Loader from "../../Components/Loader";
import {Primary} from "../../../Style/Constant";

import i18n from 'i18n-js';

export class _GroupDetailScreenGroupName extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        const {group} = this.props;
        this.state = {groupName: group.name, groupDescription: group.description};
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
            <View style={{
                marginTop: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Thumbnail large source={{uri: group.image !== undefined ? group.image : null}}/>
                <Title style={{color: 'black', fontFamily: 'Lato_Bold', fontSize: 26}}>
                    {group.name}
                </Title>
                <Modal
                    canValidate={(this.state.groupName !== '' && this.props.groups.status !== GroupsActionType.EditGroupInfo)}
                    canClose={(this.props.groups.status !== GroupsActionType.EditGroupInfo)}
                    onRef={ref => (this.modal = ref)} title={i18n.t('groups.edit.grpinfo')}
                    actionButtonTitle={i18n.t('other.update')} validateCallback={() => {
                    this.props.EditGroupInfo({
                        id: group.id,
                        name: this.state.groupName,
                        description: this.state.groupDescription
                    })
                }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                        <Form style={{
                            marginLeft: 10, marginRight: 30, flexGrow: 3
                        }}>
                            <Item style={{marginTop: 0}}>
                                <Input placeholder={i18n.t('groups.groupname')} value={this.state.groupName}
                                       onChangeText={(text) => this.setState({groupName: text})}/>
                            </Item>
                            <Item style={{marginTop: 0}}>
                                <Input placeholder={i18n.t('groups.groupdescription')} value={this.state.groupDescription}
                                       onChangeText={(text) => this.setState({groupDescription: text})}/>
                            </Item>
                        </Form>
                    </View>
                    {
                        (this.props.groups.status === GroupsActionType.EditGroupInfo) ?
                            <Loader/>
                            : null
                    }
                </Modal>
            </View>
        )
    }

    openEditModal() {
        this.modal.toggle();
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        EditGroupInfo: (group) => dispatch(EditGroupInfo(group))
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        groups: state.group,
    }
};

export const GroupDetailScreenGroupName = connect(mapStateToProps, mapDispatchToProps)(_GroupDetailScreenGroupName);
