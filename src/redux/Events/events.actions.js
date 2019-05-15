export const EventsActionType = {
    Nothing: 'NOTHING',
    SetLoading: 'SET_LOADING',
    GetEventRecommendation: 'GET_EVENTS_RECOMMENDATION',
    SetEvents: 'SET_EVENTS',
};

export const SetLoading = (loading) => {
    return {
        type: EventsActionType.SetLoading,
        loading
    }
};

export const GetEventRecommendation = (min_time, max_time, limit) => {
    return {type: EventsActionType.GetEventRecommendation, min_time, max_time, limit}
};

export const SetEvents = (events) => {
    return {
        type: EventsActionType.SetEvents,
        events
    }
};
