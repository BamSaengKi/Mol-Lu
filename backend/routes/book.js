var express = require("express");
var router = express.Router();
const pool = require("../config/DbConfig");

// 1. 콜백을 없애기
// 2. 예외처리(try/catch)
// 3. 모듈화

router.post("/", (req, res, next) => {
    res.send(req.body);
});

// 도서 검색
router.get(
    "/",
    function (req, res, next) {
        const query = req.query.q;
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            const sql = `
            SELECT
                bookID,
                bookName,
                author,
                price,
                stock,
                url
            FROM
                tbBooks tbb
            WHERE
                tbb.bookName LIKE ?
            OR
                tbb.bookID LIKE ?
            OR
                tbb.author LIKE ?;
        `;
            conn.query(sql, [`%${query}%`, `%${query}%`, `%${query}%`], (err, results) => {
                if (!err) {
                    console.log(query);
                    console.log(results);
                    conn.release();
                    // res.status(200).json(results);
                    req.results = results;
                    next();
                } else {
                    return err;
                }
            });
        });
    },
    (req, res) => {
        console.log("여긴 넥스트에요");

        res.send(req.results);
    }
);

// 도서 상세
router.get("/:book_id", function (req, res, next) {
    res.send(req.params);
});

module.exports = router;
