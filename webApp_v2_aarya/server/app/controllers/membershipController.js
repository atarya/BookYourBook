const Membership = require('../models/Membership');

const getMembership = async (req, res) => {
    try {
        const membership = await Membership.findOne({ user: req.user._id });
        res.json(membership);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateMembership = async (req, res) => {
    const membership = await Membership.findOne({ user: req.user._id });
    const threshhold = await new Date(new Date().setDate(new Date().getDate() + 7))
    try {
        if (membership.expiry_date < threshhold) {
            membership.expiry_date < new Date() ?
                membership.expiry_date = await new Date(new Date().setDate(new Date().getDate() + 365))
                : membership.expiry_date = await new Date(membership.expiry_date.setDate(new Date().getDate() + 365))

            await membership.save();
            res.json(membership);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { getMembership, updateMembership }