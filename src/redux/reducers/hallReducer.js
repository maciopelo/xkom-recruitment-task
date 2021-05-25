import { ActionTypes } from "../constants/actionTypes"


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

export const hallReducer = (state = initialState, {type, payload}) => {

    switch (type){

        case ActionTypes.LOAD_HALL_DATA:{

            const rows = payload.reduce( (maxRow, {cords}) => cords.x > maxRow ? cords.x : maxRow, payload[0].cords.x )
            const cols = payload.reduce( (maxCol, {cords}) => cords.y > maxCol ? cords.y : maxCol, payload[0].cords.y )
            const freeSeats = payload.filter( seat => seat.reserved === false)
  
            return {
                ...state,
                allSeats: payload,
                freeSeats,
                dim:{
                    rows,
                    cols
                }
            }
        }


        case ActionTypes.SET_CHOSEN_SEAT:{

            const choseSeat = state.allSeats.filter(seat => payload.x === seat.cords.x && payload.y === seat.cords.y)

            return {
                ...state,
                chosenSeats: [...state.chosenSeats, ...choseSeat]
            }
        }


        case ActionTypes.REMOVE_CHOSEN_SEAT:{
            
            const updatedChosenSeats = state.chosenSeats.filter(seat => payload.x !== seat.cords.x || payload.y !== seat.cords.y)

            return {
                ...state,
                chosenSeats: [...updatedChosenSeats]
            }
        }

        case ActionTypes.SET_PROPOSED_SEATS:{


            let result = []
            const numOfSeatsSideBySide = payload;
            const cartesianlySorted = state.freeSeats.sort((a,b) => (a.cords.y < b.cords.y && a.cords.x < b.cords.x) ? -1 : 1)
            

            for (let i = 0; i < cartesianlySorted.length; i++) {


                const currenSeatY = cartesianlySorted[i].cords.y;

                if(i <= cartesianlySorted.length - numOfSeatsSideBySide){
                    const lastSeatSideBySide = cartesianlySorted[i+numOfSeatsSideBySide-1].cords.y;

                    if(lastSeatSideBySide - currenSeatY === numOfSeatsSideBySide - 1){
                        
                        let tmp = []
                        for (let j = 0; j < numOfSeatsSideBySide; j++)
                            tmp.push(cartesianlySorted[i+j])
    
                        result.push(tmp)
                        
                    }
                    
                }
                
            }

            return {
                ...state,
                proposedSeats: [...result]
            }

        }
            

        default:
            return state;
    }
       
}

