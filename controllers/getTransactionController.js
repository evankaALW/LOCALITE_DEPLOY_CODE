const connection = require('../config/db');
//controller code to fetch the details from transactionTable, as per the GET request : /getTransactionDetails
const getTransactionDetails = {
    transactionData : async (req, res,next) => {
        try{
            let query = ``;
            const { id } = req.params;
            if(id){
                    query = `SELECT * FROM transactionTable WHERE userId=${id}`;
                    
            }
            else{
                    query = `SELECT * FROM transactionTable`;
            }
            const result = await connection.query(query);//connection of query to db using sequelize
            
            if(result)//if rows returned are more than 0
            {
                return res.status(200).json({transactionTable: result[0]})//stores first instance of results in the json which is returned in the response
            }
        }
        catch(error)
        {
            next(error); // Pass error to the next middleware       
        }
    }
};

module.exports = getTransactionDetails;
