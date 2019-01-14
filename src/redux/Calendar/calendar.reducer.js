import {CalendarActionType} from "./calendar.actions";

export const CalendarReducer = (state = {status: 'NONE'}, action) => {
    switch (action.type) {
        case CalendarActionType.GetEventInfo:
            return {
                ...state,
                status: CalendarActionType.GetEventInfo,
                event: action.event
            };
        case CalendarActionType.GetEventInfoSuccess:
            return {
                ...state,
                status: CalendarActionType.GetEventInfoSuccess,
                event: action.event
            };
        case CalendarActionType.ModifyEventSuccess:
            return {
                ...state,
                status: CalendarActionType.ModifyEventSuccess
            };
        case CalendarActionType.ModifyEventFail:
            return {
                ...state,
                status: CalendarActionType.ModifyEventFail
            };
        case CalendarActionType.ModifyEvent:
            return {
                ...state,
                status: CalendarActionType.ModifyEvent,
                event: action.event
            };
        case CalendarActionType.DeleteEvent:
            return {
                ...state,
                status: CalendarActionType.DeleteEvent,
                event: action.event
            };
        case CalendarActionType.RefreshCalendar:
            return {
                ...state,
                status: CalendarActionType.RefreshCalendar
            };
        case CalendarActionType.CreateNewEvent:
            return {
                ...state,
                status: CalendarActionType.CreateNewEvent,
                event: action.event
            };
        case CalendarActionType.CreateNewEventSuccess:
            return {
                ...state,
                status: CalendarActionType.CreateNewEventSuccess
            };
        case CalendarActionType.CreateNewEventFail:
            return {
                ...state,
                status: CalendarActionType.CreateNewEventFail,
                error_message: action.error_message
            };
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
                calendars: action.calendars,
                calendarFilters: action.calendarFilters
            };
        case CalendarActionType.GetAllUsersEventsFail:
            return {
                ...state,
                status: CalendarActionType.GetAllUsersEventsFail,
                error_message: action.error_message
            };
        case CalendarActionType.GetUsersEventsFiltered:
            return {
                ...state,
                status: CalendarActionType.GetUsersEventsFiltered,
                filters: action.filters
            };
        case CalendarActionType.GetUsersEventsFilteredSuccess:
            return {
                ...state,
                status: CalendarActionType.GetUsersEventsFilteredSuccess,
                calendars: action.calendars
            };
        case CalendarActionType.GetUsersEventsFilteredFail:
            return {
                ...state,
                status: CalendarActionType.GetUsersEventsFilteredFail,
                error_message: action.error_message
            };
        case CalendarActionType.SetFilters:
            return {
                ...state,
                SetFilters: action.filters
            };
        default:
            return state;
    }
};