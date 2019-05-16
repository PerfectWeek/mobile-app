export const AutoCompletionType = {
    AskCompletion: 'ASK_COMPLETION',
    AskCompletionSuccess: 'ASK_COMPLETION_SUCCESS',
    AskCompletionFail: 'ASK_COMPLETION_FAIL',
    AskCompletionNone: 'ASK_COMPLETION_NONE'
};

export const AskCompletion = (searchPseudo) => {
    return {
        type: AutoCompletionType.AskCompletion,
        searchPseudo: searchPseudo
    }
};

export const AskCompletionSuccess = (pseudoMatched) => {
    return {
        type: AutoCompletionType.AskCompletionSuccess,
        pseudoMatched: pseudoMatched
    }
};


export const AskCompletionFail = () => {
    return {
        type: AutoCompletionType.AskCompletionFail
    }
};

export const AskCompletionNone = () => {
    return {
        type: AutoCompletionType.AskCompletionNone
    }
};
