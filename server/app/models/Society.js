const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
    society_name: { type: String },
    society_city: { type: String },
    coordinates: { type: String },
}, { timestamps: true });


const Society = mongoose.model('Society', societySchema);
module.exports = Society;