import mongoose from "mongoose";

const calculateExpiry = () => {
    const now = new Date()
    now.setHours(now.getHours() + 24)
    return now
}

const userSessionSchema = new mongoose.Schema({
    uid:{
        type:String,
        require:true
    },
    session:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    expiresAt:{
        type:Date,
        default: calculateExpiry
    }
})

const UserSession = mongoose.model("UserSession", userSessionSchema)

export default UserSession