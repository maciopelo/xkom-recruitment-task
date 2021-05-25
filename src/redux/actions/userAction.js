import {ActionTypes} from "../constants/actionTypes"


export const addUserPreferences = (preferences) => {
    return {
        type: ActionTypes.ADD_USER_PREF,
        payload: preferences
    }
}

export const decrementUserSeats = () => {
    return {
        type: ActionTypes.DECR_USER_SEATS,
    }
}

export const incrementUserSeats = () => {
    return {
        type: ActionTypes.INCR_USER_SEATS,
    }
}

export const setUserReservedSeats = (seats) => {
    return {
        type: ActionTypes.SET_RESERVED_SEATS,
        payload:seats
    }
}
