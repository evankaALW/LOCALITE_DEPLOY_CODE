const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Assuming you have a database configuration file
const userTable = require('../models/userTable');
const SHA256 = require( "crypto-js/sha256" );
//POST request that checks if user exists using cardID and hashed loginPIN

const postLoginData ={
    postLogin: async (req, res,next) => {
  const { cardID, loginPIN } = req.body;
  try {
    const hashedLoginPIN = SHA256(loginPIN).toString();//decrypts hashed loginPIN
     const query = `SELECT * FROM userTable WHERE cardID = ${cardID} AND loginPIN = '${hashedLoginPIN}'`;

    const result = await connection.query(query);
    if(result){
          return res.status(200).json({ "result":`{${JSON.stringify(result)}}` });//user data sent if exists in the userTable
    }
    else {
      return res.status(404).json({ message: 'Login data not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  }};
  module.exports = postLoginData;
