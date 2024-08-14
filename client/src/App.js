// import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";

function App() {
    return <Home />;

    // useEffect(() => {
    //     fetch("http://localhost:8800/tbCustomer")
    //         .then((res) => res.json())
    //         .then((data) => setData(data))
    //         .catch((err) => console.log(err));
    // }, []);
    // return (
    //     <div className="frame">
    //         <div className="main">
    //             <div className="logo">몰?루</div>
    //             <div className="navbar_menu">
    //                 <form
    //                     className="search_form"
    //                     action=""
    //                     method="get"
    //                 >
    //                     <input
    //                         className="search_box"
    //                         type="text"
    //                         placeholder="검색할 책의 정보를 입력하세요."
    //                     />
    //                 </form>
    //             </div>
    //         </div>
    //         <div className="navbar">
    //             <div className="navbar_menu">회원가입</div>
    //             <div>|</div>
    //             <div className="navbar_menu">로그인</div>
    //             <div>|</div>
    //             <div className="navbar_menu">장바구니</div>
    //             <div>|</div>
    //             <div className="navbar_menu">고객센터</div>
    //         </div>
    //     </div>
    //     // {/* <div style={{ padding: "50px", display: "flex" }}>
    //     //         <table style={{ border: "0.1px solid #000000", width: "300px" }}>
    //     //             <thead>
    //     //                 <tr>
    //     //                     <th>name</th>
    //     //                     <th>id</th>
    //     //                     <th>password</th>
    //     //                 </tr>
    //     //             </thead>
    //     //             <tbody>
    //     //                 {data.map((d, i) => (
    //     //                     <tr key={i}>
    //     //                         <td>{d.name}</td>
    //     //                         <td>{d.customerID}</td>
    //     //                         <td>{d.customerPassword}</td>
    //     //                     </tr>
    //     //                 ))}
    //     //             </tbody>
    //     //         </table>
    //     //         <img
    //     //             alt="Mol?Lu"
    //     //             src="https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/cd7899978b3544199bce7ccdedd5f19f/91280c3389594c05ab68f0a49f08ad5a_1649123252.jpg"
    //     //             width="50%"
    //     //         />
    //     //     </div> */}
    // );
}

export default App;
