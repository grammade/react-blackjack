import express from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { v6 as uuidv6 } from "uuid"

const router = express.Router()
const generateSession = () => uuidv6()

//generate session
router.get("/session", asyncHandler(async (req, res) => {
    const { uid } = req.query
    const session = generateSession()
    const userSession = new UserSession({ uid, session })
    console.log(req.query)

    await userSession.save().catch((e) => {
        return res.status(500).send("Failed to create a session")
    })

    return res.status(200).send(JSON.stringify(userSession))
}))

router.delete("/session/:session", asyncHandler(async (req, res) => {
    const { session } = req.params
    const userSession = await UserSession.findOneAndDelete({ session })

    if (!userSession)
        return res.status(404).send("Session not found");

    return res.status(200).send("Session deleted");
}))

//add user to db if not exists, return one if already exists
router.post("/add", asyncHandler(async (req, res) => {
    const {uid, username} = req.body
    console.log("checking user")
    console.log(req.body)
    const isUserExists = await findUser(uid);
    if(isUserExists)
        return res.status(200).json(isUserExists)
    
    console.log("adding new user")
    const newUser = new User({
        uid: uid,
        username: username,
        win: 0,
        loss: 0
    })
    await newUser.save()
    return res.status(200).json(newUser)
}))

router.get("/wl", asyncHandler(async(req, res) =>{
    const {uid} = req.query
    const isUserExists = await findUser(uid)
    if(isUserExists)
        return res.status(200).json(isUserExists)
    else
        return res.status(404).send("user not found")
}))

async function findUser(uid) {
    const user = await User.findOne({ uid })

    if (!user)
        return null
    console.log("user exists")
    return user
}

export default router