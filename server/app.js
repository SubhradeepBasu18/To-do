import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRouter from './routes/task.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')))

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/tasks', taskRouter);

// app.use(express.static('public'))

export default app;