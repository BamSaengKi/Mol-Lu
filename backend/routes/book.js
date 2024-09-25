var express = require("express");
var router = express.Router();
const pool = require("../config/DbConfig");

// 1. 콜백을 없애기
// 2. 예외처리(try/catch)
// 3. 모듈화

// 도서 등록
router.post("/", (req, res, next) => {
    const body = req.body;
    const bookID = req.body.bookID;
    const bookName = req.body.bookName;
    const author = req.body.author;
    const price = req.body.price;
    const stock = req.body.stock;
    const url = req.body.url;
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        const sql = `

        INSERT INTO 
                mollu.tbBooks
                (bookID, bookName, author, price, stock, url)
        VALUES
                (?, ?, ?, ?, ?, ?);
        `;
        conn.query(sql, [bookID, bookName, author, price, stock, url], (err, results) => {
            if (!err) {
                console.log(body);
                console.log(results);
                conn.release();
                req.results = results;
                res.send(results);
            }
        });
    });
});

// 도서 검색
router.get("/book_search", function (req, res, next) {
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
                res.status(200).json(results);
                req.results = results;
            } else {
                return err;
            }
        });
    });
});

// // 도서 상세
// router.get("/:book_id", function (req, res, next) {
//     res.send(req.params);
// });

// 도서 정보 변경
router.put("/", (req, res) => {
    const body = req.body;
    const bookID = body.bookID;
    const updatedData = req.body;

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        console.log("db");

        // 기존 도서 정보 가져오기
        const existingSql = `
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
                tbb.bookID=?;
        `;
        conn.query(existingSql, [bookID], (err, results) => {
            if (!err) {
                const existingBook = results[0];

                const updateedBook = {
                    bookName: updatedData.bookName || existingBook.bookName,
                    author: updatedData.author || existingBook.author,
                    price: updatedData.price || existingBook.price,
                    stock: updatedData.stock || existingBook.stock,
                    url: updatedData.url || existingBook.url,
                };

                const sql = `
                UPDATE
                    mollu.tbBooks
                SET 
                    bookName=?, author=?, price=?, stock=?, url=?
                WHERE 
                    bookID=?;
            `;
                conn.query(
                    sql,
                    [
                        updateedBook.bookName,
                        updateedBook.author,
                        updateedBook.price,
                        updateedBook.stock,
                        updateedBook.url,
                        bookID,
                    ],
                    (err, results) => {
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
                    }
                );
            } else {
                throw err;
            }
        });
    });

    //수정되지 않은 필드 기존 값으로 유지
    pool.getConnection((err, conn) => {});
});

module.exports = router;
