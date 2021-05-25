import React from 'react';



const SeatDescriber = ({size, color, desc}) => {

    return (
    <div className="seat-describer-wrapper">
        <div className="seat-describer" style={{backgroundColor:color, height:size, width:size}}/>
        <span>{desc}</span>
    </div>
    );
}
 
export default SeatDescriber;