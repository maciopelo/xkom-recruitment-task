import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChosenSeat, removeChosenSeat} from "../redux/actions/hallAction"
import { decrementUserSeats ,incrementUserSeats, setUserReservedSeats} from "../redux/actions/userAction"
import SeatDescriber from '../components/SeatDescriber'
import "../styles/reservationPage.scss"
import { Row, Col, Modal } from 'antd';



const prepareSeatsInitialGrid = (rows, cols) => {

    const result = [];
    for (let y = 0; y < rows+1; y++) {

        let columns = [];
        for (let x = 0; x < cols+1; x++) {

            columns.push(<Col key={`x:${y} y:${x}`} span={1}/>);
        }

        result.push(<Row justify="center" key={`y:${y}`} >{columns}</Row>);
    }

    return result;
}


const ReservationPage = () => {

    const dispatch = useDispatch()
    let history = useHistory();

    const {numOfChosenSeats, sideBySide} = useSelector(state => state.user);
    const {allSeats, chosenSeats, dim, proposedSeats } = useSelector(state => state.hall);
    const {rows, cols} = dim

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [grid, setGrid] = useState([])
    const [randomProposedSeats, setRandomProposedSeats] = useState([])


    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize)

        if(Boolean(proposedSeats.length)){
            const randomNum = Math.floor(Math.random() * proposedSeats.length) + 1 
            setRandomProposedSeats(proposedSeats[randomNum])
        }
        

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }

    },[])


    useEffect(() =>{
        setGrid(prepareSeatsInitialGrid(rows, cols))
    },[rows,cols])


    const handleReservation = () => {

        if(numOfChosenSeats === 0){
            dispatch(setUserReservedSeats(chosenSeats))
            history.push("/reserve/complete");
        }else{
            errorModal();
        }

    }


    const handleSeatChoice = (x, y, isReserved) => {

        if(!isReserved){

            const isChosenClicked = Boolean(chosenSeats.filter(seat => seat.cords.x === x && seat.cords.y === y).length)
            if(isChosenClicked){
                dispatch( incrementUserSeats() );
                dispatch( removeChosenSeat({x,y}) );
            }else{

                if(numOfChosenSeats > 0){
                    dispatch( decrementUserSeats() );
                    dispatch( setChosenSeat({x,y}) );
                }

            }

        }

    }



    const toggleStyles = (x, y, isReserved) => {

        const isProposed = Boolean(randomProposedSeats.filter( seat => seat.cords.x === x && seat.cords.y === y).length)
        const isAlreadyChosen = Boolean(chosenSeats.filter(seat => seat.cords.x === x && seat.cords.y === y).length)

        return (`hall-single-seat 
            ${isReserved ? "reserved" : "available"}
            ${isAlreadyChosen ? " chosen" : ""}
            ${(isProposed && !isAlreadyChosen && sideBySide) ? " blinking" : ""}`
        )
    }


    const errorModal = () =>{
        Modal.error({
            title:"Błąd rezerwacji",
            content:`Ilość miejsc do wybrania: ${numOfChosenSeats}`,
        })
    }

   

    return (
    <div className="reservation-page-container">
        <div className="hall-wrapper">
            {
                grid.map((row, idx) => {

                    let columns = [...row.props.children];

                    allSeats.forEach((element) => {
                        const { x, y } = element.cords;
                        const isReserved = element.reserved;
                        if(idx === x){
                            columns[y] = <Col 
                                key={`x:${x} y:${y}`}
                                className={toggleStyles(x, y, isReserved)}
                                onClick={() => handleSeatChoice(x, y, isReserved)}
                                style={{ height: windowWidth/24 }} 
                                span={1} />
                        }
                    })

                    return (<Row justify="center" key={`y:${idx}`}>{columns}</Row>)
                })
            }
        </div>
        <div className="bottom-reservation-panel">
            <SeatDescriber size={windowWidth/24} color={"#fff"} desc={"Miejsca dostępne"}/>
            <SeatDescriber size={windowWidth/24} color={"darkgray"} desc={"Miejsca zarezerwowane"}/>
            <SeatDescriber size={windowWidth/24} color={"#ff9549"} desc={"Twój wybór"}/>
            <button className="submit-reservation-btn" onClick={() => handleReservation()}>Rezerwuj</button>
        </div>
    </div>
    );
}
 
export default ReservationPage;