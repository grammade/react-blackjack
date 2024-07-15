import React, { useEffect, useState } from "react";
import { drawCard, stand, resetDeck } from "../services/CardsAPI";
import { getSession } from "../services/UsersAPI";
import { useAuth } from "../context/authContext";


const GameButton = ({
    getContainerSize,
    handleStand,
    gameStart,
    setPlayerHand,
    setPlayerSum,
    playerHand,
    playerSum,
    setCardWidth,
    openModal,
    fetchDealerCard,
    resetDealer }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut, manageSession, getUid } = useAuth()


    const handleHit = async () => {
        if (gameState === "pre") {
            setBtnStartClass("success")
            setBtnStartText("HIT")
            setGameState(true)
            await fetchDealerCard()
            return
        }

        const uid = getUid()
        const session = await manageSession(uid)

        const cardContainer = getContainerSize() - 20
        const card = await drawCard(uid, session);
        const newHand = [...playerHand, card]
        const newHandLength = newHand.length;
        const cardWidth = Math.floor((cardContainer - (newHandLength * 4)) / (newHandLength));

        setCardWidth(cardWidth)
        setPlayerHand(newHand)
        setPlayerSum(card.handSum)
        checkState(card)
    }

    const onStand = async() => {
        console.log("onStand")
        const uid = getUid()
        const session = await manageSession(uid)
        
        const result = await stand(uid, session);
        console.log(result)
        setGameState("post")
    }
    
    const checkState = (card) =>{
        if(!card.state)
            return null
        
        if(card.state === "bj"){
            console.log("blackjack!")
            setGameState("post")
        }else if (card.state === "bu"){
            console.log("bust!")
            setGameState("post")
        }
    }

    useEffect(() => {
        setPlayerHand([])
        setPlayerSum("-")
    }, [userLoggedIn])
    
    const reset = async () => {
        setCardWidth(100)
        setPlayerHand([])
        setPlayerSum("-")
        setGameState("pre")
        resetDealer()
        const uid = getUid()
        const session = await manageSession(uid)
        await resetDeck(session)
    }

    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    const [gameState, setGameState] = useState("pre")
    const [hitHanlder, setHitHandler] = useState()
    return (
        <div className="BtnContainer">
            <div className="CenterButtons">
                {gameState === "post" ? (
                    <button onClick={reset}
                        style={{width: '100px'}}
                        className="Btn mx-1 my-1">
                        gg go next
                    </button>
                ) : null}
                <button onClick={handleHit}
                    style={{ width: '100px' }}
                    className={`Btn  mx-1 my-1`}>{btnStartText}</button>
                <button onClick={onStand}
                    style={{ width: '100px' }}
                    className={`Btn mx-1 my-1 ${gameState==="game" ? 'disabled' : ''}`}>STAND</button>
            </div>
            <button onClick={openModal}
                className={`Btn StickRight `}>Leaderboards</button>
        </div>
    )
}

export default GameButton