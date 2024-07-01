const connection = require('../config/db');
// PUT request to change the activate value of userTable, 0 - false ( user is not permitted to login into the app ) ; 1 - true ( user is permitted to login into the app )
const updateActivateUser = {
    updateActivateToggle: async (req, res,next) => {
        try{
            const {activate} = req.body;
            const {id} = req.params;
            const selectQuery = `SELECT * FROM userTable WHERE id = ${id}`;
            const selectRes = await connection.query(selectQuery);

            if(selectRes[0][0].id>0)
                {
                     const updateQuery = `UPDATE userTable SET activate = ${activate} WHERE id = ${id}`;
                     const updateRes = await connection.query(updateQuery);
                     if(updateRes)
                        {
                            return res.status(200).json({"Message": `Update of user id ${id} is done with current status as ${activate}`});
                        }
                }
                else{
                    return res.status(404).json({ error: "Data not found" });
                }
        }
        catch(e){
            return res.status(500).json({"error":e});
        }
    }};

module.exports = updateActivateUser;

