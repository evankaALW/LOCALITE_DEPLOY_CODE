const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postRegistrationData = require('../controllers/postRegistrationData');
const postRegistrationRouter = express.Router();

postRegistrationRouter.post('/registerUser',postRegistrationData.postRegistration);
postRegistrationRouter.use(errorHandler);

module.exports=postRegistrationRouter;
