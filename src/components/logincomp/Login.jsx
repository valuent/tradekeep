import React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../utils/config";
import "./login.css";

function Login() {
  const [errLog, setErrLog] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [passResetFlag, setPassResetFlag] = useState(false);
  const [passResetMessaGE, setPassResetMessage] = useState(false);

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

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      // setMessage("Check your E-Mail Inbox for password reset instructions");
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
      <div
        className="exit"
        onClick={() => {
          closeLogin();
          setPassResetMessage("");
          setPassResetFlag(false);
        }}
      >
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      {passResetFlag == false && (
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
          <div
            className="forgotPass"
            onClick={() => {
              setPassResetFlag(true);
              // setLoginEmail("");
              // setLoginPassword("");
            }}
          >
            Forgot Password?
          </div>
          <div
            className="logError"
            id="firebaseMsg"
            style={{ color: "#FF9E9E" }}
          >
            {passResetMessaGE}
            {errLog}
          </div>
          <button
            id="loginBtn"
            onClick={() => {
              loginUser();
              setPassResetMessage("");
            }}
          >
            Login
          </button>
        </div>
      )}

      {passResetFlag == true && (
        <div className="log-head">
          <h1>Password Reset</h1>
          <input
            type="email"
            name="email"
            placeholder="E-Mail ID..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <button
            id="loginBtn"
            onClick={() => {
              resetPassword();
              setPassResetFlag(false); //
              setPassResetMessage(
                "Please check your E-Mail Inbox to reset password"
              );
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
