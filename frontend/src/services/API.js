import axios from "axios"

const host = "http://localhost:5000"

export const testAPI = async () =>{
    try{
        const res = await axios.get(`${host}/api/test`)
        console.log(`response: ${JSON.stringify(res.data, null, 2)}`)
        return res.data
    }catch(e){
        console.error(e)
        throw e
    } 
}