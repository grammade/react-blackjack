import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dateFormat from 'dateformat';
import swaggerUi from 'swagger-ui-express';

import connectDb from "./config/db.js"
import userRoute from "./routes/UserRoutes.js"
import cardRoute from "./routes/CardRoutes.js"
import highscoreRoute from "./routes/HighscoreRoutes.js"
import swagger_output from './swagger_output.json' assert {type: "json"}

import { errorHandler } from './utils/ErrorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
// app.use('/', swaggerUi.serve, swaggerUi.setup(swagger_output))

morgan.token('mydate', function () {
    return dateFormat(new Date(), 'HH:MM:ss');
});
app.use(morgan('[:mydate] :method :url :status :res[content-length] - :remote-addr - :response-time ms'));

// Routes
app.use(["/user", "/users"], userRoute);
app.use(["/card", "/cards"], cardRoute);
app.use(["/highscore"], highscoreRoute);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})


app.use(errorHandler);