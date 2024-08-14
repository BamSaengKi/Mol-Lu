import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/main", { state: { query } });
    };

    return (
        <div className="frame">
            <div className="main">
                <div className="logo">몰?루</div>
                <div className="navbar_menu">
                    <form
                        className="search_form"
                        action=""
                        method="get"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="search_box"
                            value={query}
                            type="text"
                            placeholder="검색할 책의 정보를 입력하세요."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>
            </div>
            <div className="navbar">
                <Link
                    to="/SignUp"
                    className="navbar_menu"
                >
                    회원가입
                </Link>
                <div>|</div>
                <Link
                    to="/SignIn"
                    className="navbar_menu"
                >
                    로그인
                </Link>
                <div>|</div>
                <Link
                    to="/Basket"
                    className="navbar_menu"
                >
                    장바구니
                </Link>
                <div>|</div>
                <Link
                    to="/Order"
                    className="navbar_menu"
                >
                    주문목록
                </Link>
                <div>|</div>
                <Link
                    to="/404"
                    className="navbar_menu"
                >
                    고객센터
                </Link>
            </div>
        </div>
        // {/* <div style={{ padding: "50px", display: "flex" }}>
        //         <table style={{ border: "0.1px solid #000000", width: "300px" }}>
        //             <thead>
        //                 <tr>
        //                     <th>name</th>
        //                     <th>id</th>
        //                     <th>password</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {data.map((d, i) => (
        //                     <tr key={i}>
        //                         <td>{d.name}</td>
        //                         <td>{d.customerID}</td>
        //                         <td>{d.customerPassword}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //         <img
        //             alt="Mol?Lu"
        //             src="https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/cd7899978b3544199bce7ccdedd5f19f/91280c3389594c05ab68f0a49f08ad5a_1649123252.jpg"
        //             width="50%"
        //         />
        //     </div> */}
    );
}

export default Home;
