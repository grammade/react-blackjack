import axios from "axios"

const host = "http://localhost:5000"

export const drawCard = async () =>{
    try{
        const res = await axios.get(`${host}/card/draw`)
        return {
            suit: res.data.suit,
            value: res.data.card
        }
    }catch(e){
        console.error(e)
        throw e
    } 
}