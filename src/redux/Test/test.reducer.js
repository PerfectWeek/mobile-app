import { TestType } from "./test.actions";

export const test = (state = {
    name: 'il s\'est rien passer frere calme oit'
}, action) => {
    switch (action.type) {
        case TestType.Test:
            return {
                ...state,
                name: 'le test est succesful'
            };
        default:
            return state;
    }
};
