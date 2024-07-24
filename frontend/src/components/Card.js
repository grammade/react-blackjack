import React, { useState } from "react";

const Card = ({ suit, cardValue, className, width, style, suitStyle  }) => {

    return (
        <div className={`card ${className}`} style={{ width: width, ...style}}>
            <div className="suit" style={{...suitStyle}}>
                {suit}
            </div>
            <div className="cardValue">
                {cardValue}
            </div>
        </div>
    )
}

export default Card