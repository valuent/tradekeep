import React, { useState } from "react";
import "./navbar.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/config";
import logo from "../../assets/logosvg.svg";

function Navbar() {
  const [userEmail, setUserEmail] = useState({});
  const [visible, setVisible] = useState(true);
  onAuthStateChanged(auth, (currentUser) => {
    setUserEmail(currentUser);
    closeRegister();
    closeLogin();
    if (userEmail?.email) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const closeLogin = () => {
    document.getElementById("logcontainer").style.top = "100%";
  };

  const closeRegister = () => {
    document.getElementById("regcontainer").style.top = "100%";
  };

  const openRegister = () => {
    document.getElementById("regcontainer").style.top = "0%";
  };
  const openLogin = () => {
    document.getElementById("logcontainer").style.top = "0%";
  };
  const openProfile = () => {
    document.getElementById("profileContainer").style.top = "0%";
  };

  return (
    <div className="nav">
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="profile">
        {visible && (
          <div className="login" id="userStatebtn" onClick={openLogin}>
            Login
          </div>
        )}
        {visible && (
          <div className="login reg" id="userStatebtn" onClick={openRegister}>
            Sign Up
          </div>
        )}
        {!visible && (
          <div className="profile-icon">
            <div className="userEmail" onClick={openProfile}>
              {userEmail?.email.charAt(0).toUpperCase() +
                userEmail?.email.slice(1, 8)}
            </div>

            <div className="icon" onClick={openProfile}>
              {userEmail?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
