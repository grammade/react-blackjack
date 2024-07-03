const express = require("express")
const path = require("path")
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://sa:sa@react-blackjack.z4o8rh2.mongodb.net/highscore?retryWrites=true&w=majority&appName=react-blackjack';
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get("/api/test", (req, res) =>{
    res.json({msg: "api set"})
})

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("db connected");
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
        
    }).catch((error) =>{
        console.log(error);
    })
