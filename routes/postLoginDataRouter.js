//router to handle the /postLoginData POST request
const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');

const app = express();
const postLoginData = require('../controllers/postLoginData');
const postLoginDataRouter = express.Router();
postLoginDataRouter.post('/login', postLoginData.postLogin);

postLoginDataRouter.use(errorHandler);

module.exports=postLoginDataRouter;


