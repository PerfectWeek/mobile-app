import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {Calendar} from 'react-native-general-calendars';
import {Container} from "native-base";
// import {} from "../redux/User/user.actions";
// import {} from "../redux/Login/login.actions";

export class _CalendarDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={{paddingTop: Expo.Constants.statusBarHeight+50}}>
                <Calendar
                    // Calendar type (gregorian, jalaali). Default = gregorian
                    type="gregorian"
                    // Initially visible month. Default = Date()
                    current="2012-03-01"
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate="2012-05-10"
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate="2012-05-30"
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day, localDay) => {console.log('selected day', day, localDay)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat="YYYY MM"
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                />
            </Container>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

export const CalendarDashboard = connect(mapStateToProps, mapDispatchToProps)(_CalendarDashboard);
