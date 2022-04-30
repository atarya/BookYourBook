const Membership = require('../models/Membership');

const exclusive = async (req, res, next) => {
    try {
        const membership = await Membership.findOne({ user: req.user._id }).catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
        if (!membership || membership.expiry_date < Date.now()) {
            return res.status(401).json({
                message: "Membership Expired"
            });
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occured",
            error: error
        });
    }
}

module.exports = { exclusive };