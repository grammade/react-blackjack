import express from "express";

const router = express.Router()

var deck = [
    { suit: "hearts",   cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },  // Values for one suit (e.g., hearts)
    { suit: "diamonds", cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },  // Values for another suit (e.g., diamonds)
    { suit: "clubs",    cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] },  // Values for another suit (e.g., clubs)
    { suit: "spades",   cards: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"] }   // Values for another suit (e.g., spades)
]
var deckCount = 54;

var cardSuits = [
    "♥",
    "♦",
    "♣",
    "♠"
]

router.get("/dealer/draw", (req, res) => {
    //hits until 17 or more, one card is hidden
})

router.get("/draw", (req, res) => {
    if(!deck.some(d => d.cards.length > 0))
        return res.status(400).json({msg: "deck is empty"})
    
    let suitIndex, suit, cardIndex, cardVal
    
    do {
        suitIndex = Math.floor(Math.random() * deck.length);
        suit = deck[suitIndex];
    } while (suit.cards.length === 0)

    cardIndex = Math.floor(Math.random() * deck[suitIndex].cards.length)
    cardVal = suit.cards[cardIndex]

    // suit.cards.splice(cardIndex, 1) 
    // deckCount--

    res.status(200).json({ suit: cardSuits[suitIndex], card: cardVal, deckCount: deckCount })
})

router.get("/check", (req, res) => {
    res.status(200).json({ "deck": deck })
})

export default router