//ROUTER TO HANDLE THE REQUESTS RELATED TO THE walletTable
//PUT request: /updateWallet/:id
//GET request: /getWallet and /getWallet/:id
const express = require('express');
const updateWalletAfterGame = require('../controllers/putWalletGameController');
const getWalletDetails = require('../controllers/getWalletController');
const errorHandler = require('../middleware/errorHandlingMiddleware');

const walletRouter = express.Router();

walletRouter.put('/updateWallet/:id', updateWalletAfterGame.updateWalletData);
walletRouter.get('/getWallet/:id',getWalletDetails.getWalletData);
walletRouter.get('/getWallet',getWalletDetails.getWalletData);

walletRouter.use(errorHandler);

module.exports=walletRouter;
