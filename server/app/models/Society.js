const mongoose = require("mongoose");

const society = mongoose.Schema(
    {
        // society_id: unique > required > ObjectId > random / auto
        // society_name: string > required > "society name"
        society_name: { type: String, required: true },
        // society_address: array > [PIN Code, City, address line detailed]
        society_address:
            [{
                pin: { type: String, required: true },
                city: { type: String, required: true },
                address: { type: String, required: true }
            }],
        // society_cordinates: array > [latitude, longitude]
        society_cordinates: [{
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        }]
    },
    { timestamps: true }
);

const Society = mongoose.model("Society", society);

module.exports = Society;