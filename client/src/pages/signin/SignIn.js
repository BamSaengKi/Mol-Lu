import React from "react";
import "./SignIn.css";

function SignIn() {
    return (
        <div>
            <div className="SignIn_Main">
                <form>
                    <input
                        type="text"
                        placeholder="ID"
                        className="SignIn_Main_Input"
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="SignIn_Main_Input"
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
