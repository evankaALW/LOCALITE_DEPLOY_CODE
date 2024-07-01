//ROUTER CODE TO HANDLE THE REQUESTS RELATED TO THE transactionTable
//POST request /newTransaction/:id
//GET REQUEST /getTransactionDetails/:id AND /getTransactionDetails
const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postTransactionDetails = require('../controllers/postTransactionController');
const getTransactionDetails = require('../controllers/getTransactionController');
const transactionTableRouter= express.Router();

transactionTableRouter.post('/newTransaction/:id',postTransactionDetails.postTransactionData);
transactionTableRouter.get('/getTransactionDetails/:id',getTransactionDetails.transactionData);
transactionTableRouter.get('/getTransactionDetails',getTransactionDetails.transactionData);


transactionTableRouter.use(errorHandler);

module.exports=transactionTableRouter;

