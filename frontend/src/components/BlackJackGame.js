import React, { useState } from "react";
import Header from "./Header";
import GameButton from "./GameButton";
import Wl from "./WLRatio";
import Hand from "./Hand";

import { drawCard } from "../services/API";

const BlackJackGame = () => {
    const [dealerHand, setDealerHand] = useState("-")
    const [playerHand, setPlayerHand] = useState([])
    const [dealerSum, setDealerSum] = useState("-")
    const [playerSum, setPlayerSum] = useState()
    const [wlRatio, setWlRatio] = useState("0/0")
    const [gameStarted, setGameStarted] = useState(false)

    const handleHit = async (state) => {
        console.log("hit")

        const hand = await drawCard();
        const newHand = [...playerHand, hand]
        const newSum = newHand.reduce((sum, card ) => {
            if(Number.isInteger(card.value))
                return sum += parseInt(card.value)
            else
                return sum += handleFace(card.value, playerSum)
        }, 0)
        console.log(newSum)
        setPlayerHand(newHand)
        setPlayerSum(newSum)
    }

    const handleStand = () => {
        console.log("stand")
    }
    
    function handleFace(face, sum){
        if(face !== "A")
            return 10
        return sum+11 <= 21 ? 11 : 1
    }
    return (
        <div>
            <Header />
            <div className="container text-center">

                <h3 className="mb-4">Dealer's hand:</h3>
                <div className="card-container mb-4">
                    <h2 id="dealerHand" className="cardHand">
                        <Hand
                            suit={"♣"}
                            cardValue={"10"}
                        />
                        <Hand
                            suit={"♣"}
                            cardValue={"10"}
                        />
                    </h2>
                    <h3 id="dealerHandSum" className="hand-sum">{dealerSum}</h3>
                </div>

                <h3 className="mb-4">Your hand:</h3>
                <div className="card-container mb-4">
                    <h2 id="hand" className="cardHand">
                        {
                            playerHand.map((card, index) => (
                                <Hand key={index} suit={card.suit} cardValue={card.value}/>
                            ))
                        }
                    </h2>
                    <h3 id="handSum" className="hand-sum">{playerSum}</h3>
                </div>

                <GameButton
                    handleHit={handleHit}
                    handleStand={handleStand}
                    gameStart={gameStarted}
                />
            </div>
            <Wl ratio={"0/0"} />
        </div>
    );
}

export default BlackJackGame

