// module.exports.createConnectAccount = async (req, res) => {
//     console.log('REQUEST USR FROM SIGNIN MIDDLEWARE', req.user);
//     console.log("YOU HIT CREATE CONNECT ACCOUNT ENDPOINT");
// }

const User = require("../models/user");
const Stripe = require("stripe");
const queryString = require("query-string");
const { response } = require("express");

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



// const updateDelayDays = async (accountId) => {
//     const account = await stripe.account.update(accountId, {
//         settings: {
//             payouts: {
//                 schedule: {
//                     delay_days: 7,
//                 }
//             }
//         }
//     });
//     return account;
// }


module.exports.getAccountStatus = async (req, res) => {
    // console.log("GET ACCOUNT STATUS");
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // console.log("USER ACCOUNT RETRIEVE", account);
    // const updatedAccount = await updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            stripe_seller: account,
        },
        { new: true }
    )
        .select("-password")
        .exec();
    console.log(updatedUser);
    res.json(updatedUser);
};


module.exports.getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        // console.log("BALANCE ===>", balance);
        res.json(balance);
    } catch (err) {
        console.log(err);
    }
}