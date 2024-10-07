import { ACTION_TYPES } from "./actionTypes"

export const initialState = {
    excuses  : "",
    error : null,
    loading: false,
}

export const apiReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.execuse:
            return {...state, excuses: action.data}
        case ACTION_TYPES.loading: 
            return {...state, loading: action.data}
        case ACTION_TYPES.error:
            return {...state, error: action.data}
        default:
            return state
    }
}
