var express = require("express");
var router = express.Router();
const pool = require("../config/DbConfig");

// 주문 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const tbCustomer_ID = body.tbCustomer_ID;
    const postNum = body.postNum;
    const address = body.address;
    const detailAddress = body.detailAddress;
    const creaditNum = body.creaditNum;
    const creaditDate = body.acreaditDate;
    const creaditkinds = body.creaditkinds;
    const sql = `
        INSERT INTO 
            mollu.tbOrders
            (tbCustomer_ID, postNum, address, detailAddress, creaditNum, creaditDate, creaditkinds)
        VALUES
            (?,?,?,?,?,?,?);
        `;

    pool.getConnection((err, conn) => {
        if (err) {
            res.send(err);
        } else {
            console.log("DB연결", body);
            conn.query(
                sql,
                [tbCustomer_ID, postNum, address, detailAddress, creaditNum, creaditDate, creaditkinds],
                (err2, results) => {
                    if (!err2) {
                        console.log(body);
                        console.log(results);
                        conn.release();
                        res.send(results);
                    } else {
                        return err2;
                    }
                }
            );
        }
    });
});

// 주문 조회
router.get("/search", (req, res, next) => {
    const query = req.query;
    const tbCustomer_ID = query.tbCustomer_ID;
    const sql = `
        SELECT 
            orderNum, tbCustomer_ID, postNum, address, 
            detailAddress, orderDate, creaditNum, creaditDate, 
            creaditkinds
        FROM 
            mollu.tbOrders
        WHERE
            tbCustomer_ID = ?;   

     `;

    pool.getConnection((err, conn) => {
        if (err) {
            res.send(err);
        }
        console.log("DB연결");

        conn.query(sql, [tbCustomer_ID], (err2, results) => {
            if (!err2) {
                console.log(tbCustomer_ID);
                console.log(query);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log(query, err2);
                return err2;
            }
        });
    });
});

// 주문 정보 수정
router.put("/", (req, res) => {
    const body = req.body;
    const orderNum = body.orderNum;
    const tbCustomer_ID = body.tbCustomer_ID;
    const postNum = body.postNum;
    const address = body.address;
    const detailAddress = body.detailAddress;
    const creaditNum = body.creaditNum;
    const creaditDate = body.creaditDate;
    const creaditkinds = body.creaditkinds;
    const updatedData = req.body;
    const sql = `
        UPDATE 
            mollu.tbOrders
        SET 
            tbCustomer_ID=?, 
            postNum=?,
            address=?, 
            detailAddress=?, 
            creaditNum=?, 
            creaditDate=?, 
            creaditkinds=?
        WHERE 
            orderNum=?;`;

    pool.getConnection((err, conn) => {
        if (err) {
            return err;
        }
        console.log("DB연결");

        // 기존 주문 정보
        const existingSql = `
          SELECT 
            orderNum, tbCustomer_ID, postNum, address, 
            detailAddress, creaditNum, creaditDate, 
            creaditkinds
        FROM 
            mollu.tbOrders
        WHERE
           orderNum = ?;   
        `;
        conn.query(existingSql, [orderNum], (err2, existingResults) => {
            if (!err) {
                const existingOrder = existingResults[0];

                const updatedOrder = {
                    tbCustomer_ID: updatedData.tbCustomer_ID || existingOrder.tbCustomer_ID,
                    postNum: updatedData.postNum || existingOrder.postNum,
                    address: updatedData.address || existingOrder.address,
                    detailAddress: updatedData.detailAddress || existingOrder.detailAddress,
                    creaditNum: updatedData.creaditNum || existingOrder.creaditNum,
                    creaditDate: updatedData.creaditDate || existingOrder.creaditDate,
                    creaditkinds: updatedData.creaditkinds || existingOrder.creaditkinds,
                    orderNum: updatedData.orderNum || existingOrder.orderNum,
                };

                conn.query(
                    sql,
                    [
                        updatedOrder.tbCustomer_ID,
                        updatedOrder.postNum,
                        updatedOrder.address,
                        updatedOrder.detailAddress,
                        updatedOrder.creaditNum,
                        updatedOrder.creaditDate,
                        updatedOrder.creaditkinds,
                        updatedOrder.orderNum,
                    ],
                    (err3, results) => {
                        if (!err3) {
                            console.log(body);
                            console.log(results);
                            conn.release();
                            res.send(results);
                        } else {
                            console.log(err3);
                            return err3;
                        }
                    }
                );
            } else {
                return err;
            }
        });
    });
});

// 주문 삭제
router.delete("/", (req, res) => {
    const body = req.body;
    const orderNum = body.orderNum;
    const sql = `
        DELETE FROM
            mollu.tbOrders
        WHERE
            orderNum=?;
    `;
    pool.getConnection((err, conn) => {
        if (err) {
            return err;
        }
        console.log("DB 연결");
        conn.query(sql, [orderNum], (err2, results) => {
            if (!err) {
                console.log(body);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                console.log(err2);
                return err2;
            }
        });
    });
});

module.exports = router;
