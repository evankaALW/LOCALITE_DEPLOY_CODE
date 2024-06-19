// controller.js
const fs = require('fs');
const { s3 } = require('./config');

const uploadRegistrationPhoto = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read the file from the temporary location
  const fileContent = fs.readFileSync(file.path);

  // Set up the parameters for the S3 upload
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`, // File name you want to save as in S3
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: 'public-read', // Optional: make the file publicly readable
  };

  // Upload the file to S3
  s3.upload(params, (err, data) => {
    // Delete the file from the temporary location
    fs.unlinkSync(file.path);

    if (err) {
      console.error('Error uploading file to S3:', err);
      return res.status(500).send('Error uploading file.');
    }

    res.status(200).send(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = { uploadRegistrationPhoto };
