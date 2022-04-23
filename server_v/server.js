const express = require('express');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8000;

// route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
// app.use("/api", router);


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})