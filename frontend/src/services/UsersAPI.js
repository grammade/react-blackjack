import axios from "axios";
import {v6 as uuidv6} from "uuid"

const host = process.env.REACT_APP_HOST

const getSession = async (uid) => {
    try{
        const res = await axios.get(`${host}/user/session`,{
            params:{uid}
        })
        return {
            uid: res.data.uid,
            session: res.data.session
        }
    }catch(e){
        console.log(e)
    }
}

export {getSession}