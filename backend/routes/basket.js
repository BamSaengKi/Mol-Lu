var express = require("express");
var router = esxpress.Router();
const pool = require("../config/DbConfig");

// 장바구니 조회
router.get("/", (req, res, netx) => {
    const body = req.body;
    const sql = `
    SELECT 
        BasketID, bookID, booksum
    FROM 
        mollu.tbdetailBasket
    WHERE
        BasketID = ?;
    `;
});

module.exports = router;
