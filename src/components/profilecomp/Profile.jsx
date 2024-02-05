import React, { useState, useContext, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/config";
import { DataContext } from "../../service/DataContext";
import { DateTime } from "luxon";
import "./profile.css";

function Profile() {
  const { userData, userAuthState, siteDate } = useContext(DataContext);
  const [daysTillExpiry, setDaysTillExpiry] = useState("");

  var fetchedDate = String(userData?.subscriptionData?.subscriptionEndDate);
  var subEndDate = DateTime.fromFormat(fetchedDate, "d-M-yyyy");

  const closeProfile = () => {
    document.getElementById("profileContainer").style.top = "100%";
  };
  const signOutUser = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const calculatDaysTillExpiry = () => {
      setDaysTillExpiry(Math.floor(subEndDate?.diff(siteDate).as("days")));
    };
    calculatDaysTillExpiry();
  }, [userData]);

  // const uInfo = userData.userInfo;

  return (
    <div
      className="profileInvisibleContainer"
      onClick={closeProfile}
      id="profileContainer"
    >
      <div className="profileContainer">
        <div className="exit" onClick={closeProfile}>
          <div className="line1"></div>
          <div className="line2"></div>
        </div>

        <div className="profileIconLetter">
          {userAuthState?.email?.charAt(0).toUpperCase()}
        </div>

        <div className="profileEmail">{userAuthState?.email}</div>

        <div className="subscriptionData">
          <div className="type">Plan: {userData?.userInfo?.useType}</div>
          <div className="expiration">{daysTillExpiry} days left</div>
        </div>
        <div className="signOutBtn" onClick={signOutUser}>
          Sign Out
        </div>
      </div>
    </div>
  );
}

export default Profile;
