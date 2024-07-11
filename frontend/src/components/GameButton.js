import React, { useEffect, useState } from "react";
import { drawCard } from "../services/CardsAPI";
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
    openModal }) => {
    const { currentUser, userLoggedIn, loading, guestUid, signInGoogle, signOut } = useAuth()
    
    const manageSession = async (uid) => {
        let localSess = localStorage.getItem("session")
        console.log(`local session exists : ${localSess}`)
        if(!localSess){
            localSess = (await getSession(uid)).session
            localStorage.setItem("session", localSess)
            console.log(`creating new session: ${localSess}`)
        }
        
        return localSess
    }

    const handleHit = async () => {
        let uid = null
        if(userLoggedIn){
            uid = currentUser.uid
        }else{
            uid = guestUid
        }
        const session = await manageSession(uid)

        const cardContainer = getContainerSize() - 20
        const card = await drawCard(session);
        const newHand = [...playerHand, card]
        const newHandLength = newHand.length;
        const cardWidth = Math.floor((cardContainer - (newHandLength * 4)) / (newHandLength)); 

        setCardWidth(cardWidth)
        setPlayerHand(newHand)
        setPlayerSum(card.handSum)
    }

    const onHit = () => {
        if (!gameStart) {
            startGame();
        }

        handleHit()
    }

    const onStand = () => {
        console.log("onStand GameBtn")
    }

    function startGame() {
        gameStart = true
        setBtnStartClass("success")
        setBtnStartText("HIT")
        setGameState(true)
    }
    
    useEffect(() => {
        setPlayerHand([])
        setPlayerSum(0)
    }, [userLoggedIn])

    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    const [gameState, setGameState] = useState(false)
    return (
        <div className="BtnContainer">
            <div className="CenterButtons">
                <button onClick={onHit}
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