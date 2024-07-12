class DrawCardDTO{
    constructor(suit, card, deckCount, handSum, dealerHandSum, state){
        this.suit = suit
        this.card = card
        this.deckCount = deckCount
        this.handSum = handSum
        this.dealerHandSum = dealerHandSum
        this.state = state
    }
}

class DealerCardDTO{
    constructor(hand, deckCount, handSum, dealerHandSum, state){
        this.hand = hand
        this.deckCount = deckCount
        this.handSum = handSum
        this.state = state
    }
}

export default DrawCardDTO