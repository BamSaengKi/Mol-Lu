import React, { useEffect, useState } from "react";
import "./Main.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Main() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const query = location.state?.query || "";
    const dataa = location.state?.dataa || "";

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                try {
                    const res = await fetch(`http://localhost:8800/search?q=${query}`);
                    if (!res.ok) {
                        throw new Error("Newtork response was not ok");
                    }
                    const name = await res.json();
                    setResults(name);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchResults();
    }, [query]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (dataa) {
    //             try {
    //                 const response = await fetch(`http://localhost:8800/search?q=${dataa}`);
    //                 const dataaa = await response.json();
    //                 setData(dataaa);
    //             } catch (error) {
    //                 console.error("Error fetching data", error);
    //             }
    //         }
    //     };
    //     fetchData();
    // }, [dataa]);

    return (
        <div className="frame">
            <div className="main_top">
                <Link
                    to="/main"
                    className="main_logo"
                >
                    MOL?LU
                </Link>
                <form
                    className="search_area"
                    action=""
                    method="get"
                >
                    <input
                        className="main_search_box"
                        type="text"
                        placeholder="검색할 책의 정보를 입력하세요"
                        onChange={(e) => setResults(e.target.value)}
                    />
                </form>
                <div className="main_top_menu_area">
                    <Link
                        to="/basket"
                        className="main_top_menu"
                    >
                        장바구니
                    </Link>
                    <div>|</div>
                    <Link
                        to="/order"
                        className="main_top_menu"
                    >
                        주문목록
                    </Link>
                    <div>|</div>
                    <Link
                        to="/"
                        className="main_top_menu"
                    >
                        마이페이지
                    </Link>
                </div>
            </div>
            <div className="main_main">
                <table
                    className="main_table"
                    border="1"
                    cellPadding={1}
                >
                    <thead>
                        <tr className="table_category">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((d, i) => (
                            <tr key={i}>
                                <td>{d.bookID}</td>
                                <td>{d.bookName}</td>
                                <td>{d.author}</td>
                                <td>{d.price}</td>
                                <td>{d.stock}</td>
                                <td>{d.url}</td>
                            </tr>
                        ))}

                        {/* {results.length > 0 ? (
                            <>
                                {results.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.bookID}</td>
                                        <td>{d.bookName}</td>
                                        <td>{d.author}</td>
                                        <td>{d.price}</td>
                                        <td>{d.stock}</td>
                                        <td>{d.url}</td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <>
                                {results.map((d, i) => (
                                    <tr key={i}>
                                        <td>{d.bookID}</td>
                                        <td>{d.bookName}</td>
                                        <td>{d.author}</td>
                                        <td>{d.price}</td>
                                        <td>{d.stock}</td>
                                        <td>{d.url}</td>
                                    </tr>
                                ))}
                            </>
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;
