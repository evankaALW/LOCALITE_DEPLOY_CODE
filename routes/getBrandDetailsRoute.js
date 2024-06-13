const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const brandDetails = require('../controllers/getBrandDetailsController');
const brandDetailsRouter = express.Router();

brandDetailsRouter.get('/getBrandDetails', brandDetails.brandData);//brandDetails
brandDetailsRouter.use(errorHandler);

module.exports=brandDetailsRouter;
