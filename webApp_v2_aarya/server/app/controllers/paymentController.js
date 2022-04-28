const Razorpay = require('razorpay');
require('dotenv').config({ path: "../../../.env" });
const { KEY_ID, KEY_SECRET } = process.env;
const uniqId = require('uniqid');
const Formidable = require('formidable');
const { createHmac } = require('crypto');
const Membership = require('../models/Membership');
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
    try {
        const form = Formidable();
        form.parse(req, async (err, fields, files) => {
            // console.log(fields);
            if (fields) {
                const hash = createHmac("sha256", KEY_SECRET)
                    .update(orderId + "|" + fields.razorpay_payment_id)
                    .digest("hex");
                // console.log("HASH", hash);
                if (hash === fields.razorpay_signature) {
                    const membership = await Membership.findOne({ user: req.user._id });
                    const threshhold = await new Date(new Date().setDate(new Date().getDate() + 7))
                    if (membership.expiry_date < threshhold) {
                        membership.expiry_date < new Date() ?
                            membership.expiry_date = await new Date(new Date().setDate(new Date().getDate() + 365))
                            : membership.expiry_date = await new Date(membership.expiry_date.setDate(new Date().getDate() + 365))

                        const info = {
                            paymentId: fields.razorpay_payment_id,
                            orderId: fields.razorpay_order_id
                        }

                        membership.transaction_details.push(info);
                        //TODO: need to separate the membership update function and put it under a verification function which will be called everytime the client side payment page is loaded, it will check 2 things, transaction success? && transaction date then update expiry_date
                        await membership.save();
                        res.json(membership);
                    }
                }
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getPayment = async (req, res) => {
    await Membership.find({ user: req.user._id })
}

module.exports = { createOrder, paymentCallback, getPayment }