import { configDotenv } from 'dotenv';
configDotenv({path: '../.env'});
import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js'


const connetDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log('Database connected')
    } catch (error) {
        console.log('Error in connecting DB: ', error.message)
        process.exit(1)
    }
}

export default connetDB