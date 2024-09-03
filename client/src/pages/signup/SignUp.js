import React from "react";
import "./SignUp.css";

function SignUp() {
    return (
        <div>
            <div className="SignUp_Main">
                <form>
                    <input
                        type="text"
                        placeholder="ID"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="NAME"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="POST NAME"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="ADRESS"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="DETAIL ADRESS"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="CREDIT CARD NUMBER"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="CREDIT CARD DATE"
                        className="SignUp_Main_Input"
                    />
                    <input
                        type="text"
                        placeholder="CREDIT CARD KINDS"
                        className="SignUp_Main_Input"
                    />
                    <button
                        type="submit"
                        className="SignUp_Main_Input"
                    >
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
