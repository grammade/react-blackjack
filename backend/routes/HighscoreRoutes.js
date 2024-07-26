import express from "express";
import User from "../models/user.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { highScoreDTO } from "../dtos/user.js";

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const topUsers = await User
        .find()
        .sort({win: -1})
        .limit(10)
    const dto = topUsers.map((user) => {
        return new highScoreDTO(
            user.username,
            user.win,
            user.loss,
            parseFloat((user.win / user.loss).toFixed(2))
        )
    })
    return res.status(200).json(dto)
}))

export default router