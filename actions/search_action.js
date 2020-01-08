import action_types from './action_types'

export const addSearch = (payload) => {
    return  { 
        type: action_types.ADD_SEARCH,
        payload: payload
    }
};

export const changeCanalTypes = (payload) => {
    return  { 
        type: action_types.CHANGE_CANAL_TYPES,
        payload: payload
    }
};
