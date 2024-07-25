import axios from "axios"

const host = process.env.REACT_APP_HOST

const drawCard = async (uid, sessionId) => {
    try {
        const res = await axios.get(`${host}/card/draw/`, {
            params:{
                uid, sessionId
            }
        })
        console.log(res.data)

        return {
            suit: res.data.suit,
            value: res.data.card,
            deckCount: res.data.deckCount,
            handSum: res.data.handSum,
            dealerSum: res.data.dealerHandSum,
            state: res.data.state
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

const resetDeck = async (sessionId) => {
    try {
        const res = await axios.post(`${host}/card/reset/deck`, { sessionId })
        console.log(res.status)
    } catch (e) {
        console.error(e)
        throw e
    }
}

const resetHand = async (sessionId) => {
    try {
        const res = await axios.post(`${host}/card/reset/hand`, { sessionId })
        console.log(res.status)
    } catch (e) {
        console.error(e)
        throw e
    }
}

const drawCardDealer = async (sessionId) => {
    try {
        const res = await axios.get(`${host}/card/dealer/draw/${sessionId}`)
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

const drawHoleCardDealer = async (sessionId) => {
    try {
        const res = await axios.get(`${host}/card/dealer/hole/${sessionId}`)
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

const stand = async (uid, sessionId) => {
    try {
        const res = await axios.post(`${host}/card/stand/`, {
            uid,
            sessionId
        })
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export {
    drawCard,
    drawCardDealer,
    stand,
    resetDeck,
    resetHand,
    drawHoleCardDealer
}