import express from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { DrawCardDTO, DealerCardDTO } from "../dtos/card.js"

const router = express.Router()
const decks = {}
router.get("/draw/", asyncHandler(async (req, res) => {
    const { uid, sessionId } = req.query; 

    if (!decks[sessionId]) {
        console.log(`Initializing new deck with session: ${sessionId}`);
        initDeck(sessionId);
    }

    const { deck, currentHandSum, currentDealerHandSum, cardCount } = decks[sessionId];
    //we can do better
    if (!deck.some(suit => suit.cards.length > 0)) {
        console.log("deck is fully empty")
        return res.status(200).json(new DrawCardDTO(
            null,
            null,
            0,
            decks[sessionId].currentHandSum,
            decks[sessionId].currentDealerHandSum,
            null
        ));
    }

    let suit, cardVal;
    do suit = deck[Math.floor(Math.random() * deck.length)];
    while (suit.cards.length === 0);

    cardVal = suit.cards.splice(Math.floor(Math.random() * suit.cards.length), 1)[0];
    decks[sessionId].currentHandSum += Number.isInteger(cardVal) ? parseInt(cardVal) : handleFace(cardVal, currentHandSum);
    decks[sessionId].cardCount--;
    
    const bustOrBlackJack = handleBJB(decks[sessionId].currentHandSum);
    if (bustOrBlackJack) {
        decks[sessionId].state = "end"
        const user = await User.findOne({ uid })
        if (user) {
            if (bustOrBlackJack === "bj")
                user.win++
            else if (bustOrBlackJack === "bu")
                user.loss++

            await user.save()
        }
    }

    res.status(200).json(new DrawCardDTO(
        cardSuits[deck.indexOf(suit)],
        cardVal,
        decks[sessionId].cardCount,
        decks[sessionId].currentHandSum,
        "?",
        bustOrBlackJack
    ))
}))

router.post('/reset/hand', (req, res) => {
    const { sessionId } = req.body
    console.log(`reseting hand for ${sessionId}`)
    reset(decks[sessionId])
    console.log(`hand reset`)
    return res.status(200).json({msg: "hand reset"})
})

router.post('/reset/deck', (req, res) => {
    const { sessionId } = req.body
    console.log(`reseting deck for ${sessionId}`)

    decks[sessionId].deck = initCards()
    decks[sessionId].cardCount = 54
    decks[sessionId].state = "game"
    return res.status(200).json(decks[sessionId])
})


router.get("/dealer/draw/:sessionId", (req, res) => {
    const { sessionId } = req.params;
    if (!sessionId) {
        return res.status(400).json("invalid session")
    }

    if (!decks[sessionId]) {
        console.log(`Initializing new deck with session: ${sessionId}`);
        initDeck(sessionId);
    }

    const { deck, currentHandSum, currentDealerHandSum, cardCount } = decks[sessionId];

    if (cardCount < 5)
        return res.status(200).json(new DealerCardDTO(
            null,
            cardCount,
            currentDealerHandSum,
            currentDealerHandSum > 21 ? "bust" : null
        ))

    let suit, tempSum = 0;
    let hand = []
    do {
        do suit = deck[Math.floor(Math.random() * deck.length)]
        while (suit.cards.length === 0)
        let cardVal = suit.cards.splice(Math.floor(Math.random() * suit.cards.length), 1)[0]
        tempSum += Number.isInteger(cardVal) ? parseInt(cardVal) : handleFace(cardVal, tempSum)
        decks[sessionId].cardCount--;
        hand.push({
            suit: cardSuits[deck.indexOf(suit)],
            card: cardVal
        })
    } while (tempSum < 17)
    
    decks[sessionId].currentDealerHandSum = tempSum
    decks[sessionId].dealerHand = hand.map(card => ({...card}))
    hand[hand.length - 1].suit = null
    hand[hand.length - 1].card = null
    res.status(200).json(new DealerCardDTO(
        hand,
        cardCount
    ))
})

router.get("/dealer/hole/:sessionId", asyncHandler(async(req, res) => {
    const {sessionId} = req.params
    const { dealerHand, currentDealerHandSum, cardCount, state } = decks[sessionId];
    if(!dealerHand)
        return res.status(404).send("deck not found")
    
    if(state !== "end")
        return res.status(403).send("forbiden")
    
    reset(decks[sessionId])
    return res.status(200).json(new DealerCardDTO(
        dealerHand,
        cardCount,
        currentDealerHandSum,
        currentDealerHandSum > 21 ? "bust" : null
    ))
}))

router.post("/stand", asyncHandler(async (req, res) => {
    const { sessionId, uid } = req.body
    if (!sessionId) {
        return res.status(400).json("invalid session")
    }

    const { deck, currentHandSum, currentDealerHandSum, cardCount } = decks[sessionId];
    const result = handleState(currentHandSum, currentDealerHandSum)
    decks[sessionId].state = "end"
    if (uid.startsWith("guest")) {
        return res.status(200).json({
            state: result
        })
    }

    const user = await User.findOne({ uid })
        .catch((e) => res.status(404).json("user not found"))
    if (!user)
        return res.status(404).json("user not found")

    switch (result) {
        case "v":
            user.win++
            break;
        case "l":
            user.loss++
            break;
        default:
            break;
    }
    await user.save()
    return res.status(200).json(result)
}))

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

function reset(deck) {
    if(deck){
        deck.currentHandSum = 0
        deck.currentDealerHandSum = 0
    }
}

function initDeck(sessionId) {
    decks[sessionId] = {
        deck: initCards(),
        dealerHand: [],
        cardCount: 54,
        currentHandSum: 0,
        currentDealerHandSum: 0,
        state: "game"
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