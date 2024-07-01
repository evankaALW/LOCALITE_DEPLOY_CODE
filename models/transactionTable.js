//id						

const {DataTypes} = require("sequelize")
const seque = require('../config/db')

//transactionTable - to store the transaction entries after the users have played the activity cashback game
const transactionTable = seque.define('transactionTable', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:DataTypes.INTEGER,
    },
    transactionDate:{
        type:DataTypes.DATE,
    },
    transactionAmount:{
        type:DataTypes.DOUBLE,
    },
    itemID:{
        type:DataTypes.INTEGER,
    },
    itemType:{
        type:DataTypes.STRING,
    },
    quantity:{
        type:DataTypes.INTEGER,
      },
      transactionStatus:{
        type:DataTypes.TEXT,
      }
},
{
  // options
  tableName: 'transactionTable' // specify the exact table name
});

seque.sync().then(() =>{
    console.log("transactionTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating transactionTable", error)
});


module.exports = transactionTable;
