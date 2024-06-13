const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

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

const userTable = require('./models/userTable');
const activityTable = require('./models/activityCashbackTable')
const usertable = require('./models/userTable')
const walletTable = require('./models/walletTable')
const transactionTable = require('./models/transactionTable')
const theatreTable = require('./models/theatreTable');

const errorHandler = require('./middleware/errorHandlingMiddleware');

const app = express();
// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler); // Error handling middleware
// Routes
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

const PORT = process.env.PORT || 8012;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

