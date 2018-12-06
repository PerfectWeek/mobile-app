import {CalendarActionType} from "./calendar.actions";

export const CalendarReducer = (state = {status: 'NONE'}, action) => {
    switch (action.type) {
        case CalendarActionType.GetAllUsersEvents:
            return {
                ...state,
                status: CalendarActionType.GetAllUsersEvents,
                pseudo: action.pseudo
            };
        case CalendarActionType.GetAllUsersEventsSuccess:
            return {
                ...state,
                status: CalendarActionType.GetAllUsersEventsSuccess,
                calendars: action.calendars
            };
        case CalendarActionType.GetAllUsersEventsFail:
            return {
                ...state,
                status: CalendarActionType.GetAllUsersEventsFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};