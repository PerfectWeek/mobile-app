import React, { Component } from "react";
import {
  Icon,
  Item,
  Input,
  CheckBox,
  Form,
  ListItem,
  Button,
  Content,
  Text,
  View,
  Body
} from "native-base";
import connect from "react-redux/es/connect/connect";
import Modal from "../../Components/Modal";
import Loader from "../../Components/Loader";
import { Dimensions, ScrollView } from "react-native";
import {
  GetAllUsersEvents,
  GetUsersEventsFiltered,
  RefreshCalendar,
  ReloadEvents,
  SetFilters
} from "../../redux/Calendar/calendar.actions";

import i18n from "i18n-js";

class _CalendarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    };
    if (this.props.calendar.calendars) {
      this.state.filters = this.props.calendar.calendars.map(f => f);
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <Modal
        onRef={ref => (this.modal = ref)}
        title={i18n.t("dashboard.filter")}
        actionButtonTitle={i18n.t("dashboard.filterButton")}
        validateCallback={() => {
          // console.log('ti')
          // console.log(this.state.filters)
          this.props.SetFilters(this.state.filters);
          this.props.RefreshCalendar(this.props.calendar.calendars);
          this.modal.toggle();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Content>
            <ScrollView style={{ height: Dimensions.get("window").height / 3 }}>
              {this.state.filters ? (
                this.state.filters.map((f, index) => {
                  return (
                    <ListItem key={index}>
                      <CheckBox
                        onPress={() => {
                          f.show = !f.show;
                          this.setState({ filters: this.state.filters });
                        }}
                        checked={f.show}
                      />
                      <Body>
                        <View
                          style={{
                            borderBottomWidth: 2,
                            borderBottomRadius: 2,
                            borderBottomColor: f.color,
                            marginLeft: 5
                          }}
                        >
                          <Text>{f.name}</Text>
                        </View>
                      </Body>
                    </ListItem>
                  );
                })
              ) : (
                <Loader />
              )}
            </ScrollView>
          </Content>
        </View>
      </Modal>
    );
  }

  openModal() {
    this.modal.toggle();
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    SetFilters: calendars => dispatch(SetFilters(calendars)),
    RefreshCalendar: calendars => dispatch(ReloadEvents(calendars))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    calendar: state.calendar
  };
};

export const CalendarFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CalendarFilter);
