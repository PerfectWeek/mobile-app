import {arrayToObject} from "../../Utils/utils";

export const EventsActionType = {
    Nothing: 'NOTHING',
    SetLoading: 'SET_LOADING',
    GetEventRecommendation: 'GET_EVENTS_RECOMMENDATION',
    SetEvents: 'SET_EVENTS',
    SetEvent: 'SET_EVENT',
    JoinEvent: 'JOIN_EVENT',
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
        events : arrayToObject(events, 'id')
    }
};

export const SetEvent = (event) => {
    return {
        type: EventsActionType.SetEvent,
        event
    }
};

export const JoinEvent = (event, status) => {
    return {
        type: EventsActionType.JoinEvent,
        event,
        status
    }
};
