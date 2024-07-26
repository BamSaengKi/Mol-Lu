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
        <div style={{ padding: "50px" }}>
            <table>
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
        </div>
    );
}

export default App;
