const mongoose = require("mongoose");

const dbConnection = async (MONGO_URI) => {
    try {
        const parameters = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        mongoose.connect(MONGO_URI, parameters)
            .then(console.log(" 📡 Connected to MongoDB Atlas ".yellow.bgGrey.bold))
            .catch((error) => console.log("Error connecting to MongoDB Atlas".red));

    } catch (error) {
        console.log(`Couldn't connect to DB ${error}`.red.bold);
    }
}

module.exports = dbConnection;