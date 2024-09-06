import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { BASE_URL } from "../../util/util";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [customerID, setCustomerID] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const setCustomerIDHandler = (e) => {
        setCustomerID(e.target.value);
    };
    const setCustomerPasswordHandler = (e) => {
        setCustomerPassword(e.target.value);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const postData = {
                customerID: customerID,
                customerPassword: customerPassword,
            };
            const res = await axios.post(`${BASE_URL}/users`, postData);
            if (res.status(200)) {
                navigate("/main");
            }
        } catch (error) {
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
                        onChange={setCustomerIDHandler}
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="SignIn_Main_Input"
                        onChange={setCustomerPasswordHandler}
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
