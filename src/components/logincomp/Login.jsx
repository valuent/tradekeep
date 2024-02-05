import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/config";
import "./login.css";

function Login() {
  const [errLog, setErrLog] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setErrLog("");
    } catch (err) {
      setErrLog(err.message);
    }
  };

  const closeLogin = () => {
    document.getElementById("logcontainer").style.top = "100%";
  };

  return (
    <div className="login-container" id="logcontainer">
      <div className="exit" onClick={closeLogin}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="log-head">
        <h1>Log In</h1>
        <input
          type="email"
          name="email"
          placeholder="E-Mail ID..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <div className="logError" id="firebaseMsg" style={{ color: "#FF9E9E" }}>
          {errLog}
        </div>
        <button id="loginBtn" onClick={loginUser}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
