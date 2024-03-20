import usersModel from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('All fields are mandatory');
        }
        const userAvailabe = await usersModel.find({ email });
        
        if (userAvailabe) {
            res.status(400);
            throw new Error('User already Exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usersModel({ name, email, password: hashedPassword });
        await user.save();
        if (user) res.status(201).json({ message: "User Created", name, email });
        else {
            res.status(400);
            throw new Error('User details is not valid!!!');
        }
    } catch (error) {
        res.status(404).json({ error: 404, message: "Route not found." });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404);
            throw new Error('All fields are mandatory');
        }
        const user = await usersModel.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('You have to register first');
        }
        const comparePasswords = await bcrypt.compare(password, user.password);
        if (comparePasswords) {
            const accessToken = jwt.sign({
                id: user._id
            }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '120m' });
            res.status(200).json({ accessToken: accessToken });
        }
        else {
            res.status(400);
            throw new Error('Email or Password is wrong');
        }

    } catch (error) {
        res.status(404).json({ error: 404, message: "Route not found." });
    }
}
const currentUserController = async (req, res) => {
    try {
        res.json({LoggedInUserId: req.id});
    } catch (error) {
        res.status(404).json({ error: 404, message: "Route not found." });
    }
}

export { registerController, loginController, currentUserController };