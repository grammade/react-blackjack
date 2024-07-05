import React, {useState} from "react";

const Hand = ({suit, cardValue}) => {
    
    
    return(
        <div className="card">
            <div className="suit" data-suit={suit}>
                {suit}
            </div>
            <div className="cardValue">
                {cardValue}
            </div>
        </div>
    )
}

export default Hand