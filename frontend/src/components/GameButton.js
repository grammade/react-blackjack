import React, {useState} from "react";



const GameButton = ({handleHit, handleStand, gameStart}) => {
    
    const onHit = () => {
        if(!gameStart){ 
            startGame();
        }
        
        handleHit("start")
    }
    
    const onStand = () => {
        console.log("onStand GameBtn")
    }
    
    function startGame(){
        gameStart = true
        setBtnStartClass("success")
        setBtnStartText("HIT")
        setGameState(true)
    }
    
    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    const [gameState, setGameState] = useState(false)
    return (
        <div className="btn-container mb-4">
            <button onClick={onHit} 
                className={`btn btn-${btnStartClass} mx-1 my-1`}>{btnStartText}</button>
            <button onClick={onStand} 
                className={`btn btn-success mx-1 my-1 ${!gameState ? 'disabled' : ''}`}>STAND</button>
        </div>
    )
}

export default GameButton