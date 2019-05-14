import {EventsActionType} from "./events.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {status: 'NONE'};

export const EventsReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        // case CalendarActionType.GetEventInfo:
        //     return {
        //         ...state,
        //         status: CalendarActionType.GetEventInfo,
        //         event: action.event
        //     };
        default:
            return state;
    }
};