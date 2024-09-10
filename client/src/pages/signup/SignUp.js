import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { BASE_URL } from "../../util/util";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [customerID, setCustomerID] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                name: name,
                customerID: customerID,
                customerPassword: customerPassword,
            };
            const response = await axios.post(`${BASE_URL}/users`, postData);
            setMessage(response.data.message);
            if (response.status === 200) {
                navigate("/signin");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error);
            } else {
                setMessage("오류가 발생했습니다.");
            }
        }
    };

    return (
        <div>
            <div className="SignUp_Main">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="name"
                        className="SignUp_Main_Input"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="ID"
                        className="SignUp_Main_Input"
                        onChange={(e) => setCustomerID(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="SignUp_Main_Input"
                        autoComplete="off"
                        onChange={(e) => setCustomerPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="SignUp_Main_Input"
                    >
                        확인
                    </button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default SignUp;
