var express = require("express");
var router = express.Router();
var pool = require("../config/DbConfig");

// 유저 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        console.log("연결은 돼따");
        const sql = `
    INSERT INTO
        mollu.tbCustomer
        (name, customerID, customerPassword)
    VALUES
        (?, ?, ?);
    `;
        const name = req.body.name;
        const customerID = req.body.customerID;
        const customerPassword = req.body.customerPassword;

        conn.query(sql, [name, customerID, customerPassword], (err, results) => {
            if (!err) {
                console.log(body);
                console.log(results);
                conn.release();
                res.results = results;
            } else {
                return err;
            }
        });
    });
    res.send(req.body);
});

// 유저 검색
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
