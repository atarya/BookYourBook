var jwt = require("express-jwt");


// req.user
module.exports.requireSignin = jwt({
    // check for secrets and expiration of the token
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],


});

