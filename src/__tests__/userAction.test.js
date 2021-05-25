import * as actions from '../redux/actions/userAction'
import { ActionTypes } from "../redux/constants/actionTypes"
import validSeats from "../../__mocks__/validSeats.json"




describe('user actions', ()=>{

    it('should create an action to add user preferences', ()=>{

        const preferences = {
            seats: 3,
            sideBySide: false
        }

        const expectedAction = {
            type: ActionTypes.ADD_USER_PREF,
            payload: preferences
        }
        expect(actions.addUserPreferences(preferences)).toEqual(expectedAction)
    })

    it('should create an action to decrement user seats', ()=>{


        const expectedAction = {
            type: ActionTypes.DECR_USER_SEATS,
        }

        expect(actions.decrementUserSeats()).toEqual(expectedAction)
    })

    it('should create an action to increment user seats', ()=>{

        const expectedAction = {
            type: ActionTypes.INCR_USER_SEATS,
        }

        expect(actions.incrementUserSeats()).toEqual(expectedAction)
    })


    it('should create an action to set user reserved seats', ()=>{

        const seats = validSeats

        const expectedAction = {
            type: ActionTypes.SET_RESERVED_SEATS,
            payload: seats
        }
        expect(actions.setUserReservedSeats(seats)).toEqual(expectedAction)
    })

})