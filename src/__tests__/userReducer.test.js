import {userReducer} from '../redux/reducers/userReducer'
import { ActionTypes } from "../redux/constants/actionTypes"



describe('user reducer', () => {

    it('should return initial state', () => {

        expect(userReducer(undefined,{})).toEqual({
            numOfChosenSeats: 0,
            sideBySide: false,
            reservedSeats:[],
        })

    })


    it('should handle ADD_USER_PREF action ', () => {

        const prevState = {
            numOfChosenSeats: 2,
            sideBySide: true,
            reservedSeats:[],
        }
        
        const action = {
            type: ActionTypes.ADD_USER_PREF,
            payload: {
                seats: 3,
                sideBySide: false
            }
        }

        expect(userReducer(prevState,action)).toEqual({
            numOfChosenSeats: 3,
            sideBySide: false,
            reservedSeats:prevState.reservedSeats,
        })

    })


    it('should handle DECR_USER_SEATS action ', () => {

        const prevState = {
            numOfChosenSeats: 2,
            sideBySide: true,
            reservedSeats:[
                {
                "id": "s02",
                "cords": {
                  "x": 0,
                  "y": 2
                },
                "reserved": false
              }
            ],
        }
        
        const action = {
            type: ActionTypes.DECR_USER_SEATS,
        }

        expect(userReducer(prevState, action)).toEqual({
            ...prevState,
            numOfChosenSeats: 1,
        })

    })

    it('should handle INCR_USER_SEATS action ', () => {

        const prevState = {
            numOfChosenSeats: 2,
            sideBySide: true,
            reservedSeats:[
                {
                "id": "s02",
                "cords": {
                  "x": 0,
                  "y": 2
                },
                "reserved": false
              }
            ],
        }
        
        const action = {
            type: ActionTypes.INCR_USER_SEATS,
        }

        expect(userReducer(prevState, action)).toEqual({
            ...prevState,
            numOfChosenSeats: 3,
        })

    })


    it('should handle SET_RESERVED_SEATS action ', () => {

        const prevState = {
            numOfChosenSeats: 2,
            sideBySide: true,
            reservedSeats:[],
        }
        
        const action = {
            type: ActionTypes.SET_RESERVED_SEATS,
            payload: [{
                "id": "s02",
                "cords": {
                  "x": 0,
                  "y": 2
                },
                "reserved": false
              }]
        }

        expect(userReducer(prevState, action)).toEqual({
            ...prevState,
            reservedSeats: [...action.payload]
        })

    })


})