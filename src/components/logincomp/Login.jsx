import React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../utils/config";

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
        loginPassword,
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
    <div
      className="fixed top-full h-full w-full transition-all duration-100 ease-in-out"
      id="logcontainer"
    >
      {/* <div
        className="exit"
        onClick={() => {
          closeLogin();
          setPassResetMessage("");
          setPassResetFlag(false);
        }}
      >
        <div className="line1"></div>
        <div className="line2"></div>
      </div> */}
      <button
        className="hover btn btn-square absolute right-5 top-5 z-10 border-primary bg-primary hover:border-red-500 hover:bg-red-500 "
        onClick={() => {
          closeLogin();
          setPassResetMessage("");
          setPassResetFlag(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {passResetFlag == false && (
        <div className="max- hero min-h-screen bg-base-200 bg-opacity-50">
          <div className="hero-content flex-col sm:w-4/5 lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Unleash your trading potential and gain unparalleled insights
                with our analytics platform crafted for serious traders.
              </p>
            </div>
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    required
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="link-hover link label-text-alt"
                      onClick={() => {
                        setPassResetFlag(true);
                        // setLoginEmail("");
                        // setLoginPassword("");
                      }}
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                {passResetMessaGE && (
                  <div
                    role="alert"
                    class="alert- alert alert-success cursor-pointer"
                    onClick={() => {
                      setPassResetMessage("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{passResetMessaGE}</span>
                  </div>
                )}
                {errLog && (
                  <div
                    role="alert"
                    class="alert alert-error cursor-pointer"
                    onClick={() => {
                      setErrLog("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errLog}</span>
                  </div>
                )}
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary text-white hover:border-secondary hover:bg-secondary"
                    onClick={() => {
                      loginUser();
                      setPassResetMessage("");
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {passResetFlag == true && (
        <div className="max- hero min-h-screen bg-base-200 bg-opacity-50">
          <div className="hero-content flex-col sm:w-4/5 lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Reset Password</h1>
              <p className="py-6">
                Check Your E-Mail inbox to reset your password
              </p>
            </div>
            <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary text-white hover:border-secondary hover:bg-secondary"
                    onClick={() => {
                      resetPassword();
                      setPassResetFlag(false); //
                      setPassResetMessage(
                        "Please check your E-Mail Inbox to reset password",
                      );
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
