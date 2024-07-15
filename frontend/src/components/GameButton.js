import React, { useEffect, useState } from "react";
import { drawCard, stand } from "../services/CardsAPI";
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
    fetchDealerCard }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut, manageSession, getUid } = useAuth()


    const handleHit = async () => {
        if (!gameState) {
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
    }

    const onStand = async() => {
        console.log("onStand")
        const uid = getUid()
        const session = await manageSession(uid)
        
        const result = await stand(uid, session);
        console.log(result)
    }

    const startGame = () => {
        gameStart = true
        setBtnStartClass("success")
        setBtnStartText("HIT")
        setGameState(true)
        fetchDealerCard()
        setHitHandler(() => handleHit)
    }

    useEffect(() => {
        setPlayerHand([])
        setPlayerSum("-")
    }, [userLoggedIn])
    
    const reset = () => {
        
    }

    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    const [gameState, setGameState] = useState(false)
    const [hitHanlder, setHitHandler] = useState(() => startGame)
    return (
        <div className="BtnContainer">
            <div className="CenterButtons">
                <button onClick={handleHit}
                    style={{ width: '100px' }}
                    className={`Btn  mx-1 my-1`}>{btnStartText}</button>
                <button onClick={onStand}
                    style={{ width: '100px' }}
                    className={`Btn mx-1 my-1 ${!gameState ? 'disabled' : ''}`}>STAND</button>
            </div>
            <button onClick={openModal}
                className={`Btn StickRight `}>Leaderboards</button>
        </div>
    )
}

export default GameButton