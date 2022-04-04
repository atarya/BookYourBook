// mongoDB
require('./config/db');

const app = require('express')();

const PORT = 3000;


const UserRouter = require('./api/User');

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user', UserRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

