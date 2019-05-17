import {EventsActionType} from "./events.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {status: 'NONE'};

export const EventsReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case EventsActionType.SetLoading:
            return {
                ...state,
                loading: action.loading
            };
        case EventsActionType.SetEvents:
            return {
                ...state,
                events: action.events
            };
        case EventsActionType.SetEvent:
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

