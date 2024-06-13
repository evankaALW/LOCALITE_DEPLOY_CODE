const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postActivityDetails = require('../controllers/postActivityController');
const postActivityRouter = express.Router();


postActivityRouter.post('/addActivityDetails',postActivityDetails.postActivityData);
postActivityRouter.use(errorHandler);

module.exports=postActivityRouter;
