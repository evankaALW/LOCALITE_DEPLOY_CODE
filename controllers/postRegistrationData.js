 const connection = require('../config/db'); // Assuming you have a database configuration file
 const SECRET_KEY = "loginSuccessfulStreeS";//add in .env file
//post request to enter user details into userTable after submitting the data in the registration form
 const postRegistrationData ={
     postRegistration: async (req, res,next) => {
     var brandID, theatreID;
     const { userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, pinCode, languageSpoken, loginPIN, activate, brand, city, theatre, pinCodesForAllocation
   } = req.body;

   try {
     const queryOne = `SELECT id from brandTable WHERE brandName = '${brand}'`;
     const [brandIDJSON] = await connection.query(queryOne);
     brandID = brandIDJSON[0].id;
     console.log(brandID)
     let dupeIndicator = 0;

     const queryTwo = `SELECT * FROM userTable WHERE userName = '${userName}' OR emailID = '${emailID}' OR phoneNumber = ${phoneNumber};`
     const resultTwo = await connection.query(queryTwo);
     console.log(resultTwo[0])
     if(resultTwo[0][0])
       {
         return res.status(409).json({ error: "Cannot enter duplicate entry of User name , Phone Number or Email ID" });
       }

     else{//commented the code for uploading the photo to the AWS S3 bucket since creedentials are not ready
       // let photoUrl = '';
       // if (photo) {
       //    // Read the file from the temporary location
       //    const fileContent = fs.readFileSync(photo.path);

       //    // Set up the parameters for the S3 upload
       //    const params = {
       //      Bucket: process.env.S3_BUCKET_NAME,
       //      Key: `${Date.now()}_${photo.originalname}`, // File name you want to save as in S3
       //      Body: fileContent,
       //      ContentType: photo.mimetype,
       //      ACL: 'public-read', // Optional: make the file publicly readable
       //    };

       //    // Upload the file to S3
       //    const data = await s3.upload(params).promise();
       //    photoUrl = data.Location;

       //    // Clean up the uploaded file from the local storage
       //    fs.unlinkSync(photo.path);
       //  }
       if(brandID){
             // Make the GET request to the external API
             const theatreDataResponse = await axios.get('http://62.72.59.146:3005/theatredata');
             const theatreData = theatreDataResponse.data; 
            // Iterate through the theatre data and compare pin codes
            for (let i = 0; i < theatreData.length; i++) {
              const theatre = theatreData[i];
              if (theatre.theatrePinCode == pinCode) {
                theatreID = theatre.theatreId;
                break; // Break the loop once a match is found
              }
            }
            console.log(theatreID);
         console.log("brandID : ",brandID)
         console.log("req", req.body)
         const queryTwo = `INSERT INTO userTable ( id, userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, city, pinCode, languageSpoken, loginPIN, brandID, theatreID, dateTime, isDeleted, activate, createdAt, updatedAt )
     VALUES ( null, '${userName}', '${dateOfBirth}', ${phoneNumber}, '${emailID}', '${photo}', ${cardID}, '${address}', '${city}', ${pinCode}, '${languageSpoken}', '${loginPIN}', ${brandID}, ${theatreID}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), false, ${activate}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

     const [result, metadata ]= await connection.query(queryTwo);
     const userId = result;
     console.log(result,"result")
     if(userId){
       const queryThree = `insert into walletTable (id, userID, value, dateAdded, updatedDateTime, createdAt, updatedAt) VALUES ( NULL, ${userId}, 0, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

       const resultThree = await connection.query(queryThree);
         if(resultThree)
         {
             res.status(200).json({ message:"Registration successful"});
        }
       }
       }
     }
   } catch (error) {
     console.error(error);
     next(error);
   }}};

   module.exports = postRegistrationData;


