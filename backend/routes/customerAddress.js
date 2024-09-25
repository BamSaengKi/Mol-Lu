var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 조회
router.get("/", (req, res, next) => {
    const body = req.body;
    const customerID = body.customerID;
    sql = `
    SELECT 
        ID, customerID
    FROM
        mollu.tbCustomerAddress
    WHERE
        customerID = ?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [customerID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, customerID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log(body);
                throw err2;
            }
        });
    });
});

// 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const customerID = body.customerID;
    const sql = `
    INSERT INTO
        mollu.tbCustomerAddress
        (customerID)
    VALUES
        (?)
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [customerID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, customerID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAUL", body);
                throw err2;
            }
        });
    });
});

// 삭제
router.delete("/", (req, res, next) => {
    const body = req.body;
    const customerID = body.customerID;
    const sql = `
    DELETE FROM
        mollu.tbCustomerAddress
    WHERE
        customerID=?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [customerID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, customerID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL", body);
                throw err2;
            }
        });
    });
});

module.exports = router;
