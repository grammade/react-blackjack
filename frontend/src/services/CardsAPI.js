import axios from "axios"

const host = process.env.REACT_APP_HOST

export const drawCard = async(sessionId) =>{
    try{
        console.log(`drawing card session: `)
        console.log(sessionId)
        const res = await axios.get(`${host}/card/draw/${sessionId}`)
        console.log(`drawing card: `)
        console.log(res.data)
        return {
            suit: res.data.suit,
            value: res.data.card,
            deckCount: res.data.deckCount
        }
    }catch(e){
        console.error(e)
        throw e
    } 
}