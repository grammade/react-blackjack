import React, { useEffect, useState } from "react";
import { drawCard, stand, resetDeck, resetHand } from "../services/CardsAPI";
import { getSession, getWl } from "../services/UsersAPI";
import { useAuth } from "../context/authContext";


const GameButton = ({
    getContainerSize,
    setPlayerHand,
    setPlayerSum,
    playerHand,
    setCardWidth,
    openModal,
    fetchDealerCard,
    resetDealer,
    updateWl,
    endRound,
    gameStateParent }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut, manageSession, getUid } = useAuth()

    const [btnStartText, setBtnStartText] = useState("START")
    const [btnEndText, setBtnEndText] = useState("gg")
    const [gameState, setGameState] = useState("pre")
    const gameStateWrap = (state) => {
        setGameState(state)
        gameStateParent(state)
    }

    const handleHit = async () => {
        if (gameState === "pre") {
            setBtnStartText("HIT")
            gameStateWrap("game")
            await fetchDealerCard()
            return
        }

        const uid = getUid()
        const session = await manageSession(uid)

        const cardContainer = getContainerSize() - 20
        let card = await drawCard(uid, session);
        if (card.suit === null) {
            console.log("card is depleted, regening the deck")
            await shuffleDeck(session)
            console.log("deck regened, redrawing")
            card = await drawCard(uid, session)
        }
        console.log("adding new card to hand")
        const newHand = [...playerHand, card]
        const newHandLength = newHand.length;
        const cardWidth = Math.floor((cardContainer - (newHandLength * 4)) / (newHandLength));

        setCardWidth(cardWidth)
        setPlayerHand(newHand)
        setPlayerSum(card.handSum)
        checkState(card)
    }

    const onStand = async () => {
        const uid = getUid()
        const session = await manageSession(uid)
        const result = await stand(uid, session);
        console.log("round result", result)
        if(result === "v")
            setBtnEndText("Round won")
        else if(result === "l")
            setBtnEndText("Round lost")
        else if(result === "d")
            setBtnEndText("Draw")
        endRound(result)
        gameStateWrap("post")
    }

    const checkState = (card) => {
        if (!card.state)
            return null

        if (card.state === "bj") {
            console.log("blackjack!")
            setBtnEndText("Blackjack!")
            endRound("v")
            gameStateWrap("post")
        } else if (card.state === "bu") {
            console.log("bust!")
            setBtnEndText("Bust!")
            endRound("l")
            gameStateWrap("post")
        }
    }

    const reset = async (isLoggingIn) => {
        gameStateWrap("pre")
        //add some exit animation for the cards
        const timer = setTimeout(() => {
            resetDealer()
            setCardWidth(100)
            setPlayerHand([])
            setPlayerSum("-")
        }, 250)
        if (isLoggingIn) {
            const uid = getUid()
            const session = await manageSession(uid)
            await resetHand(session)
        }
        return () => clearTimeout(timer)
    }

    const shuffleDeck = async (sessionId) => {
        console.log("reseting deck")
        await resetDeck(sessionId)
    }

    useEffect(() => {
        const resetHook = async () => {
            await reset(true)
        }
        return () => resetHook()
    }, [userLoggedIn])

    useEffect(() => {
        if (gameState === "post") {
            setBtnStartText("START")
            updateWl()
        }
    }, [gameState])
    return (
        <div className="BtnContainer">
            <div className="CenterButtons">
                {gameState === "post" ? (
                    <button onClick={reset}
                        style={{ width: '226px' }}
                        className="Btn mx-1 my-1">
                        {btnEndText}
                    </button>
                ) : (
                    <>
                        <button onClick={handleHit}
                            style={{ width: '100px' }}
                            className={`Btn  mx-1 my-1`}>{btnStartText}</button>
                        <button onClick={onStand}
                            style={{ width: '100px' }}
                            className={`Btn mx-1 my-1 ${gameState === "game" ? 'disabled' : ''}`}>STAND</button>
                    </>
                )}

            </div>
            <button onClick={openModal}
                className={`Btn StickRight `}>Leaderboards</button>
        </div>
    )
}

export default GameButton