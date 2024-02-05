import React from "react";
import { useState, useContext } from "react";
import { DataContext } from "../../service/DataContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/config";
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { auth } from "../../utils/config";

import "./register.css";

function Register() {
  const [errReg, setErrReg] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { userData, userAuthState, siteDate } = useContext(DataContext);

  // const currentDate = new Date();
  // const expiry = new Date();
  // const daysTillExpiry = expiry.getDate() + 30 - currentDate.getDate();
  // d.getDate();
  var setNowDate = siteDate.c;
  var setExpiryDate = siteDate.plus({ days: 30 }).c;
  const registerUser = async () => {
    var userData = {
      userInfo: {
        userMail: registerEmail,
        registerDate:
          setNowDate.day + "-" + setNowDate.month + "-" + setNowDate.year,
        useType: "Free Trial",
      },
      subscriptionData: {
        subscriptionStartDate:
          setNowDate.day + "-" + setNowDate.month + "-" + setNowDate.year,
        type: "free",
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
        registerPassword
      );

      const userAddDoc = await setDoc(
        doc(db, "users", registerEmail),
        userData
      );

      const userTradeDataAddDoc = await setDoc(
        doc(db, "users", registerEmail, "userTradeData", "tradeDoc_1"),
        {}
      );
      // var
      // const userTradesAddDoc = await setDoc(doc(db, "users", registerEmail),
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
      document.getElementById("passMsg").style.color = "#FF9E9E";
      setPassMatch(false);
    } else {
      document.getElementById("passMsg").innerHTML = "Password Matched!";
      document.getElementById("passMsg").style.color = "#B7FF9E";
      setPassMatch(true);
    }
  };
  return (
    <div className="register-container" id="regcontainer">
      <div className="exit" onClick={closeRegister}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="reg-head">
        <h1>Sign Up</h1>
        <input
          type="email"
          name="email"
          id="emailId"
          placeholder="E-Mail ID..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="pass1"
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
            checkPass();
          }}
        />
        <input
          type="password"
          name="confirmpass"
          id="pass2"
          placeholder="Comfirm Password..."
          onChange={checkPass}
        />
        <div className="passmatch" id="passMsg"></div>
        <div
          className="passmatch"
          id="firebaseMsg"
          style={{ color: "#FF9E9E" }}
        >
          {errReg}
        </div>
        {passMatch && (
          <button id="signBtn" onClick={registerUser}>
            Register
          </button>
        )}
        {!passMatch && (
          <button id="signBtn" style={{ opacity: "20%" }}>
            Register
          </button>
        )}
      </div>
    </div>
  );
}

export default Register;
