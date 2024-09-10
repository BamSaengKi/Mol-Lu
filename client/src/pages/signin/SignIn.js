import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { BASE_URL } from "../../util/util";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [customerID, setCustomerID] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const getData = {
                customerID: customerID,
                customerPassword: customerPassword,
            };
            const response = await axios.post(`${BASE_URL}/users/login`, getData);
            if (response.status === 200) {
                console.log("성공!", response.data);
                navigate("/main");
            } else {
                console.log("실패", response, BASE_URL, getData);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    return (
        <div>
            <div className="SignIn_Main">
                <form onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        placeholder="ID"
                        className="SignIn_Main_Input"
                        onChange={(e) => setCustomerID(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="SignIn_Main_Input"
                        onChange={(e) => setCustomerPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="SignIn_Main_Input"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
