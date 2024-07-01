// controllers/getBrandDetailsController.js
const connection = require('../config/db');
//controller code to fetch the details from brandTable, as per the GET request : /getBrandDetails
const brandDetails =  {
    brandData : async (req, res,next) => {
    try {
        const query = `SELECT DISTINCT * FROM brandTable`;//query
        const results = await connection.query(query);//connection of query to db using sequelize

        if (results.length > 0) {//if rows returned are more than 0
            console.log(results);
            return res.status(200).json({ brandDetails: results[0] });//stores first instance of results in the json which is returned in the response
        } else {
            return res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        next(error);
    }
}
};

module.exports =  brandDetails ;
