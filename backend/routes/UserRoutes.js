import express from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { v6 as uuidv6 } from "uuid"

const router = express.Router()
const generateSession = () => uuidv6()

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

router.get("/check", asyncHandler(async (req, res) => {
    const {uid, username} = req.params
    const user = await User.findOne({uid, username})
    if(!user)
        res.status(404).json("user not found")
    res.status(200).json(user)
}))

router.post("/add", asyncHandler(async (req, res) => {
    const isUserExists = await findUser(req, res);
    if(isUserExists)
        return res.json(400).json("user already exists")
    
    const {uid, username} = req.body
    const newUser = new User({
        uid: uid,
        username: username
    })
    await newUser.save()
    return res.status(200).json(newUser)
}))

async function findUser(req, res) {
    const { uid } = req.body
    const user = await User.findOne({ uid })

    if (!user)
        throw Object.assign(new Error('User not found'), { status: 404 });
    return user
}

export default router