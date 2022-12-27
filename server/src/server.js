import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { connectDB } from './config/connectDB.js';
import { Url } from './models/url.model.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const baseUrl = process.env.BASE_URL;
const EXPIRES_IN = process.env.EXPIRES_IN;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/views/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/url', async (req, res) => {
    const { url } = req.body;
    try {
        let urlData = jwt.sign({ url }, SECRET_KEY, { expiresIn: EXPIRES_IN });
        let storedUrlData = new Url({ urlData });
        storedUrlData = await storedUrlData.save();
        res.send({ message: "URL shortened successfully!", url: `${baseUrl}/${storedUrlData?._id}` })
    }
    catch (error) {
        res.send({ message: "Something went wrong!", error })
    }
})

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const storedUrlData = await Url.findOne({ _id: id });
        const verifiedToken = jwt.verify(storedUrlData.urlData, SECRET_KEY);
        res.redirect(verifiedToken.url);
    }
    catch (error) {
        res.send({ message: "URL expired", error })
    }
})

connectDB().then(() => {
    console.log('Connected to database successfully.')
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
    })
})