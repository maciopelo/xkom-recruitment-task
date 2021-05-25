import { ActionTypes } from "../constants/actionTypes"


export const loadHallData = (seats) => {
    return {
        type: ActionTypes.LOAD_HALL_DATA,
        payload: seats
    }
}


export const setChosenSeat = (cords) => {
    return {
        type: ActionTypes.SET_CHOSEN_SEAT,
        payload: cords
    }
}


export const removeChosenSeat = (cords) => {
    return {
        type: ActionTypes.REMOVE_CHOSEN_SEAT,
        payload: cords
    }
}

export const setProposedSeats = (numOfSeats) => {
    return {
        type: ActionTypes.SET_PROPOSED_SEATS,
        payload: numOfSeats
    }
}