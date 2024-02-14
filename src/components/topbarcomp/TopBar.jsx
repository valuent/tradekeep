import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../service/DataContext";

function TopBar() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);

  const [dataEntryCounter, setDataEntryCounter] = useState(0);

  useEffect(() => {
    const countEntries = () => {
      let dataCount = Object.keys(allData).length;
      let dataEntryCount = 0;
      for (let i = 1; i <= dataCount; i++) {
        let docname = "tradeDoc_" + i;
        dataEntryCount = dataEntryCount + Object.keys(allData[docname]).length;
      }
      setDataEntryCounter(dataEntryCount);
    };
    countEntries();
  }, [allData]);

  const openAddStrategy = () => {
    document.getElementById("addStratContainer").style.top = "10%";
  };

  const openAddTrade = () => {
    document.getElementById("addTradeContainer").style.top = "10%";
  };
  return (
    <div className="flex flex-col justify-between sm:flex-row">
      <ul className="menu menu-horizontal m-2 rounded-box bg-primary shadow-md">
        <li>
          <a className="hover:bg-primary0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </svg>
            </svg>
            Created: {userData?.userInfo?.registerDate}
          </a>
        </li>
        <li>
          <a className="focus:bg-primary0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </svg>
            Entries: {dataEntryCounter}
          </a>
        </li>
      </ul>
      <div className="join m-2 mr-2 mt-2 flex w-full justify-center drop-shadow-md sm:w-fit">
        <button
          className="btn join-item w-5/12 border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
          onClick={openAddStrategy}
        >
          Add Strategy
        </button>

        <button
          className="btn join-item w-5/12 border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
          onClick={openAddTrade}
        >
          Add Trade
        </button>
      </div>
    </div>
  );
}

export default TopBar;
