const connection = require('../config/db');
//controller code to fetch the details from activityCashbackTable, as per the GET request : /getActivityCashback
const getActivityCashbackDetails = {
    getActivityCashbackData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM activityCashbackTable`;

            const result = await connection.query(query);//connection of query to db using sequelize
    
            if(result)//if rows returned are more than 0
            {
                return res.status(200).json({"activityCashbackTable": result[0]})//stores first instance of results in the json which is returned in the response
            }
        }
        catch(error)
        {
            next(error);
        }
    }
};

module.exports = getActivityCashbackDetails;
