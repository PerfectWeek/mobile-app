import {CalendarActionType} from "./calendar.actions";
import {LoginActionsType} from "../Login/login.actions";

const eventsType = ['party', 'work', 'hobby', 'workout', 'other'];
const default_state = {status: 'NONE', DashboardStatus: 'NONE', eventsType: eventsType, events: {}, calendars: []};

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
            state.events[action.event.id] = {...state.events[action.event.id], ...action.event};
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
                status: CalendarActionType.DeleteEvent
            };
        case CalendarActionType.DeleteEventSuccess:
            delete state.events[action.eventId];
            return {
                ...state,
                status: CalendarActionType.DeleteEventSuccess
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
                status: CalendarActionType.CreateNewEvent
            };
        case CalendarActionType.CreateNewEventSuccess:
            state.events[action.event.id] = action.event;
            return {
                ...state,
                status: CalendarActionType.CreateNewEventSuccess,
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
                status: CalendarActionType.GetCalendars
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
        case CalendarActionType.GetBestSlotsSuccess:
            return {
                ...state,
                slots: action.slots,
                slotsStatus: CalendarActionType.GetBestSlotsSuccess
            };
        case CalendarActionType.GetBestSlotsFail:
            return {
                ...state,
                slotsStatus: CalendarActionType.GetBestSlotsFail
            };
        case CalendarActionType.GetBestSlots:
            return {
                ...state,
                infos: action.infos,
                slotsStatus: CalendarActionType.GetBestSlots

            };
        case CalendarActionType.SetEvent:
            if (state.events[action.event.id] !== undefined)
                state.events[action.event.id] = {...state.events[action.event.id], ...action.event};
            else
                state.events[action.event.id] = action.event;
            return {
                ...state,
                events: {...state.events}
            };
        default:
            return state;
    }
};