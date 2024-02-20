import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../service/DataContext";
import AddCapital from "./AddCapital";
import DataTable from "../datatablecomp/DataTable";

function TopBar() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);

  const [dataEntryCounter, setDataEntryCounter] = useState(0);
  const [dataTableSlice, setDataTableSlice] = useState(-10);

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

  const openAddCapital = () => {
    document.getElementById("addCapitalContainer").style.top = "10%";
  };
  return (
    <>
      <div className="flex flex-col justify-between lg:flex-row">
        <AddCapital />
        <ul className="menu menu-horizontal m-2 flex items-center justify-center rounded-box bg-primary shadow-md [&_li>*:not(ul):not(.menu-title):not(details):active]:bg-primary">
          <li>
            <a className="hover:bg-primary">
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
            <a className="hover:bg-primary">
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

          {userData?.userInfo?.capital ? (
            <li>
              <a className="hover:bg-primary">
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </svg>

                {userData?.userInfo?.capital}
              </a>
            </li>
          ) : null}

          <li>
            <a className="p-0 hover:bg-primary">
              <select
                className="select select-bordered select-sm mr-2 w-40 max-w-xs self-start bg-primary focus:outline-none"
                onChange={(e) => {
                  setDataTableSlice(e.target.value);
                }}
              >
                <option value={-10}>Show latest 10</option>
                <option value={-20}>Show latest 20</option>
                <option value={-50}>Show latest 50</option>
                <option value={0}>Show all</option>
              </select>
            </a>
          </li>
        </ul>
        <div className="join m-2 mr-2 mt-2 flex w-full justify-center drop-shadow-md lg:w-fit">
          {!userData?.userInfo?.capital ? (
            <button
              className="btn join-item  border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
              onClick={openAddCapital}
            >
              Add Capital
            </button>
          ) : (
            <button
              className="btn join-item  border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
              onClick={openAddCapital}
            >
              Edit Capital
            </button>
          )}

          <button
            className="btn join-item  border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
            onClick={openAddStrategy}
          >
            Add Strategy
          </button>

          <button
            className="btn join-item  border-primary bg-primary hover:border-secondary hover:bg-secondary sm:w-fit"
            onClick={openAddTrade}
          >
            Add Trade
          </button>
        </div>
      </div>
      <DataTable sliceValue={dataTableSlice} />
    </>
  );
}

export default TopBar;
