import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send("Server is running!");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})