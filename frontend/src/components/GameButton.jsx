import React from "react";

const GameButton = ({onStart, onHit, onStand, state}) => {
    return (
        <div className="btn-container mb-4">
            <button onClick={onStart} className="btn btn-primary mx-1 my-1">Start</button>
            <button onClick={onHit} className={`btn btn-success mx-1 my-1 ${state ? 'disabled' : ''}`}>HIT</button>
            <button onClick={onStand} className={`btn btn-success mx-1 my-1 ${state ? 'disabled' : ''}`}>STAND</button>
        </div>
    )
}

export default GameButton