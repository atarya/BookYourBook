const mongoose = require("mongoose");

const society = mongoose.Schema(
    {
        // society_id: unique > required > ObjectId > random / auto
        // society_name: string > required > "society name"
        // society_address: array > [PIN Code, City, address line detailed]
        // society_cordinates: array > [latitude, longitude]
    },
    { timestamps: true }
);

const Society = mongoose.model("Society", society);

module.exports = Society;