import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

function  dbConnection(){
    mongoose.connect(CONNECTION_STRING);
    mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
}

export default dbConnection;