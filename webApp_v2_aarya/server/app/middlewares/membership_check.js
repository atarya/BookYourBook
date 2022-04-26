const Membership = require('../models/Membership');

const membership_check = async (req, res, next) => {
    const membership = await Membership.findOne({ user: req.user._id })
    try {
        if (!membership || membership.expiry_date < Date.now()) {
            return res.status(401).json({
                message: "Membership Expired"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: "Error occured",
            error: error
        });
    }
}

module.exports = { membership_check };