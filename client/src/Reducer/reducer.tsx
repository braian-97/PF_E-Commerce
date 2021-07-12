import { actionsType } from '../constants/constants';

let initialState = {
    searchInput: '',
    professors: [{ name: 'ariel' }, { name: 'asd' }],
    professor: [],
    claim: [],
    class: {},
    newRegister: {}
};

const all = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_BY_ID:
            return {
                ...state,
                claim: action.payload
            }
        case actionsType.SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        default:
            return state
    }
};

export default all;
