import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8800/crud")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div style={{ padding: "50px", display: "flex" }}>
            <table style={{ border: "0.1px solid #000000", width: "300px" }}>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.user_number}</td>
                            <td>{d.user_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <img
                alt="Mol?Lu"
                src="https://d3kxs6kpbh59hp.cloudfront.net/community/COMMUNITY/cd7899978b3544199bce7ccdedd5f19f/91280c3389594c05ab68f0a49f08ad5a_1649123252.jpg"
                width="50%"
            />
        </div>
    );
}

export default App;
