// Loads the configuration from config.env to process.env
require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/mongo');
const PORT = process.env.PORT || 8080;
const app = express();

const chats = require('./data/chats');

dbConnection();

//middleware
app.use(cors());
app.use(express.json());

//Test route

app.get('/', (req, res) => {
    console.log('Server is running');
    res.send("Server is running");
});

app.get("/api/chats", (req, res) => {
    res.send(chats)
})

app.get("/api/chats/:id", (req, res) => {
    const id = req.params.id;
    const chat = chats.find(chat => chat._id === id);
    if (!chat) return res.status(404).send("Chat not found");
    res.send(chat);
    console.log(req)
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});