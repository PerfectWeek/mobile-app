import {AutoCompletionType} from "./autocompletion.actions";

export const AutoCompletionReducer = (state = {
    status: 'NONE'
}, action) => {
    switch(action.type) {
        case AutoCompletionType.AskCompletion:
            return {
                ...state,
                status: AutoCompletionType.AskCompletion,
                searchPseudo: action.searchPseudo
            };
        case AutoCompletionType.AskCompletionSuccess:
            return {
                ...state,
                state: AutoCompletionType.AskCompletionSuccess,
                pseudoMatched: action.pseudoMatched
            };
        case AutoCompletionType.AskCompletionFail:
            return {
                ...state,
                status: AutoCompletionType.AskCompletionFail
            };
        default:
            return state;
    }
};

