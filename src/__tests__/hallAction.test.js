import * as actions from '../redux/actions/hallAction'
import { ActionTypes } from "../redux/constants/actionTypes"
import validSeats from "../../__mocks__/validSeats.json"

describe('hall actions', () =>{


    it('should create an action to load seats', () => {
        const seats = validSeats
        const expectedAction = {
            type: ActionTypes.LOAD_HALL_DATA,
            payload:seats
        }

        expect(actions.loadHallData(seats)).toEqual(expectedAction)

    })


    it('should create an action to set chosen seat', () => {
        const cords = { x:0, y:3}
        const expectedAction = {
            type: ActionTypes.SET_CHOSEN_SEAT,
            payload:cords
        }

        expect(actions.setChosenSeat(cords)).toEqual(expectedAction)

    })


    it('should create an action to remove chosen seat', () => {
        const cords = { x:2, y:6}
        const expectedAction = {
            type: ActionTypes.REMOVE_CHOSEN_SEAT,
            payload:cords
        }

        expect(actions.removeChosenSeat(cords)).toEqual(expectedAction)

    })

    it('should create an action to set proposed seats', () => {
        const numOfSeats = 8
        const expectedAction = {
            type: ActionTypes.SET_PROPOSED_SEATS,
            payload:numOfSeats
        }

        expect(actions.setProposedSeats(numOfSeats)).toEqual(expectedAction)

    })


})