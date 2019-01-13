export const CalendarActionType = {
    Nothing: 'NOTHING',
    GetAllUsersEvents: 'GETALLEVENTS',
    GetAllUsersEventsSuccess: "GETALLEVENTSSUCCESS",
    GetAllUsersEventsFail: "GETALLEVENTSFAIL",
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

export const ModifyEventSuccess = (event) => {
    return {
        type: CalendarActionType.ModifyEventSuccess,
        event: event
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

export const GetAllUsersEventsSuccess = (calendars) => {
  return {
      type: CalendarActionType.GetAllUsersEventsSuccess,
      calendars
  }
};

export const GetAllUsersEventsFail = (error_message) => {
    return {
        type: CalendarActionType.GetAllUsersEventsFail,
        error_message: error_message
    };
};