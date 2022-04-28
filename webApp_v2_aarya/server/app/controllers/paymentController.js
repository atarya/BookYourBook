const Razorpay = require('razorpay');
require('dotenv').config({ path: "../../../.env" });
const { KEY_ID, KEY_SECRET } = process.env;
const uniqId = require('uniqid');
const Formidable = require('formidable');
const { createHmac } = require('crypto');
let orderId;

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
            orderId = order.id;
            res.status(200).json({ message: "Order Created", order: order });
        }
    })

}

const paymentCallback = async (req, res) => {
    const form = Formidable();
    form.parse(req, (err, fields, files) => {
        // console.log(fields);
        if (fields) {
            const hash = createHmac("sha256", KEY_SECRET)
                .update(orderId + "|" + fields.razorpay_payment_id)
                .digest("hex");
            console.log("HASH", hash);
        }
    })
}

module.exports = { createOrder, paymentCallback }