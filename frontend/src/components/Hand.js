import React, { useState } from "react";

const Hand = ({ suit, cardValue, className, width, animation }) => {

    return (
        <div className={`card ${className}`} style={{ width: width}}>
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