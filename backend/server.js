const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
dotenv = require("dotenv").config();

const db = mysql.createConnection({
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

app.get("/tbCustomer", (req, res) => {
    const sql = "select * from tbCustomer";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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
    db.query(sql, [`%${serachTerm}%`, `%${serachTerm}%`, `%${serachTerm}%`, `%${serachTerm}%`], (err, results) => {
        if (err) return err;
        res.json(results);
    });
});

app.listen(process.env.PORT || 6080, () => {
    console.log("listening");
});
