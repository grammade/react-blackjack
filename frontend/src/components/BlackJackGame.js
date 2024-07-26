import React, { useEffect, useRef, useState } from "react";
import { AuthProvider } from '../context/authContext';
import Header from "./Header";
import GameButton from "./GameButton";
import Wl from "./WLRatio";
import Card from "./Card";

import { drawHoleCardDealer, drawCardDealer, resetDeck } from "../services/CardsAPI";
import { getSession, getWl } from "../services/UsersAPI";
import { useAuth } from "../context/authContext";

import "./BlackJack.css"

const BlackJackGame = ({ openModal }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut, manageSession, getUid } = useAuth()
    const [dealerHand, setDealerHand] = useState([])
    const [playerHand, setPlayerHand] = useState([])
    const [dealerSum, setDealerSum] = useState("-")
    const [playerSum, setPlayerSum] = useState()
    const [wlRatio, setWlRatio] = useState("0/0")
    const [localWin, setLocalWin] = useState(0)
    const [localLoss, setLocalLoss] = useState(0)
    const [gameState, setGameState] = useState()
    const [cardWidth, setCardWidth] = useState(100)
    const [containerWidth, setContainerWidth] = useState(0)
    const [dealerCardClasses, setDealerCardClasses] = useState([])
    const [playerCardClasses, setPlayerCardClasses] = useState([])
    const ref = useRef(null)

    const fetchDealerCard = async () => {
        let uid = userLoggedIn ? currentUser.uid : guestUid
        console.log("fetching session from dealer hit")
        const session = await manageSession(uid)
        console.log(`session fetched: ${session}`)
        console.log(`drawing dealer card`)
        let dealerHand = await drawCardDealer(session)
        if (!dealerHand.hand) {
            console.log("penetration level reached, shuffling new deck")
            await resetDeck(session)
            console.log(`drawing dealer card`)
            dealerHand = await drawCardDealer(session)
        }
        console.log(`dealer card drawn`)
        setDealerHand(dealerHand.hand)
        setDealerSum("?")
    }

    const resetDealer = () => {
        setDealerHand([])
        setDealerSum("-")
    }

    const updatePlayerHand = (hand) => {
        setPlayerHand(hand)
    }

    const updateWlRatio = async () => {
        console.log('fetching wl')
        let w, l;
        if (userLoggedIn) {
            const user = await getWl(getUid())
            w = user.win
            l = user.loss
        } else {
            w = localWin
            l = localLoss
        }
        setWlRatio(`${w} / ${l}`)
    }

    const endRound = async (res) => {
        if (!userLoggedIn) {
            if (res === "v")
                setLocalWin(localWin + 1)
            else
                setLocalLoss(localLoss + 1)
        }

        let uid = userLoggedIn ? currentUser.uid : guestUid
        console.log("fetching session from hole card")
        const session = await manageSession(uid)
        const dealer = await drawHoleCardDealer(session)
        console.log("holeCard", dealer)

        //reveal dealer cards
        setDealerHand(dealer.hand)
        setDealerSum(dealer.handSum)
    }

    const getDealerClassName = (index, dealerHand) => {
        if (index === dealerHand.length - 1 && dealerHand[index].suit != null) {
            return "last"
        } else {
            return "fade-in";
        }
    }
    const getPlayerClassName = (index, playerHand) => {
        if (index === playerHand.length - 1) {
            return "fade-in"
        } else {
            return ""
        }
    }

    const getStyle = (index, dealerHand) => {
        if ((index !== dealerHand.length - 1 || dealerHand[index].suit === null) && gameState !== "pre") {
            return { animationDelay: `${index * 0.1}s` }
        } else {
            return {};
        }
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
    useEffect(() => {
        updateWlRatio()
    }, [])
    useEffect(() => {
        updateWlRatio()
    }, [userLoggedIn])
    useEffect(() => {
        setDealerCardClasses(dealerHand.map((card, index) => getDealerClassName(index, dealerHand)));
    }, [dealerHand])
    useEffect(() => {
        setPlayerCardClasses(playerHand.map((card, index) => getPlayerClassName(index, playerHand)));
    }, [playerHand])
    useEffect(() => {
        if (gameState === "pre") {
            setDealerCardClasses(dealerHand.map(() => "fade-out"))
            setPlayerCardClasses(playerHand.map(() => "fade-out"))
        }
    }, [gameState, dealerHand, playerHand])
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
                                    suit={card.suit}
                                    cardValue={card.card}
                                    className={dealerCardClasses[index]}
                                    style={getStyle(index, dealerHand)}
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
                                    className={playerCardClasses[index]}
                                    width={cardWidth}
                                />
                            ))
                        }
                    </h2>
                    <h3 id="handSum" className="hand-sum">{playerSum}</h3>
                </div>
                <GameButton
                    getContainerSize={getContainerSize}
                    setPlayerHand={updatePlayerHand}
                    setPlayerSum={setPlayerSum}
                    playerHand={playerHand}
                    setCardWidth={setCardWidth}
                    openModal={openModal}
                    fetchDealerCard={fetchDealerCard}
                    resetDealer={resetDealer}
                    updateWl={updateWlRatio}
                    endRound={endRound}
                    gameStateParent={setGameState}
                />
            </div>
            <Wl ratio={wlRatio} />
        </div>
    );
}

export default BlackJackGame

