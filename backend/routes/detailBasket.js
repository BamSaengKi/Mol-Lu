var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const basketID = body.basketID;
    const bookID = body.bookID;
    const bookSum = body.bookSum;
    const sql = `
        INSERT INTO
            mollu.tbDetailBasket
            (bookID, bookSum)
        VALUES
            (?,?)
    `;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [bookID, bookSum], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, basketID, bookID, bookSum);
                console.log(results);
                conn.release();
                res.send(results);
            }
        });
    });
});

router.get("/", (req, res, next) => {
    const body = req.body;
    const basketID = body.basketID;
    const sql = `
        SELECT
            basketID, bookID, bookSum
        FROM
            mollu.tbDetailBasket
        WHERE
            basketID = ?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [basketID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, basketID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL", body, basketID);
                throw err2;
            }
        });
    });
});

// 정보 변경
router.put("/", (req, res, next) => {
    const body = req.body;
    const basketID = body.basketID;
    const updatedData = req.body;
    const existingSql = `
        SELECT
                basketID, bookID, bookSum
            FROM
                mollu.tbDetailBasket
            WHERE
                basketID = ?
    `;
    const sql = `
        UPDATE 
            mollu.tbDetailBasket
        SET
            bookID=?,bookSum=?
        WHERE
            basketID=?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        // 기존 정보 갱신
        conn.query(existingSql, [basketID], (err2, results) => {
            if (!err2) {
                console.log("PREV_DATA_LOAD_SUCCESS", body, basketID);
                console.log("PREV_DATA", results);
                const existingDetailBasket = results[0];

                const updatedDetailBasket = {
                    bookID: updatedData.bookID || existingDetailBasket.bookID,
                    bookSum: updatedData.bookSum || existingDetailBasket.bookSum,
                };

                conn.query(sql, [updatedData.bookID, updatedData.bookSum, basketID], (err3, results2) => {
                    if (!err3) {
                        console.log("SUCCESS", updatedDetailBasket, basketID);
                        console.log(results2);
                        conn.release();
                        res.send(results2);
                    } else {
                        console.log("FAIL", updatedDetailBasket, basketID);
                        throw err3;
                    }
                });
            } else {
                console.log("PREV_DATA_LOAD_FAIL", body, basketID);
                throw err2;
            }
        });
    });
});

// 삭제
router.delete("/", (req, res, next) => {
    const body = req.body;
    const basketID = body.basketID;
    const sql = `
        DELETE FROM
            mollu.tbDetailBasket
        WHERE
            basketID = ?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [basketID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, basketID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL", body, basketID);
                throw err2;
            }
        });
    });
});

module.exports = router;
