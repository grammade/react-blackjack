import React, { useState } from "react";
import Header from "./Header";
import GameButton from "./GameButton";
import Wl from "./WLRatio";

const BlackJackGame = () => {
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [wlRatio, setWlRatio] = useState("0/0")
    const [gameStarted, setGameStarted] = useState(false)


    const startGame = () => {
        console.log("start")
    }

    const handleHit = () => {
        console.log("hit")
    }

    const handleStand = () => {
        console.log("stand")
    }
    
    
    return (
        <div className="container text-center">
            <Header />

            <h3 className="mb-4">Dealer's hand:</h3>
            <div className="card-container mb-4">
                <h2 id="dealerHand">{dealerHand.join(', ')}</h2>
                <h3 id="dealerHandCount" className="hand-count">{dealerHand.length}</h3>
            </div>

            <h3 className="mb-4">Your hand:</h3>
            <div className="card-container mb-4">
                <h2 id="hand">{playerHand.join(', ')}</h2>
                <h3 id="handCount" className="hand-count">{playerHand.length}</h3>
            </div>

            <GameButton
                onStart={startGame}
                onHit={handleHit}
                onStand={handleStand}
                state={false}
            />

            <Wl ratio={wlRatio}/>
        </div>
    );
}

export default BlackJackGame

