import React, { useState } from "react";
import { drawCard } from "../services/CardsAPI";



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

    function handleFace(face, sum) {
        if (face !== "A")
            return 10
        return sum + 11 <= 21 ? 11 : 1
    }

    const handleHit = async () => {
        const contianerSize = getContainerSize()
        const cardContainer = contianerSize - 20

        const hand = await drawCard();
        const newHand = [...playerHand, hand]
        const newHandLength = newHand.length;
        const cardWidth = Math.floor((cardContainer - (newHandLength * 4)) / (newHandLength));  // Adjust calculation as needed

        const newSum = newHand.reduce((sum, card) => {
            if (Number.isInteger(card.value))
                return sum += parseInt(card.value)
            else
                return sum += handleFace(card.value, playerSum)
        }, 0)
        setCardWidth(cardWidth)
        setPlayerHand(newHand)
        setPlayerSum(newSum)
    }

    const onHit = () => {
        if (!gameStart) {
            startGame();
        }

        handleHit("start")
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

    const [btnStartText, setBtnStartText] = useState("START")
    const [btnStartClass, setBtnStartClass] = useState("primary")
    const [gameState, setGameState] = useState(false)
    return (
        <div className="BtnContainer">
            <div className="CenterButtons">
                <button onClick={onHit}
                    className={`Btn  mx-1 my-1`}>{btnStartText}</button>
                <button onClick={onStand}
                    className={`Btn mx-1 my-1 ${!gameState ? 'disabled' : ''}`}>STAND</button>
            </div>
            <button onClick={openModal}
                className={`Btn StickRight `}>More</button>
        </div>
    )
}

export default GameButton