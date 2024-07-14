import axios from "axios";
import { v6 as uuidv6 } from "uuid"

const host = process.env.REACT_APP_HOST

const getSession = async (uid) => {
    try {
        const res = await axios.get(`${host}/user/session`, {
            params: { uid }
        })
        return {
            uid: res.data.uid,
            session: res.data.session
        }
    } catch (e) {
        console.log(e)
    }
}
const deleteSession = async (session) => {
    try {
        const res = await axios.get(`${host}/user/session/${session}`)

        return {
            msg: res.data
        }
    } catch (e) {
        console.log(e)
    }
}
const checkUserSession = async (uid, username) => {
    try {
        const res = await axios.get(`${host}/user/check`, {
            params: { uid, username }
        })
        if (res.status !== 200)
            return null
        return res.data
    } catch (e) {
        console.log(e)
    }
}
const addUser = async (uid, username) => {
    try {
        const res = await axios.post(`${host}/user/add`, {
            data: { uid, username }
        })
        if (res.status !== 200)
            return null
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export {
    getSession,
    deleteSession,
    checkUserSession,
    addUser
}