import { configDotenv } from 'dotenv';
configDotenv({path: '../.env'});
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRouter from './routes/task.routes.js';

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/tasks', taskRouter);

app.use(express.static('public'))

export default app;