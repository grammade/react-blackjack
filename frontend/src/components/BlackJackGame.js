import React, { useEffect, useRef, useState } from "react";
import { AuthProvider } from '../context/authContext';
import Header from "./Header";
import GameButton from "./GameButton";
import Wl from "./WLRatio";
import Card from "./Card";

import { drawCard, drawCardDealer } from "../services/CardsAPI";
import { getSession } from "../services/UsersAPI";
import { useAuth } from "../context/authContext";

import "./BlackJack.css"

const BlackJackGame = ({ openModal }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut, manageSession } = useAuth()
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [dealerSum, setDealerSum] = useState("-")
    const [playerSum, setPlayerSum] = useState()
    const [wlRatio, setWlRatio] = useState("0/0")
    const [gameStarted, setGameStarted] = useState(false)
    const [cardWidth, setCardWidth] = useState(100)
    const [containerWidth, setContainerWidth] = useState(0)
    const ref = useRef(null)

    const fetchDealerCard = async () => {
        let uid = null
        if (userLoggedIn) {
            uid = currentUser.uid
        } else {
            uid = guestUid
        }
        console.log("fetching session from dealer hit")
        const session = await manageSession(uid)
        const dealerHand = await drawCardDealer(session)
        setDealerHand(dealerHand.hand)
        setDealerSum("?")
    }
    
    const resetDealer = () =>{
        setDealerHand([])
        setDealerSum("-")
    }
    
    const handleStand = () => {
        console.log("stand")
    }

    const updatePlayerHand = (hand) => {
        setPlayerHand(hand)
    }

    const getContainerSize = () => containerWidth

    useEffect(() => {
        const getSize = () => {
            if (ref.current) {
                if (ref.current.offsetWidth) {
                    setContainerWidth(ref.current.offsetWidth)
                }
            }
        }

        getSize()
        window.addEventListener("resize", getSize)
        return () => {
            window.removeEventListener("resize", getSize)
        }
    }, [ref])

    return (
        <div>
            <Header />
            <div className="container text-center">

                <h3 className="mb-4">Dealer's hand:</h3>
                <div className="card-container mb-4">
                    <h2 id="dealerHand" className="cardHand">
                        {
                            dealerHand.map((card, index) => (
                                <Card 
                                    key={index}
                                    suit={index === dealerHand.length-1 ? "" : card.suit}
                                    cardValue={index === dealerHand.length-1 ? "" : card.card}
                                    className={index === dealerHand.length - 1 ? 'face-down' : ''}
                                />
                            ))
                        }
                    </h2>
                    <h3 id="dealerHandSum" className="hand-sum">{dealerSum}</h3>
                </div>

                <h3 className="mb-4">Your hand:</h3>
                <div id="cardContainer" className="card-container mb-4" ref={ref}>
                    <h2 id="hand" className="cardHand" >
                        {
                            playerHand.map((card, index) => (
                                <Card
                                    key={index}
                                    suit={card.suit}
                                    cardValue={card.value}
                                    className={index === playerHand.length - 1 ? 'fade-in' : ''}
                                    width={cardWidth}
                                />
                            ))
                        }
                    </h2>
                    <h3 id="handSum" className="hand-sum">{playerSum}</h3>
                </div>
                <GameButton
                    getContainerSize={getContainerSize}
                    handleStand={handleStand}
                    gameStart={gameStarted}
                    setPlayerHand={updatePlayerHand}
                    setPlayerSum={setPlayerSum}
                    playerHand={playerHand}
                    playerSum={playerSum}
                    setCardWidth={setCardWidth}
                    openModal={openModal}
                    fetchDealerCard={fetchDealerCard}
                    resetDealer = {resetDealer}
                />
            </div>
            <Wl ratio={"0/0"} />
        </div>
    );
}

export default BlackJackGame

