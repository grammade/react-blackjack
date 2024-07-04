import express  from "express";
import User from "../models/user.js";
import asyncHandler from "../utils/AsyncHandler.js";

const router = express.Router()

async function findUser(req, res){
    const {username} = req.body
    const user = await User.findOne({username})
    
    if(!user)
        throw Object.assign(new Error('User not found'), { status: 404 });
    return user
}

router.post("/set", asyncHandler(async (req, res) =>{
    let user = await findUser(req, res);
    //update to mongo
    let dto = {...req.body}
    if(dto.state === "win")
        user.win++
    else
        user.loss++
    
    await user.save()
    return res.status(200).json(user)
}))

router.post("/", asyncHandler(async (req, res) => {
    const {username} = req.body
    const existingUser = await User.findOne({username})
    
    if(existingUser)
        return res.status(400).json({msg: `user ${username} already exists`})
    
    const newUser = new User({username})
    await newUser.save()
    console.log(`user ${username} is created`)
    
    return res.status(201).json(newUser)
}))

router.get("/", asyncHandler(async(req,res) =>{
    const users = await User.find()
    return res.json(users)
}))

export default router