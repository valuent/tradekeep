import React from "react";
import { useState, useContext } from "react";
import { DataContext } from "../../service/DataContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/config";
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { auth } from "../../utils/config";

function Register() {
  const [errReg, setErrReg] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passMatchClass, setPassMatchClass] = useState();
  const { userData, userAuthState, siteDate } = useContext(DataContext);

  var setNowDate = siteDate.c;
  var setExpiryDate = siteDate.plus({ days: 30 }).c;
  const registerUser = async () => {
    var userData = {
      userInfo: {
        userMail: registerEmail,
        registerDate:
          setNowDate.day + "-" + setNowDate.month + "-" + setNowDate.year,
        currentPlan: "Free Trial",
      },
      subscriptionData: {
        isSub: true,
        trialOver: false,
        subscriptionStartDate:
          setNowDate.day + "-" + setNowDate.month + "-" + setNowDate.year,
        subscriptionEndDate:
          setExpiryDate.day +
          "-" +
          setExpiryDate.month +
          "-" +
          setExpiryDate.year,
      },
      strategytags: [],
      tradeWritableDoc: "tradeDoc_1",
    };

    try {
      const userRegister = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );

      const userAddDoc = await setDoc(
        doc(db, "users", registerEmail),
        userData,
      );

      const userTradeDataAddDoc = await setDoc(
        doc(db, "users", registerEmail, "userTradeData", "tradeDoc_1"),
        {},
      );

      setErrReg("");
    } catch (err) {
      setErrReg(err.message);
    }
  };

  // UI Close Panel
  const closeRegister = () => {
    document.getElementById("regcontainer").style.top = "100%";
  };

  // Check Pass Match
  const checkPass = () => {
    var passInput1 = document.getElementById("pass1").value;
    var passInput2 = document.getElementById("pass2").value;

    if (passInput1 != passInput2) {
      document.getElementById("passMsg").innerHTML = "Password did not match";
      setPassMatchClass("text-error");
      setPassMatch(false);
    } else {
      document.getElementById("passMsg").innerHTML = "Password Matched!";
      setPassMatchClass("text-success");
      setPassMatch(true);
    }
  };
  return (
    <div
      className="fixed top-full z-50 h-full w-full transition-all duration-100 ease-in-out"
      id="regcontainer"
    >
      <button
        className="hover btn btn-square absolute right-5 top-5 z-10 border-primary bg-primary hover:border-red-500 hover:bg-red-500 "
        onClick={closeRegister}
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
      <div className="hero min-h-screen bg-base-200 bg-opacity-50 ">
        <div className="hero-content flex-col sm:w-4/5 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="overflow-visible text-5xl font-bold">
              Sign Up now!
            </h1>
            <p className="py-6">
              Embark on your trading journey with our user-friendly platform,
              designed to empower new traders with insightful analytics.
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-md">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="emailId"
                  placeholder="E-Mail ID..."
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="pass1"
                  placeholder="Password..."
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                    checkPass();
                  }}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="confirmpass"
                  id="pass2"
                  placeholder="Comfirm Password..."
                  onChange={checkPass}
                  className="input input-bordered"
                  required
                />
              </div>
              {errReg && (
                <div
                  role="alert"
                  class="alert alert-error cursor-pointer"
                  onClick={() => {
                    setErrReg("");
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
                  <span>{errReg}</span>
                </div>
              )}

              <div id="passMsg" className={passMatchClass}></div>

              {passMatch == true && (
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary"
                    id="signBtn"
                    onClick={registerUser}
                  >
                    Sign Up
                  </button>
                </div>
              )}
              {!passMatch == true && (
                <div className="form-control mt-6">
                  <button
                    className="btn disabled btn-primary text-white hover:border-secondary hover:bg-secondary"
                    id="signBtn"
                    onClick={registerUser}
                    disabled
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
