const cors = require('cors');//library used to manage how resources on your web server are used by different users, domains or ports)
const express = require('express');//calling the expressjs library
const bodyParser = require('body-parser');//middleware module Node.js to parse incoming request bodies in a middleware before your handlers, making it easier to handle HTTP POST requests
require('dotenv').config();//to refer environment variables in our nodejs code ( db connection )
//routes from the routes folder are called here
const postLoginDataRouter = require('./routes/postLoginDataRouter');
const getUserDataRouter = require('./routes/getUserDataRouter');
const postRegistrationRouter = require('./routes/postRegistrationRouter')
const brandDetailsRouter = require('./routes/getBrandDetailsRoute');
const activityCashbackRouter = require('./routes/getCashbackActivitiesRouter')
const walletRouter = require('./routes/walletRouter')
const transactionTableRouter = require('./routes/transactionTableRouter')
const putLoginDataRouter = require('./routes/putLoginDataRouter');
const postActivityRouter = require('./routes/postActivityRouter');
const postOTPRouter = require('./routes/postOTPRegistrationRouter');
//tables from the models folder are called here 
const userTable = require('./models/userTable');
const activityTable = require('./models/activityCashbackTable')
const usertable = require('./models/userTable')
const walletTable = require('./models/walletTable')
const transactionTable = require('./models/transactionTable')
const theatreTable = require('./models/theatreTable');
//error handling middleware is called here
const errorHandler = require('./middleware/errorHandlingMiddleware');

const app = express();//app is an instance of an Express application. It is created by calling express(). It serves as the main application object where you define routes, middleware, and other settings for your Express application.
// App instances uses the above mentioned external libraries
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler); // Error handling middleware
// Routes are applied into the app here
app.use('',putLoginDataRouter);
app.use('',postLoginDataRouter);
app.use('',getUserDataRouter);
app.use('',postRegistrationRouter);
app.use('',brandDetailsRouter);
app.use('',activityCashbackRouter);
app.use('',walletRouter);
app.use('',transactionTableRouter);
app.use('',postActivityRouter);
app.use('',postOTPRouter);
//defines what port should the app instance run on
const PORT = process.env.PORT || 8012;
//code to execute what port our app instance runs on
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

