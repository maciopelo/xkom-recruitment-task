import { ActionTypes } from '../constants/actionTypes'


const initialState = {
    numOfChosenSeats: 0,
    sideBySide: false,
    reservedSeats:[],
}


export const userReducer = (state = initialState, {type, payload} ) => {

    switch (type) {
        case ActionTypes.ADD_USER_PREF:
            return {...state, numOfChosenSeats:payload.seats, sideBySide:payload.sideBySide}

        case ActionTypes.DECR_USER_SEATS:
            return {...state, numOfChosenSeats: state.numOfChosenSeats - 1}

        case ActionTypes.INCR_USER_SEATS:
            return {...state, numOfChosenSeats: state.numOfChosenSeats + 1}
        
        case ActionTypes.SET_RESERVED_SEATS:
            return {...state, reservedSeats: [...payload]};
        
        default:
            return state;
    }

}

