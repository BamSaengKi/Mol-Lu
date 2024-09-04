var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

/* GET users listing. */
router.get(
    "/",
    function (req, res, next) {
        const query = req.query.q;
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("DB");
                throw err;
            }
            const sql = `
        SELECT 
            name,
            customerID,
            customerPassword
        FROM
            tbCustomer tbc
        WHERE
            tbc.name LIKE ?
        OR
            tbc.customerID LIKE ? ;
      `;
            conn.query(sql, [`%${query}`, `%${query}`], (err, results) => {
                if (!err) {
                    console.log(query);
                    console.log(results);
                    conn.release();
                    req.results = results;
                    next();
                } else {
                    console.log("HERE");
                    return err;
                }
            });
        });
    },
    (req, res) => {
        console.log("next");
        res.send(req.results);
    }
);

module.exports = router;
