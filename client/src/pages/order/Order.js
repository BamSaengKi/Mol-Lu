import React, { useState } from "react";
import "./Order.css";
import axios from "axios";
import { BASE_URL } from "../../util/util";

function Order() {
    // 조회
    const [tbCustomer_ID, setTbCustomer_ID] = useState("");
    const [results, setResults] = useState(null);

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            // const getData = {
            //     tbCustomer_ID: tbCustomer_ID,
            // };
            const response = await axios.get(`${BASE_URL}/order/search/?tbCustomer_ID=${tbCustomer_ID}`);
            console.log(results, response, tbCustomer_ID);
            console.log(response.data);
            setResults(response.data);
        } catch (error) {
            return error;
        }
    };

    // 등록
    // const [tbCustomer_ID2, setTbCustomer_ID2] = useState();
    const [postNum, setPostNum] = useState();
    const [address, setAddress] = useState();
    const [detailAddress, setDetailAddress] = useState();
    const [creaditNum, setCreaditNum] = useState();
    const [creaditDate, setCreaditDate] = useState();
    const [creaditKinds, setCreaditKinds] = useState();

    const handleRegistSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                tbCustomer_ID: tbCustomer_ID,
                postNum: postNum,
                address: address,
                detailAddress: detailAddress,
                creaditNum: creaditNum,
                creaditDate: creaditDate,
                CreaditKinds: creaditKinds,
            };
            const res = await axios.post(`${BASE_URL}/order`, postData);
            console.log(postData);
            console.log(res);
            setResults(res.data);
        } catch (error2) {
            return error2;
        }
    };

    return (
        <div className="Order_Main">
            {/* 조회 */}
            <div>
                <h1>주문 정보 조회</h1>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        // value={tbCustomer_ID || ""}
                        placeholder="ID"
                        onChange={(e) => {
                            setTbCustomer_ID(e.target.value);
                        }}
                    />
                    <button>조회</button>
                </form>

                <div>
                    {results && Array.isArray(results) && results.length > 0 ? (
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>주문번호</th>
                                    <th>ID</th>
                                    <th>우편번호</th>
                                    <th>주소</th>
                                    <th>상세주소</th>
                                    <th>주문완료시간</th>
                                    <th>카드 번호</th>
                                    <th>카드 유효 기간</th>
                                    <th>카드 종류</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.orderNum}</td>
                                        <td>{d.tbCustomer_ID}</td>
                                        <td>{d.postNum}</td>
                                        <td>{d.address}</td>
                                        <td>{d.detailAddress}</td>
                                        <td>{d.orderData}</td>
                                        <td>{d.creaditNum}</td>
                                        <td>{d.creaditDate}</td>
                                        <td>{d.creaditkinds}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>사용자를 찾을 수 없습니다.</p>
                    )}
                </div>
            </div>
            등록
            <div>
                <form onSubmit={handleRegistSubmit}>
                    <input
                        type="text"
                        placeholder="ID"
                        // value={tbCustomer_ID || ""}
                        onChange={(e) => setTbCustomer_ID(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="postNum"
                        value={postNum || ""}
                        onChange={(e) => setPostNum(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address || ""}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="DetailAddress"
                        value={detailAddress || ""}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="CreaditNum"
                        value={creaditNum || ""}
                        onChange={(e) => setCreaditNum(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="CreaditDate"
                        value={creaditDate || ""}
                        onChange={(e) => setCreaditDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="CreaditKinds"
                        value={creaditKinds || ""}
                        onChange={(e) => setCreaditKinds(e.target.value)}
                    />
                    <button>등록</button>
                </form>
            </div>
            <div></div>
        </div>
    );
}

export default Order;
