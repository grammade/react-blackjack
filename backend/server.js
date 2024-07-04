import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDb from "./config/db.js"
import userRoute from "./routes/UserRoutes.js"
import {errorHandler} from './utils/ErrorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

// Routes
app.use(["/user", "/users"], userRoute);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})

app.use(errorHandler);