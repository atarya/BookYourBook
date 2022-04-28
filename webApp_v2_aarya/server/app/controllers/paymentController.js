const Razorpay = require('razorpay');
require('dotenv').config({ path: "../../../.env" });
const { KEY_ID, KEY_SECRET } = process.env;
const uniqId = require('uniqid');

var instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });

const createOrder = async (req, res) => {

    var options = {
        amount: 14999,
        currency: "INR",
        receipt: uniqId(),
    }
    instance.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        } else {
            console.log(order);
            res.status(200).json({ message: "Order Created", order: order });
        }
    })

}
module.exports = { createOrder }