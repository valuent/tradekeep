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
    // document.getElementById("profileContainer").classList.remove("top-32");
    // document.getElementById("profileContainer").classList.add("top-full");
    document.getElementById("profileContainer").style.top = "110%";
  };
  const signOutUser = async () => {
    await signOut(auth);
    closeProfile();
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
      className="card card-normal absolute left-0 right-0 top-full z-50 m-auto h-fit max-w-2xl bg-base-200 shadow-xl transition-all duration-100 ease-in-out "
      id="profileContainer"
    >
      <div className="card-body items-center text-center">
        <button
          className="hover btn btn-square btn-sm absolute right-3 top-3 bg-primary hover:bg-red-500 "
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

        <h2 className="card-title">Profile</h2>
        <div className="avatar placeholder ">
          <div className="w-16 rounded-full bg-neutral text-neutral-content">
            <span className="text-3xl">
              {userAuthState?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="stat-value mb-5 text-2xl">{userAuthState?.email}</div>

        <div className="mb-5 flex w-full justify-between">
          <div className="stats w-11/12 shadow sm:w-5/12">
            <div className="stat w-full ">
              <div className="stat-title">Plan</div>
              <div className="stat-value text-2xl">
                {userData?.userInfo?.useType}
              </div>
            </div>
          </div>
          <div className="stats w-11/12 shadow sm:w-5/12 ">
            <div className="stat w-full ">
              <div className="stat-title">Days left</div>
              <div className="stat-value text-2xl ">{daysTillExpiry}</div>
            </div>
          </div>
        </div>
        <button className="btn btn-wide border-primary bg-primary hover:border-secondary hover:bg-secondary">
          Subscribe
        </button>
        <button class="btn mt-2" onClick={signOutUser}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
