var express = require("express");
var router = express.Router();
const pool = require("../config/DbConfig");

// 장바구니 조회
router.get("/", (req, res, next) => {
    const body = req.body;
    const basketID = body.basketID;
    const sql = `
    SELECT 
        basketID, cutomerID, basketTime
    FROM 
        mollu.tbBasket
    WHERE 
        basketID=?;
    `;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log("err");
            throw err;
        }

        conn.query(sql, [basketID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS");
                console.log(body);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL");
                throw err2;
            }
        });
    });
});

// 장바구니 도서 등록 (나중에... 회원가입할 떄 함께 생성되도록....)
router.post("/", (req, res, next) => {
    const body = req.body;
    const customerID = body.customerID;
    const sql = `
        INSERT INTO 
            mollu.tbBasket
            (customerID)
        VALUES
            (?);

    `;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [customerID], (err2, resutls) => {
            if (!err2) {
                console.log("SUCCESS", customerID);
                console.log(body);
                console.log(resutls);
                conn.release();
                res.send(resutls);
            } else {
                console.log("FAIL", err2);
                throw err2;
            }
        });
    });
});
router.delete("/", (req, res) => {
    const body = req.body;
    const customerID = body.customerID;
    const basketID = body.basketID;
    const sql = `
    DELETE FROM
        mollu.tbBasket
    WHERE
        customerID = ?`;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [customerID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", customerID);
                console.log(body);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAil", body, results);
                throw err2;
            }
        });
    });
});

module.exports = router;
