import express from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";
import {DrawCardDTO, DealerCardDTO} from "../dtos/card.js"

const router = express.Router()
const decks = {}
router.get("/draw/:sessionId", asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    if (!decks[sessionId]) {
        console.log(`Initializing new deck with session: ${sessionId}`);
        initDeck(sessionId);
    }

    const { deck, currentHandSum, currentDealerHandSum, cardCount } = decks[sessionId];

    if (!deck.some(suit => suit.cards.length > 0))
        return res.status(400).json(
            {
                msg: "Deck is empty",
                status: 1
            });

    let suit, cardVal;

    do suit = deck[Math.floor(Math.random() * deck.length)];
    while (suit.cards.length === 0);

    cardVal = suit.cards.splice(Math.floor(Math.random() * suit.cards.length), 1)[0];
    decks[sessionId].currentHandSum += Number.isInteger(cardVal) ? parseInt(cardVal) : handleFace(cardVal, currentHandSum);
    decks[sessionId].cardCount--;

    const bustOrBlackJack = handleBJB(decks[sessionId].currentHandSum);

    res.status(200).json(new DrawCardDTO(
        cardSuits[deck.indexOf(suit)],
        cardVal,
        decks[sessionId].cardCount,
        decks[sessionId].currentHandSum,
        decks[sessionId].currentDealerHandSum,
        bustOrBlackJack
    ));
}));


router.get("/dealer/draw/:sessionId", (req, res) => {
    const { sessionId } = req.params;

    if (!decks[sessionId]) {
        console.log(`Initializing new deck with session: ${sessionId}`);
        initDeck(sessionId);
    }

    const { deck, currentHandSum, currentDealerHandSum, cardCount } = decks[sessionId];

    if (cardCount < 5)
        return res.status(400).json(
        {   
            msg: "Penetration level reached",
            status: 2
        })

    let suit, tempSum = 0;
    let hand = []
    do{
        do suit = deck[Math.floor(Math.random() * deck.length)]
        while (suit.cards.length === 0)
        let cardVal = suit.cards.splice(Math.floor(Math.random() * suit.cards.length), 1)[0]
        tempSum += Number.isInteger(cardVal) ? parseInt(cardVal) : handleFace(cardVal, tempSum)
        decks[sessionId].cardCount--;
        hand.push({
            suit: cardSuits[deck.indexOf(suit)],
            card: cardVal
        })
    }while(tempSum<17)
    
    decks[sessionId].currentDealerHandSum = tempSum
    res.status(200).json(new DealerCardDTO(
        hand,
        cardCount,
        tempSum,
        tempSum > 21 ? "bust" : null
    ))
})

router.get("/check", (req, res) => {
    res.status(200).json({ "deck": deck })
})

function handleBJB(sum) {
    if (sum > 21)
        return "bu"

    if (sum === 21)
        return "bj"

    return null
}

function handleState(sum, dealerSum) {
    if (dealerSum > 21)
        return "v"

    if (sum > dealerSum)
        return "v"

    if (sum === dealerSum)
        return "d"

    return "l"
}

function handleFace(face, sum) {
    if (face !== "A")
        return 10
    return sum + 11 <= 21 ? 11 : 1
}

function initDeck(sessionId) {
    decks[sessionId] = {
        deck: initCards(),
        cardCount: 54,
        currentHandSum: 0,
        currentDealerHandSum: 0
    }
}
function initCards() {
    return [
        { suit: "hearts", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },
        { suit: "diamonds", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },
        { suit: "clubs", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },
        { suit: "spades", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] }
    ];
}
var cardSuits = [
    "♥",
    "♦",
    "♣",
    "♠"
]

export default router