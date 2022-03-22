// Loads the configuration from config.env to process.env
require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
// get MongoDB driver connection
const dbo = require('./config/mongo');

const PORT = process.env.PORT || 4321;
const app = express();

app.use(cors());
app.use(express.json());

// Global error handling
app.use(function (err, _req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use("/user", require('./app/routes/user'))

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    // start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});