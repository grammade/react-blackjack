import axios from "axios"

const host = process.env.REACT_APP_HOST

const drawCard = async(sessionId) =>{
    try{
        const res = await axios.get(`${host}/card/draw/${sessionId}`)
        console.log(res.data)
        return {
            suit: res.data.suit,
            value: res.data.card,
            deckCount: res.data.deckCount,
            handSum: res.data.handSum,
            dealerSum: res.data.dealerHandSum,
            state: res.data.state
        }
    }catch(e){
        console.error(e)
        throw e
    } 
}

const drawCardDealer = async(sessionId) => {
    try {
        const res = await axios.get(`${host}/card/dealer/draw/${sessionId}`)
        return res.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export {drawCard, drawCardDealer}