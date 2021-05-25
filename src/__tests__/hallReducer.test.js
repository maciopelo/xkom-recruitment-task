import {hallReducer} from '../redux/reducers/hallReducer'
import { ActionTypes } from "../redux/constants/actionTypes"




describe("hall reducer", ()=>{

    const initialState = {
        dim:{
            rows:0,
            cols:0,
        },
        allSeats: [],
        freeSeats: [],
        chosenSeats: [],
        proposedSeats:[],
    }


    it('should return initial state',()=>{
        expect(hallReducer(undefined,{})).toEqual(initialState)
    })


    it('should handle LOAD_HALL_DATA action', ()=>{


        const action = {
            type: 'LOAD_HALL_DATA',
            payload: [
                {
                    "id": "s02",
                    "cords": {
                      "x": 0,
                      "y": 1
                    },
                    "reserved": false
                  },
                  {
                    "id": "s03",
                    "cords": {
                      "x": 0,
                      "y": 2
                    },
                    "reserved": true
                  },
                  {
                    "id": "s04",
                    "cords": {
                      "x": 0,
                      "y": 3
                    },
                    "reserved": true
                  },
            ]
        }

        expect(hallReducer(initialState,action)).toEqual(
            {
                dim:{
                    rows:0,
                    cols:3,
                },
                allSeats: action.payload,
                freeSeats: [{
                    "id": "s02",
                    "cords": {
                      "x": 0,
                      "y": 1
                    },
                    "reserved": false
                  }],
                chosenSeats: [],
                proposedSeats:[],
            }
        )


    })

    it("shoudl handle SET_CHOSEN_SEAT action", ()=>{

        const action = {
            type: ActionTypes.SET_CHOSEN_SEAT,
            payload:{
              "x": 0,
              "y": 1
            }
        }
        

        
        const prevState = {...initialState,
        allSeats: [{
            "id": "s02",
            "cords": {
              "x": 0,
              "y": 1
            },
            "reserved": false
          },
          {
            "id": "s03",
            "cords": {
              "x": 0,
              "y": 2
            },
            "reserved": true
          },
          {
            "id": "s04",
            "cords": {
              "x": 0,
              "y": 3
            },
            "reserved": true
          },]
        }


        expect(hallReducer(prevState,action)).toEqual(
            {...prevState, chosenSeats:[
                {
                    "id": "s02",
                    "cords": {
                      "x": 0,
                      "y": 1
                    },
                    "reserved": false
                  } 
            ]}
        )



    })


    it("shoudl handle REMOVE_CHOSEN_SEAT action", ()=>{

        const action = {
            type: ActionTypes.REMOVE_CHOSEN_SEAT,
            payload:{
              "x": 0,
              "y": 1
            }
        }
        

        
        const prevState = {...initialState,
        chosenSeats: [{
            "id": "s02",
            "cords": {
              "x": 0,
              "y": 1
            },
            "reserved": false
          }]
        }


        expect(hallReducer(prevState, action)).toEqual(
            {...prevState, chosenSeats:[]}
        )
    })


    it("shoudl handle SET_PROPOSED_SEATS action", ()=>{

      const action = {
        type: ActionTypes.SET_PROPOSED_SEATS,
        payload:2
      }

      const prevState = {...initialState,
        freeSeats:[
          {
            "id": "s02",
            "cords": {
              "x": 0,
              "y": 2
            },
            "reserved": false
          },
          {
            "id": "s03",
            "cords": {
              "x": 0,
              "y": 3
            },
            "reserved": false
          },
          {
            "id": "s04",
            "cords": {
              "x": 0,
              "y": 4
            },
            "reserved": false
          }
        ]
      }

      expect(hallReducer(prevState, action)).toEqual({
        ...prevState,
        proposedSeats:[
          [{
            "id": "s02",
            "cords": {
              "x": 0,
              "y": 2
            },
            "reserved": false
          },
          {
            "id": "s03",
            "cords": {
              "x": 0,
              "y": 3
            },
            "reserved": false
          }
            
          ],
          [
            {
              "id": "s03",
              "cords": {
                "x": 0,
                "y": 3
              },
              "reserved": false
            },
            {
              "id": "s04",
              "cords": {
                "x": 0,
                "y": 4
              },
              "reserved": false
            }
          ]
        ]
      })
  })


})