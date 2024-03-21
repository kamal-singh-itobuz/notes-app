import mongoose from 'mongoose';
import validateEmail from '../helper/validateEmail.js';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid Email Address'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const usersModel = mongoose.model('users', userSchema);
export default usersModel;