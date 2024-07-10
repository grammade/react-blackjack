import express  from "express";
import User from "../models/user.js";
import UserSession from "../models/userSession.js";
import asyncHandler from "../utils/AsyncHandler.js";
import {v6 as uuidv6} from "uuid"

const router = express.Router()
const generateSession = () => uuidv6()

router.get("/session", asyncHandler(async (req, res) =>{
    const {uid} = req.query
    const session = generateSession()
    const userSession = new UserSession({uid, session})
    console.log(req.query)
    
    await userSession.save().catch((e) => {
        return res.status(500).send("Failed to create a session")
    })
    
    return res.status(200).send(JSON.stringify(userSession))
}))

async function findUser(req, res){
    const {uid} = req.body
    const user = await User.findOne({uid})
    
    if(!user)
        throw Object.assign(new Error('User not found'), { status: 404 });
    return user
}

router.post("/set", asyncHandler(async (req, res) =>{
    let user = await findUser(req, res);
    let dto = {...req.body}
    if(dto.state === "win")
        user.win++
    else
        user.loss++
    
    await user.save()
    return res.status(200).json(user)
}))

router.post("/", asyncHandler(async (req, res) => {
    const {uid} = req.body
    const existingUser = await User.findOne({uid})
    
    if(existingUser)
        return res.status(400).json({msg: `user ${uid} already exists`})
    
    const newUser = new User({uid})
    await newUser.save()
    console.log(`user ${uid} is created`)
    
    return res.status(201).json(newUser)
}))

router.get("/", asyncHandler(async(req,res) =>{
    const users = await User.find()
    return res.json(users)
}))

export default router