const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dkansk1518",
    database: "new_schema",
});

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    return res.json("Backend is connected");
});

app.get("/crud", (req, res) => {
    const sql = "select * from crud";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("listening");
});
