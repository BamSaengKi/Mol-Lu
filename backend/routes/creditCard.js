var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 조회
router.get("/", (req, res, next) => {
    const body = req.body;
    // const creditCardNum = body.creditCardNum;
    // const creditCardDate = body.creditCardDate;
    // const creditCardKinds = body.creditCardKinds;
    const customerID = body.customerID;
    const sql = `
        SELECT 
            creditCardNum,
            creditCardDate,
            creditCardKinds,
            customerID
        FROM
            mollu.tbCreditCard
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
                console.log("FAIL", body, customerID);
                throw err2;
            }
        });
    });
});

// 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const creditCardNum = body.creditCardNum;
    const creditCardDate = body.creditCardDate;
    const creditCardKinds = body.creditCardKinds;
    const customerID = body.customerID;
    const sql = `
        INSERT INTO
            mollu.tbCreditCard
            (creditCardNum, creditCardDate,creditCardKinds,customerID)
        VALUES
            (?,?,?,?)
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        conn.query(sql, [creditCardNum, creditCardDate, creditCardKinds, customerID], (err2, results) => {
            if (!err2) {
                console.log("SUCCESS", body, creditCardNum, creditCardDate, creditCardKinds, customerID);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log("FAIL", body, creditCardNum, creditCardDate, creditCardKinds, customerID);
                throw err2;
            }
        });
    });
});

// 변경
router.put("/", (req, res, next) => {
    const body = req.body;
    // const creditCardNum = body.creditCardNum;
    // const creditCardDate = body.creditCardDate;
    // const creditCardKinds = body.creditCardKinds;
    const customerID = body.customerID;
    const updatedData = body.req;
    const exitingSql = `
        SELECT 
            creditCardNum, creditCardDate, creditCardKinds
        FROM
            mollu.tbCreditCard
        WHERE
            customerID = ?
        
    `;
    const sql = `
        UPDATE 
            mollu.tbCreditCard
        SET
            creditCardNum=?, creditCardDate=?,creditCardKinds=?
        WHERE 
            customerID=?;
    `;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        // 예전 정보
        conn.query(exitingSql, [customerID], (err2, results) => {
            if (!err2) {
                const exitingCard = results[0];

                const updatedCard = {
                    creditCardNum: updatedData.creditCardNum || exitingCard.creditCardNum,
                    creditCardDate: updatedData.creditCardDate || exitingCard.creditCardDate,
                    creditCardKinds: updatedData.creditCardKinds || exitingCard.creditCardKinds,
                };
                console.log("PREV_DATA_LOAD_SUCCESS", updatedCard);

                conn.query(
                    sql,
                    [updatedData.creditCardNum, updatedData.creditCardDate, updatedData.creditCardKinds],
                    (err3, results2) => {
                        if (err3) {
                            console.log("SUCCESS", body, updatedData);
                            console.log(results2);
                            conn.release();
                            res.send(results2);
                        } else {
                            console.log("FAIL", body, updatedData);
                            throw err3;
                        }
                    }
                );
            } else {
                console.log("PREV_DATA_LOAD_FAIL", body);
                throw err2;
            }
        });
    });
});

module.exports = router;
