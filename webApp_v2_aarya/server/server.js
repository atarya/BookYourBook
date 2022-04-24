const express = require('express');
const colors = require('colors');

const app = express();

require('dotenv').config({ path: "../.env" });
require("./app/middlewares/auth")

const dbConnection = require('./config/mongoAtlas');
const userRoutes = require('./app/routes/userRoutes');
const bookRoutes = require('./app/routes/bookRoutes');
const exchangeRoutes = require('./app/routes/exchangeRoutes');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json())
dbConnection(MONGO_URI);

// app.get("/", (req, res) => { res.json({ message: "Test" }) });

app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/exchange', exchangeRoutes);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(PORT, () => { console.log(` 📟 Server started at host:${PORT} `.yellow.bgCyan.bold) });