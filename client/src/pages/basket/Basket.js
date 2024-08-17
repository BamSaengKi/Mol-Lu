import React from "react";
import "./Basket.css";
import { Link, useNavigate } from "react-router-dom";

function Basket() {
    const navigate = useNavigate();
    const onLT = () => {
        navigate(-1);
    };

    return (
        <div className="basket_frame">
            <div className="basket_top">
                <Link
                    to="/main"
                    className="basket_logo"
                >
                    MOL?LU
                </Link>
            </div>

            <div className="basket_box">
                <div className="goods_box">
                    <div className="goods_top">
                        <div className="goods_top_basket">
                            <span
                                onClick={onLT}
                                style={{ cursor: "pointer" }}
                            >
                                &lt;
                            </span>
                            장바구니
                        </div>
                        <div className="goods_top_sequence">
                            <div className="sequence">01&nbsp;</div>
                            <div className="sequence">책 담기&gt;&nbsp;</div>
                            <div className="sequence">&nbsp;02&nbsp;</div>
                            <div className="sequence">장바구니&gt;&nbsp;</div>
                            <div className="sequence">&nbsp;03&nbsp;</div>
                            <div className="sequence">주문/결제&gt;&nbsp;</div>
                            <div className="sequence">&nbsp;04&nbsp;</div>
                            <div className="sequence">주문완료</div>
                        </div>
                    </div>
                    <div className="goods_middle_banner">일반구매({0})</div>
                    <div className="basket_main">
                        <div className="basket_main_left">
                            <table className="basket_table">
                                <tr>
                                    <span className="table_title1">몰루 배송 상품</span>
                                    <span className="table_title2">&nbsp;무료배송</span>
                                </tr>
                                <tr>
                                    <td>asdf</td>
                                    <td>asdf</td>
                                </tr>
                            </table>
                        </div>
                        <div className="basket_main_right">asdf</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
