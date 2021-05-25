import React from 'react';
import "../styles/completeReservationPage.scss"
import { useSelector } from "react-redux";


const CompleteReservationPage = () => {

    const {reservedSeats} = useSelector(state => state.user)

    return ( 
    <div className="reservation-complete-page-container">
        <div className="reservation-message-wrapper">
            <h2>Twoja rezerwacja przebiegła pomyślnie!</h2>
            <div className="chosen-seats-list">
                <span>Wybrałeś miejsca:</span>
                <ul>
                    {reservedSeats.map(seat => <li>- rząd {seat.cords.x+1}, miejsce {seat.cords.y+1} ({seat.id})</li> )}
                </ul>
            </div>
            <h3>Dziękujęmy! W razie problemów prosimy o kontakt z działem administracji.</h3>
        </div>
    </div> 
    );
}
 
export default CompleteReservationPage;