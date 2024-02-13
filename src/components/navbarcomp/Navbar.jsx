import React, { useState } from "react";

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
    // document.getElementById("profileContainer").classList.add("top-32");
    // document.getElementById("profileContainer").classList.remove("top-full");
    document.getElementById("profileContainer").style.top = "10%";
  };

  return (
    <div class="navbar w-full bg-base-300 drop-shadow-md">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
          TradeKeep
        </a>
      </div>
      <label className="mr-8 flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input
          type="checkbox"
          value="cupcake"
          className="theme-controller toggle"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      {!visible && (
        <div class="flex-none">
          <div tabindex="0" role="button" class="avatar placeholder">
            {/* <div className="initialOfUser absolute bottom-0 left-0 right-0 m-auto">
                
              </div> */}
            <div
              className="w-12 rounded-full bg-neutral text-neutral-content"
              onClick={openProfile}
            >
              <span className="text-2xl">
                {userEmail?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
      {visible && (
        <div className="join join-vertical lg:join-horizontal">
          <button
            className="btn join-item"
            id="userStatebtn"
            onClick={openLogin}
          >
            Log In
          </button>
          <button
            className="btn join-item"
            id="userStatebtn"
            onClick={openRegister}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
