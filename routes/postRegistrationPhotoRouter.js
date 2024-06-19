const multer = require('multer');
const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const { uploadRegistrationPhoto } = require('../controllers/postRegistrationPhotoController');
const postPhotoRouter = express.Router();

const upload = multer({ dest: 'uploads/' });//folder path in s3 bucket file server 

postPhotoRouter.use(errorHandler);
postPhotoRouter.post('/uploadRegistrationPhoto', uploadRegistrationPhoto);

app.post('/upload', upload.single('photo'), uploadRegistrationPhoto);

module.exports = postPhotoRouter;
