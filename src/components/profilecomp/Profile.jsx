import React, { useState, useContext, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/config";
import { DataContext } from "../../service/DataContext";
import { DateTime } from "luxon";
// import "./profile.css";

function Profile() {
  const { userData, userAuthState, siteDate } = useContext(DataContext);
  const [daysTillExpiry, setDaysTillExpiry] = useState("");

  var fetchedDate = String(userData?.subscriptionData?.subscriptionEndDate);
  var subEndDate = DateTime.fromFormat(fetchedDate, "d-M-yyyy");

  const closeProfile = () => {
    document.getElementById("profileContainer").classList.remove("top-1/5");
    document.getElementById("profileContainer").classList.add("top-full");
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
    // <div
    //   className="profileInvisibleContainer"
    //   onClick={closeProfile}
    //   id="profileContainer"
    // >
    //   <div className="profileContainer">
    //     <div className="exit" onClick={closeProfile}>
    //       <div className="line1"></div>
    //       <div className="line2"></div>
    //     </div>

    //     <div className="profileIconLetter">
    //       {userAuthState?.email?.charAt(0).toUpperCase()}
    //     </div>

    //     <div className="profileEmail">{userAuthState?.email}</div>

    //     <div className="subscriptionData">
    //       <div className="type">Plan: {userData?.userInfo?.useType}</div>
    //       <div className="expiration">{daysTillExpiry} days left</div>
    //     </div>
    //     <div className="signOutBtn" onClick={signOutUser}>
    //       Sign Out
    //     </div>
    //   </div>
    // </div>
    <div
      className="card absolute left-0 right-0 m-auto h-fit max-w-2xl bg-base-200 shadow-xl "
      onClick={closeProfile}
      id="profileContainer"
    >
      <div className="card-body">
        <button
          className="hover btn btn-square absolute right-3 top-3 max-h-10 w-12 bg-primary hover:bg-red-500 "
          onClick={closeProfile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
