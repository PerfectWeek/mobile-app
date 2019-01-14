export const CalendarActionType = {
    Nothing: 'NOTHING',
    GetAllUsersEvents: 'GETALLEVENTS',
    GetAllUsersEventsSuccess: "GETALLEVENTSSUCCESS",
    GetAllUsersEventsFail: "GETALLEVENTSFAIL",
    GetUsersEventsFiltered: 'GET_ALL_EVENTS_FILTERED',
    GetUsersEventsFilteredSuccess: "GET_ALL_EVENTS_FILTERED_SUCCESS",
    GetUsersEventsFilteredFail: "GET_ALL_EVENTS_FILTERED_FAIL",
    CreateNewEvent: "CREATENEWEVENT",
    CreateNewEventSuccess: "CREATENEWEVENTSUCCESS",
    CreateNewEventFail: "CREATENEWEVENTFAIL",
    ModifyEvent: "MODIFYEVENT",
    ModifyEventSuccess: "MODIFYEVENTSUCCESS",
    ModifyEventFail: "MODIFYEVENTFAIL",
    GetEventInfo: "GETEVENTINFO",
    GetEventInfoSuccess: "GETEVENTINFOSUCCESS",
    GetEventInfoFail: "GETEVENTINFOFAIL",
    DeleteEvent: "DELETEEVENT",
    RefreshCalendar: "REFRESHCALENDAR"
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

export const ModifyEventSuccess = () => {
    return {
        type: CalendarActionType.ModifyEventSuccess
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

export const DeleteEvent = (event) => {
    return {
        type: CalendarActionType.DeleteEvent,
        event: event
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

export const CreateNewEventSuccess = () => {
    return {
        type: CalendarActionType.CreateNewEventSuccess
    }
};

export const CreateNewEventFail = (error_message) => {
    return {
        type: CalendarActionType.CreateNewEventFail,
        error_message: error_message
    }
};

export const GetAllUsersEvents = (_pseudo) => {
  return {
      type: CalendarActionType.GetAllUsersEvents,
      pseudo: _pseudo
  };
};

export const GetAllUsersEventsSuccess = (calendars, calendarFilters) => {
  return {
      type: CalendarActionType.GetAllUsersEventsSuccess,
      calendars,
      calendarFilters
  }
};

export const GetAllUsersEventsFail = (error_message) => {
    return {
        type: CalendarActionType.GetAllUsersEventsFail,
        error_message: error_message
    };
};


export const GetUsersEventsFiltered = (_filters) => {
    return {
        type: CalendarActionType.GetUsersEventsFiltered,
        filters: _filters
    };
};

export const GetUsersEventsFilteredSuccess = (calendars) => {
    return {
        type: CalendarActionType.GetUsersEventsFilteredSuccess,
        calendars
    }
};

export const GetUsersEventsFilteredFail = (error_message) => {
    return {
        type: CalendarActionType.GetUsersEventsFilteredFail,
        error_message: error_message
    };
};