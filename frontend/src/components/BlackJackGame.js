import React, { useState } from "react";
import Header from "./Header";
import GameButton from "./GameButton";
import Wl from "./WLRatio";

const BlackJackGame = () => {
    const [dealerHand, setDealerHand] = useState("-")
    const [playerHand, setPlayerHand] = useState("-")
    const [dealerSum, setDealerSum] = useState("-")
    const [playerSum, setPlayerSum] = useState("-")
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
                <h2 id="dealerHand">{dealerHand}</h2>
                <h3 id="dealerHandSum" className="hand-sum">{dealerSum}</h3>
            </div>

            <h3 className="mb-4">Your hand:</h3>
            <div className="card-container mb-4">
                <h2 id="hand">{playerHand}</h2>
                <h3 id="handSum" className="hand-sum">{playerSum}</h3>
            </div>

            <GameButton
                onStart={startGame}
                onHit={handleHit}
                onStand={handleStand}
                gameStart={false}
            />
        </div>
    );
}

export default BlackJackGame

