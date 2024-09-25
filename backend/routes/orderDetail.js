var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 조회
router.get("/", (req, res, next) => {
    const body = req.body;
    const tbOrders_ID = body.tbOrders_ID;
    const sql = `
    SELECT
        tbOrders_ID, tbBooks_ID, totalStock
    FROM
        mollu.tbOrderDetail
    WHERE
        tbOrders_ID = ?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [tbOrders_ID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, tbOrders_ID);
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

// 등록
router.post("/", (req, res) => {
    const body = req.body;
    const tbBooks_ID = body.tbBooks_ID;
    const totalStock = body.totalStock;
    const sql = `
    INSERT INTO
        mollu.tbOrderDetail
        (tbBooks_ID, totalStock)
    VALUES
        (?,?)
    `;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }

        conn.query(sql, [tbBooks_ID, totalStock], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, tbBooks_ID, totalStock);
                console.log(results);
                conn.release();
                res.send(results);
            }
        });
    });
});

// 변경

router.put("/", (req, res, next) => {
    const body = req.body;
    const tbBooks_ID = body.tbBooks_ID;
    const tbOrders_ID = body.tbOrders_ID;
    const totalStock = body.totalStock;
    const updateData = req.body;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        // 기존 정보
        const existingSql = `
            SELECT
                tbOrders_ID,
                tbBooks_ID,
                totalStock
            FROM
                mollu.tbOrderDetail
            WHERE
                tbOrders_ID
                `;
        conn.query(existingSql, [tbOrders_ID], (err2, results) => {
            if (!err2) {
                const existingOrder = results[0];

                const updatedOrder = {
                    // tbOrders_ID: updateData.tbOrders_ID || existingOrder.tbOrders_ID,
                    tbBooks_ID: updateData.tbBooks_ID || existingOrder.tbBooks_ID,
                    totalStock: updateData.totalStock || existingOrder.totalStock,
                };
                console.log("PREV_DATA_LOADING_SUCCESS", updatedOrder, tbOrders_ID);
                console.log(results);

                // 변경할 정보
                const sql = `
        UPDATE
            mollu.tbOrderDetail
        SET
            tbBooks_ID=?,totalStock=?
        WHERE
            tbOrders_ID=?
    `;

                conn.query(sql, [updateData.tbBooks_ID, updateData.totalStock, tbOrders_ID], (err3, results2) => {
                    if (!err3) {
                        console.log("SUCCESS", updateData);
                        console.log(results2);
                        conn.release();
                        res.send(results2);
                    }
                });
            } else {
                console.log("PREV_DATA_LOADING_FAIL", body, tbOrders_ID);
                throw err2;
            }
        });
    });
});

// 삭제
router.delete("/", (req, res, next) => {
    const body = req.body;
    const tbBooks_ID = body.tbBooks_ID;
    const tbOrders_ID = body.tbOrders_ID;
    const sql = `
        DELETE FROM
            mollu.tbOrderDetail
        WHERE
            tbOrders_ID=?
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }

        conn.query(sql, [tbOrders_ID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, tbOrders_ID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL", body, tbOrders_ID);
                throw err2;
            }
        });
    });
});

module.exports = router;
