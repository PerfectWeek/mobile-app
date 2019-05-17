import {EventsActionType} from "../Events/events.actions";

export const CalendarActionType = {
    Nothing: 'NOTHING',
    GetCalendars: 'GET_CALENDARS',
    GetCalendarsSuccess: "GET_CALENDARS_SUCCESS",
    GetCalendarsFail: "GET_CALENDARS_FAIL",
    GetEvents: 'GET_EVENTS',
    GetEventsSuccess: "GET_EVENTS_SUCCESS",
    GetEventsImages: 'GET_IMAGES_EVENTS',
    GetEventsImagesSuccess: "GET_IMAGES_EVENTS_SUCCESS",
    GetEventsFail: "GET_EVENTS_FAIL",
    CreateNewEvent: "CREATE_NEW_EVENT",
    CreateNewEventSuccess: "CREATE_NEW_EVENT_SUCCESS",
    CreateNewEventFail: "CREATE_NEW_EVENT_FAIL",
    ModifyEvent: "MODIFY_EVENT",
    ModifyEventSuccess: "MODIFY_EVENT_SUCCESS",
    ModifyEventFail: "MODIFY_EVENT_FAIL",
    GetEventInfo: "GET_EVENT_INFO",
    GetEventInfoSuccess: "GET_EVENT_INFO_SUCCESS",
    GetEventInfoFail: "GET_EVENT_INFO_FAIL",
    DeleteEvent: "DELETE_EVENT",
    DeleteEventSuccess: "DELETE_EVENT_SUCCESS",
    DeleteEventFail: "DELETE_EVENT_FAIL",
    RefreshCalendar: "REFRESH_CALENDAR",
    SetFilters: "SET_FILTERS",
    ResetStatus: "RESET_STATUS",
    ReloadEvents: 'RELOAD_EVENTS',
    LoadCalendar: 'LOAD_CALENDAR',
    LoadCalendarSuccess: "LOAD_CALENDAR_SUCCESS",
    LoadCalendarFail: "LOAD_CALENDAR_FAIL",
    SetEvent: 'SET_EVENT_CALENDAR',

    GetBestSlots: "GET_BEST_SLOTS",
    GetBestSlotsSuccess: "GET_BEST_SLOTS_SUCCESS",
    GetBestSlotsFail: "GET_BEST_SLOTS_FAIL",
    // GetEventAttendees: "GET_EVENT_ATTENDEES",
    // GetEventAttendeesSuccess: "GET_EVENT_ATTENDEES_SUCCESS",
    // GetEventAttendeesFail: "GET_EVENT_ATTENDEES_FAIL"
};

// export const GetEventAttendees = (idEvent) => {
//     return {
//         type: CalendarActionType.GetEventAttendees,
//         idEvent: idEvent
//     }
// };
//
// export const GetEventAttendeesSuccess = (listAttendees) => {
//     return {
//         type: CalendarActionType.GetEventAttendeesSuccess,
//         listAttendees: listAttendees
//     }
// };
//
//
// export const GetEventAttendeesFail = () => {
//     return {
//         type: CalendarActionType.GetEventAttendeesFail,
//     }
// };

export const GetBestSlotsSuccess = (slots) => {
    return {
        type: CalendarActionType.GetBestSlotsSuccess,
        slots: slots
    }
};

export const GetBestSlotsFail = () => {
    return {
        type: CalendarActionType.GetBestSlotsFail
    }
};

export const GetBestSlots = (infos) => {
    return {
        type: CalendarActionType.GetBestSlots,
        infos: infos
    }
};

export const GetEventInfo = (event) => {
    return {
        type: CalendarActionType.GetEventInfo,
        event: event
    }
};

export const GetEventInfoSuccess = (event) => {
    return {
        type: CalendarActionType.GetEventInfoSuccess,
        event: event
    }
};

export const GetEventInfoFail = () => {
    return {
        type: CalendarActionType.GetEventInfoFail
    }
};

export const ModifyEventSuccess = (event) => {
    return {
        type: CalendarActionType.ModifyEventSuccess,
        event
    }
};
export const ModifyEventFail = () => {
    return {
        type: CalendarActionType.ModifyEventFail
    }
};

export const ModifyTheEvent = (event) => {
    return {
        type: CalendarActionType.ModifyEvent,
        event: event
    }
};

export const DeleteEvent = (eventId) => {
    return {
        type: CalendarActionType.DeleteEvent,
        eventId
    }
};

export const DeleteEventSuccess = (eventId) => {
    return {
        type: CalendarActionType.DeleteEventSuccess,
        eventId
    }
};

export const DeleteEventFail = () => {
    return {
        type: CalendarActionType.DeleteEventFail
    }
};

export const RefreshCalendar = () => {
    return {
        type: CalendarActionType.RefreshCalendar
    }
};

export const CreateNewEvent = (event) => {
    return {
        type: CalendarActionType.CreateNewEvent,
        event: event
    }
};

export const CreateNewEventSuccess = (event) => {
    return {
        type: CalendarActionType.CreateNewEventSuccess,
        event
    }
};

export const CreateNewEventFail = (error_message) => {
    return {
        type: CalendarActionType.CreateNewEventFail,
        error_message: error_message
    }
};

export const GetCalendars = () => {
    return {
        type: CalendarActionType.GetCalendars
    };
};

export const GetCalendarsSuccess = (calendars) => {
    return {
        type: CalendarActionType.GetCalendarsSuccess,
        calendars
    }
};

export const GetCalendarsFail = (error_message) => {
    return {
        type: CalendarActionType.GetCalendarsFail,
        error_message: error_message
    };
};

export const GetEvents = (_calendars) => {
    return {
        type: CalendarActionType.GetEvents,
        calendars: _calendars
    };
};

export const GetEventsSuccess = (events) => {
    return {
        type: CalendarActionType.GetEventsSuccess,
        events
    }
};

export const GetEventsImages = (events) => {
    return {
        type: CalendarActionType.GetEventsImages,
        events
    };
};

export const GetEventsImagesSuccess = (events) => {
    return {
        type: CalendarActionType.GetEventsImagesSuccess,
        events
    }
};

export const GetEventsFail = (error_message) => {
    return {
        type: CalendarActionType.GetEventsFail,
        error_message: error_message
    };
};

export const SetFilters = (calendars) => {
    return {
        type: CalendarActionType.SetFilters,
        calendars: calendars
    };
};

export const ResetStatus = () => {
    return {
        type: CalendarActionType.ResetStatus
    };
};

export const ReloadEvents = (calendars) => {
    return {
        type: CalendarActionType.ReloadEvents,
        calendars
    };
};

export const LoadCalendar = (pseudo) => {
    return {
        type: CalendarActionType.LoadCalendar,
        pseudo
    };
};

export const LoadCalendarSuccess = () => {
    return {
        type: CalendarActionType.LoadCalendarSuccess
    }
};

export const LoadCalendarFail = (error_message) => {
    return {
        type: CalendarActionType.LoadCalendarFail,
        error_message: error_message
    };
};

export const SetEvent = (event) => {
    return {
        type: CalendarActionType.SetEvent,
        event
    }
};