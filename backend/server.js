const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
dotenv = require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    return res.json("Backend is connected");
});

// app.get("/tbCustomer", (req, res) => {
//     const sql = "select * from tbCustomer";
//     db.getConnection((error, conn) => {
//         conn.query(sql, (err, data) => {
//             if (!err) {
//                 console.log(data);
//                 return res.json(data);
//                 conn.release();
//             } else {
//                 return res.json(err);
//             }
//         });
//     });
// });

// app.get("/search", (req, res) => {
//     const serachTerm = req.query.q;
//     const sql = `SELECT * FROM tbBooks WHERE bookName LIKE ?`;
//     db.query(sql, [`%${serachTerm}%`, `%${serachTerm}%`], (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

app.get("/search", (req, res) => {
    const serachTerm = req.query.q;
    const sql = `SELECT * FROM tbBooks WHERE bookName LIKE ? OR bookID LIKE ? OR author LIKE ?`;
    db.getConnection((error, connection) => {
        connection.query(
            sql,
            [`%${serachTerm}%`, `%${serachTerm}%`, `%${serachTerm}%`, `%${serachTerm}%`],
            (err, results) => {
                if (!err) {
                    res.json(results);
                    console.log(results);
                    connection.release();
                } else {
                    return err;
                }
            }
        );
    });
});

app.listen(process.env.PORT || 6080, () => {
    console.log("listening");
});
