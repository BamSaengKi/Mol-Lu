import React from "react";
import "./Basket.css";
import { Link } from "react-router-dom";

function Basket() {
    return (
        <div className="basket_frame">
            <div className="basket_top">
                <Link
                    to="/main"
                    className="basket_logo"
                >
                    몰?루
                </Link>
            </div>
            <div className="basket_main">
                <div className="basket_main_top">
                    <div className="basket_main_top_menu">&lt; 장바구니</div>
                    <div className="basket_main_top_menu"> 01</div>
                    <div className="basket_main_top_menu">&nbsp;책 담기 &gt;</div>
                    <div className="basket_main_top_menu"> &nbsp;02</div>
                    <div className="basket_main_top_menu">&nbsp;장바구니 &gt;</div>
                    <div className="basket_main_top_menu"> &nbsp;03</div>
                    <div className="basket_main_top_menu">&nbsp;주문/결제 &gt;</div>
                    <div className="basket_main_top_menu">&nbsp;04</div>
                    <div className="basket_main_top_menu">&nbsp;주문완료</div>
                </div>
                <div className="basket_main_detail">구매목록({0})</div>
                <div className="basket_main_detail_goods">asdf</div>
            </div>
        </div>
    );
}

export default Basket;
