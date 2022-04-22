const express = require('express');
const dbConnection = require('./config/mongoAtlas');
const passport = require('passport');
const bodyParser = require('body-parser');
const colors = require('colors');
const app = express();
require('dotenv').config({ path: "../.env" });
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const userRoutes = require('./app/routes/userRoutes');
require("./app/middlewares/auth")

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

dbConnection(MONGO_URI);

// app.get("/", (req, res) => { res.json({ message: "Test" }) });

app.use('/user', userRoutes);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(PORT, () => { console.log(` 📟 Server started at host:${PORT} `.yellow.bgCyan.bold) });