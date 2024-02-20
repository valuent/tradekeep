import React, { useContext, useState, useEffect } from "react";
import { db } from "../../utils/config";
import { doc, setDoc } from "firebase/firestore";
import { DataContext } from "../../service/DataContext";

function AddCapital() {
  const [capital, setCapital] = useState();
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);

  const addCapitalToDb = async () => {
    await setDoc(
      doc(db, "users", userAuthState?.email),
      {
        userInfo: { capital: parseFloat(capital) },
      },
      { merge: true },
    );
    closeAddCapital();
  };
  const closeAddCapital = () => {
    document.getElementById("addCapitalContainer").style.top = "100%";
    setCapital(null);
  };

  useEffect(() => {
    if (
      userData?.userInfo?.capital &&
      document.getElementById("capitalInput")
    ) {
      document.getElementById("capitalInput").value =
        userData?.userInfo?.capital;
    }
  }, [userData]);

  return (
    <div
      className="card fixed left-0 right-0 top-full z-50 m-auto w-96 bg-base-200  transition-all duration-100"
      id="addCapitalContainer"
    >
      <div className="card-body items-center text-center">
        <button
          onClick={closeAddCapital}
          className="btn btn-square btn-sm absolute right-3 top-3 border-primary bg-primary hover:border-red-500 hover:bg-red-500"
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
        <h2 className="card-title ">Add Capital</h2>
        Please add the total amount that you trade with to get ROI based
        calculation
        <input
          type="number"
          step={0.05}
          placeholder="Type here"
          id="capitalInput"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => {
            setCapital(e.target.value);
          }}
        />
        <div className="card-actions justify-end">
          <button
            className="btn border-0 bg-primary hover:border-0 hover:bg-secondary"
            onClick={addCapitalToDb}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCapital;
