import express from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";

const router = express.Router()
const decks = {}

function initDeck(sessionId){
    decks[sessionId] = {
        deck: [
            { suit: "hearts",   cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },  
            { suit: "diamonds", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },  
            { suit: "clubs",    cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] }, 
            { suit: "spades",   cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] } 
        ],
        cardCount: 54,
        currentHandSum: 0
    }
}
var cardSuits = [
    "♥",
    "♦",
    "♣",
    "♠"
]

router.get("/draw/:sessionId", asyncHandler( async(req, res) => {
    const sessionId = req.params.sessionId
    if(!decks[sessionId]){
        console.log(`init new deck with sess:`)
        console.log(sessionId)
        initDeck(sessionId)
    }
    const deck = decks[sessionId].deck
    
    if(!deck.some(d => d.cards.length > 0))
        return res.status(400).json({msg: "deck is empty"})
    
    let suitIndex, suit, cardIndex, cardVal
    
    do {
        suitIndex = Math.floor(Math.random() * deck.length);
        suit = deck[suitIndex];
    } while (suit.cards.length === 0)

    cardIndex = Math.floor(Math.random() * deck[suitIndex].cards.length)
    cardVal = suit.cards[cardIndex]

    suit.cards.splice(cardIndex, 1) 
    decks[sessionId].cardCount--

    res.status(200).json({ suit: cardSuits[suitIndex], card: cardVal, deckCount: decks[sessionId].cardCount })
}))

router.get("/dealer/draw", (req, res) => {
    //hits until 17 or more, one card is hidden
})

router.get("/check", (req, res) => {
    res.status(200).json({ "deck": deck })
})

export default router