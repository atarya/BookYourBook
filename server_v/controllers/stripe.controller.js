// module.exports.createConnectAccount = async (req, res) => {
//     console.log('REQUEST USR FROM SIGNIN MIDDLEWARE', req.user);
//     console.log("YOU HIT CREATE CONNECT ACCOUNT ENDPOINT");
// }

const User = require("../models/user");
const Stripe = require("stripe");
const queryString = require("query-string");

const stripe = Stripe(process.env.STRIPE_SECRET);

module.exports.createConnectAccount = async (req, res) => {
    // find user from db
    const user = await User.findById(req.user._id).exec();
    console.log("USER ==> ", user);
    // if user don't have stripe_account_id yet, create now
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
            type: 'standard',
        });

        console.log("ACCOUNT ===> ", account);
        user.stripe_account_id = account.id;
        user.save();
    }
    // create login link based on account id (for FE to complete the onboarding )
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding'
    })
    // autofill any info such as email
    accountLink = Object.assign(accountLink, {
        'stripe_user[email]': user.email,
    });
    // console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log('LOGIN LINK', link);
    res.send(link);
};