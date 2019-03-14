import {CalendarActionType} from "./calendar.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {status: 'NONE', DashboardStatus : 'NONE'};

export const CalendarReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
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
            var idx = state.events.findIndex(e => e.id === action.event.id);
            state.events[idx] = action.event;
            return {
                ...state,
                status: CalendarActionType.ModifyEventSuccess,
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
        case CalendarActionType.DeleteEventSuccess:
            var idx = state.events.findIndex(e => e.id === action.eventId);
            state.events.splice(idx, 1);
            return {
                ...state,
                status: CalendarActionType.DeleteEventSuccess,
                events : state.events
            };
        case CalendarActionType.DeleteEventFail:
            return {
                ...state,
                status: CalendarActionType.DeleteEventFail
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
                status: CalendarActionType.CreateNewEventSuccess,
                events: [action.event, ...state.events]
            };
        case CalendarActionType.CreateNewEventFail:
            return {
                ...state,
                status: CalendarActionType.CreateNewEventFail,
                error_message: action.error_message
            };
        case CalendarActionType.GetCalendars:
            return {
                ...state,
                status: CalendarActionType.GetCalendars,
                pseudo: action.pseudo
            };
        case CalendarActionType.GetCalendarsSuccess:
            return {
                ...state,
                status: CalendarActionType.GetCalendarsSuccess,
                calendars: action.calendars
            };
        case CalendarActionType.GetCalendarsFail:
            return {
                ...state,
                status: CalendarActionType.GetCalendarsFail,
                error_message: action.error_message
            };

        case CalendarActionType.GetEvents:
            return {
                ...state,
                status: CalendarActionType.GetEvents,
                calendars: action.calendars
            };
        case CalendarActionType.GetEventsSuccess:
            return {
                ...state,
                status: CalendarActionType.GetEventsSuccess,
                events: action.events
            };
        case CalendarActionType.GetEventsFail:
            return {
                ...state,
                status: CalendarActionType.GetEventsFail,
                error_message: action.error_message
            };
        case CalendarActionType.LoadCalendar:
            return {
                ...state,
                DashboardStatus: CalendarActionType.LoadCalendar
            };
        case CalendarActionType.ReloadEvents:
            return {
                ...state,
                DashboardStatus: CalendarActionType.ReloadEvents
            };
        case CalendarActionType.LoadCalendarSuccess:
            return {
                ...state,
                DashboardStatus: CalendarActionType.LoadCalendarSuccess
            };
        case CalendarActionType.SetFilters:
            return {
                ...state,
                calendars: action.calendars
            };
        case CalendarActionType.ResetStatus:
            return {
                ...state,
                status: CalendarActionType.Nothing,
            };
        default:
            return state;
    }
};