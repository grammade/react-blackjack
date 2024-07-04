import React, {useState} from "react";



const GameButton = ({onStart, onHit, onStand, gameStart}) => {
    
    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    return (
        <div className="btn-container mb-4">
            <button onClick={onHit} className={`btn btn-${btnStartClass} mx-1 my-1 ${gameStart ? 'disabled' : ''}`}>{btnStartText}</button>
            <button onClick={onStand} className={`btn btn-success mx-1 my-1 ${!gameStart ? 'disabled' : ''}`}>STAND</button>
        </div>
    )
}

export default GameButton