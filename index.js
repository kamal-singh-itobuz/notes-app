import express from "express";
import usersRoutes from './routes/usersRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import dbConnection from "./config/dbConnection.js";
import dotenv from 'dotenv';
dotenv.config();

dbConnection();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/notes', notesRoutes);

app.listen(PORT, () => console.log(`Server is listening on the port ${PORT}`));