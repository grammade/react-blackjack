import axios from "axios";

const host = process.env.REACT_APP_HOST

const getHighscore = async() =>{
    try {
        const res = await axios.get(`${host}/highscore`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export {
    getHighscore
}