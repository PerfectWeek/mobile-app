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
                status: AutoCompletionType.AskCompletionSuccess,
                pseudoMatched: action.pseudoMatched
            };
        case AutoCompletionType.AskCompletionFail:
            return {
                ...state,
                status: AutoCompletionType.AskCompletionFail
            };
        case AutoCompletionType.AskCompletionNone:
            return {
                ...state,
                status: AutoCompletionType.AskCompletionNone
            };
        default:
            return state;
    }
};

