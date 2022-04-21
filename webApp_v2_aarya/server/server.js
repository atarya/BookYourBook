const express = require('express');
const dbConnection = require('./config/mongoAtlas');
const colors = require('colors');
const app = express();
require('dotenv').config({ path: "../.env" });
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const userRoutes = require('./app/routes/userRoutes');

dbConnection(MONGO_URI);

// app.get("/", (req, res) => { res.json({ message: "Test" }) });

app.use('/user', userRoutes);

app.listen(PORT, () => { console.log(` 📟 Server started at host:${PORT} `.yellow.bgCyan.bold) });