 const connection = require('../config/db'); // Assuming you have a database configuration file
 const SECRET_KEY = "loginSuccessfulStreeS";//add in .env file

 const postRegistrationData ={
     postRegistration: async (req, res,next) => {
     var brandID, theatreID;
     const { userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, pinCode, languageSpoken, loginPIN, brand, city, theatre, pinCodesForAllocation
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

     else{
       if(brandID){
         console.log("brandID : ",brandID)
         console.log("req", req.body)
         const queryTwo = `INSERT INTO userTable ( id, userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, city, pinCode, languageSpoken, loginPIN, brandID, theatreID, dateTime, isDeleted, createdAt, updatedAt )
     VALUES ( null, '${userName}', '${dateOfBirth}', ${phoneNumber}, '${emailID}', '${photo}', ${cardID}, '${address}', '${city}', ${pinCode}, '${languageSpoken}', '${loginPIN}', ${brandID}, 1, CONVERT_TZ(NOW(), '+00:00', '+05:30'), false, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

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


