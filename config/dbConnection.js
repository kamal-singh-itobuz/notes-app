import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const dbConnection = async() => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log('DB connected');
    } catch (error) {
        console.log(error, 'DB is not connected');
    }
}

export default dbConnection;