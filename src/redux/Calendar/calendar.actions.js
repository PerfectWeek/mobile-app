export const CalendarActionType = {
    Nothing: 'NOTHING',
    GetAllUsersEvents: 'GETALLEVENTS',
    GetAllUsersEventsSuccess: "GETALLEVENTSSUCCESS",
    GetAllUsersEventsFail: "GETALLEVENTSFAIL",
    CreateNewEvent: "CREATENEWEVENT",
    CreateNewEventSuccess: "CREATENEWEVENTSUCCESS",
    CreateNewEventFail: "CREATENEWEVENTFAIL",
    RefreshCalendar: "REFRESHCALENDAR"
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