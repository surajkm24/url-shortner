import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/connectDB.js';

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Server is running!");
})

connectDB().then(() => {
    console.log('Connected to database successfully.')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    })
})