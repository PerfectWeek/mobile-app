export const CalendarActionType = {
    Nothing: 'NOTHING',
    GetAllUsersEvents: 'GETALLEVENTS',
    GetAllUsersEventsSuccess: "GETALLEVENTSSUCCESS",
    GetAllUsersEventsFail: "GETALLEVENTSFAIL"
};

export const GetAllUsersEvents = (_pseudo) => {
  return {
      type: CalendarActionType.GetAllUsersEvents,
      pseudo: _pseudo
  };
};

export const GetAllUsersEventsSuccess = (eventsList) => {
  return {
      type: CalendarActionType.GetAllUsersEventsSuccess,
      eventsList,
      error_message: null
  }
};

export const GetAllUsersEventsFail = (error_message) => {
    return {
        type: CalendarActionType.GetAllUsersEventsFail,
        error_message: error_message
    };
};