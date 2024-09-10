var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 유저 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const name = body.name;
    const customerID = body.customerID;
    const customerPassword = body.customerPassword;
    pool.getConnection((err, conn) => {
        if (err) {
            res.send(err);
        }
        console.log("연결은 돼따");
        const sql = `
    INSERT INTO
        mollu.tbCustomer
        (name, customerID, customerPassword)
    VALUES
        (?, ?, ?);
    `;

        conn.query(sql, [name, customerID, customerPassword], (err2, results) => {
            if (!err2) {
                console.log(body);
                console.log(results);
                conn.release();
                res.send(results);
            } else {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "이미 존재하는 사용자입니다." });
                }
                return res.status(500).json({ error: "사용자 등록 실패" });
            }
        });
    });
});

// 로그인
router.post(
    "/login",
    function (req, res, next) {
        const body = req.body;
        const customerID = body.customerID;
        const customerPassword = body.customerPassword;
        const sql = `
        SELECT 
            *
        FROM
            tbCustomer tbc
        WHERE
            customerID = ?
        AND
            customerPassword = ? ;
      `;
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("DB");
                throw err;
            }

            conn.query(sql, [customerID, customerPassword], (err, results) => {
                if (!err) {
                    if (results.length === 0) {
                        console.log("failed", customerID, customerPassword);
                        return res.status(400).json({ message: "Invalid ID or Password" });
                    } else {
                        console.log("Success", results);
                        return res.status(200).json({ message: "로그인 완료" });
                    }
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

// 유저 정보 수정
router.put("/", (req, res) => {
    const body = req.body;
    const name = body.name;
    const customerID = body.customerID;
    const customerPassword = body.customerPassword;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        console.log("DB");
        const sql = `
          UPDATE
              mollu.tbCustomer
          SET
              name=?,
              customerPassword=?
          WHERE 
              customerID=?;
        `;
        conn.query(sql, [name, customerPassword, customerID], (err, results) => {
            if (!err) {
                console.log(body);
                console.log(results);
                conn.release();
                req.results = results;
                res.send(results);
            } else {
                console.log(err);
                return err;
            }
        });
    });
});

// 유저 삭제
router.delete("/", (req, res) => {
    const body = req.body;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        console.log("DB");
        const sql = `
    DELETE FROM 
        mollu.tbCustomer
    WHERE 
        customerID=?;
    `;
        conn.query(sql, [body.customerID], (err, results) => {
            if (!err) {
                console.log(body);
                console.log(results);
                console.log(body.customerID);
                conn.release();
                req.results = results;
                res.send(results);
            } else {
                console.log(sql);
                console.log(err);
                return err;
            }
        });
    });
});

module.exports = router;
