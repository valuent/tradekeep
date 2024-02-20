import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../service/DataContext";
import { db } from "../../utils/config";
import { setDoc, updateDoc, doc, deleteField } from "firebase/firestore";
import "../../style/app.css";

import TradeInfo from "../tradeinfocomp/TradeInfo";
import EditEntry from "../editentrycomp/EditEntry";

function DataTable() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);
  const [allObject, setAllObject] = useState();
  const [tradeInfoKey, setTradeInfoKey] = useState("");
  const [displaySlice, setDisplaySlice] = useState(-10);

  const calculateROI = (totalPnl, totalInvestment) => {
    if (totalInvestment === 0) return "N/A"; // Handle division by zero
    return ((totalPnl / totalInvestment) * 100).toFixed(2) + "%"; // Calculate ROI and format it to two decimal places
  };

  useEffect(() => {
    const processTradeData = () => {
      let dataDocCount = Object.keys(allData);
      let data;

      for (let i = 1; i <= dataDocCount.length; i++) {
        let docName = "tradeDoc_" + i;
        data = Object.assign({}, data, allData[docName]);
      }
      let arrayOfObjects;

      if (data != undefined) {
        arrayOfObjects = Object.values(data);
        arrayOfObjects?.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      setAllObject(arrayOfObjects);
    };
    processTradeData();
  }, [allData]);

  let trailingPnl = 0;
  useEffect(() => {
    allObject?.forEach((key) => {
      userData?.strategytags?.forEach((element) => {
        let stat = element;
        trailingPnl += key[stat]?.pnl || 0;
      });
    });
  }, [allObject]);

  const deleteEntry = async (entryId) => {
    // const docRef = doc(db, "users", userAuthState.email, "userTradeData");
    Object.keys(allData).forEach(async (key) => {
      let docRef = doc(db, "users", userAuthState.email, "userTradeData", key);
      await updateDoc(docRef, {
        [entryId]: deleteField(),
      });
    });
  };

  const getTradeInfo = (trade) => {
    setTradeInfoKey(trade);
    document.getElementById("tradeInfoContainer").style.top = "10%";
  };

  const editTradeInfo = (trade) => {
    setTradeInfoKey(trade);
    document.getElementById("editEntryContainer").style.top = "10%";
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      {/* {tradeInfoKey && <TradeInfo />} */}
      <TradeInfo tradeKey={tradeInfoKey} userData={userData} />
      <EditEntry entryData={tradeInfoKey} />
      <div className="mb-0.5 w-11/12 ">
        <select
          className="select select-bordered select-sm sticky w-40 max-w-xs self-start"
          onChange={(e) => {
            setDisplaySlice(e.target.value);
          }}
        >
          <option value={-10}>Show latest 10</option>
          <option value={-20}>Show latest 20</option>
          <option value={-50}>Show latest 50</option>
          <option value={0}>Show all</option>
        </select>
      </div>
      <div className="max-h-[75vh] w-11/12 overflow-x-auto overflow-y-auto">
        <table className="table table-pin-rows table-pin-cols table-lg">
          <thead className="text-center text-sm ">
            <tr key="1" className=" bg-base-200">
              <th className="bg-base-200">Date</th>
              {userData?.strategytags?.map((element) => {
                return <td key={element}>{element}</td>;
              })}
              <td>Total</td>
              <td>ROI</td>
              <td>Trailing P/L</td>
              <td className="w-20 bg-base-200">All Info</td>
              <td className="w-20 bg-base-200">Edit/Delete</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {allObject?.slice(displaySlice).map((key) => {
              let total = userData?.strategytags?.reduce((acc, element) => {
                let stat = element;
                return acc + (key[stat]?.pnl || 0); // Use optional chaining and default value to handle undefined or null
              }, 0);
              let prevTrailingPnl = trailingPnl;
              trailingPnl = prevTrailingPnl + total;
              let totalInvestment = userData?.userInfo?.capital; // Total capital invested for ROI calculation
              let roi = calculateROI(total, totalInvestment); // Calculate ROI// Initialize accumulator with 0
              return (
                <tr key={key.id} className="font-bold">
                  <th key={key.id}>{key.date}</th>
                  {userData?.strategytags?.map((element) => {
                    let stat = element;

                    return (
                      <td
                        className={
                          key[stat]?.pnl > 0 ? "text-green-400" : "text-red-400"
                        }
                        key={element}
                      >
                        {key[stat]?.pnl}
                      </td>
                    );

                    // return ;
                  })}
                  <td className={total > 0 ? "text-green-400" : "text-red-400"}>
                    {total}
                  </td>
                  <td className={total > 0 ? "text-green-400" : "text-red-400"}>
                    {roi}
                  </td>

                  {prevTrailingPnl < trailingPnl && (
                    <td className=" text-center text-green-400">
                      <div className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 15.75 7.5-7.5 7.5 7.5"
                          />
                        </svg>

                        {trailingPnl}
                      </div>
                    </td>
                  )}
                  {prevTrailingPnl > trailingPnl && (
                    <td className=" text-center text-red-400">
                      <div className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>

                        {trailingPnl}
                      </div>
                    </td>
                  )}
                  <td>
                    <button
                      className="text-light tra rounded bg-primary p-2 transition-all duration-200 hover:bg-secondary"
                      onClick={() => {
                        // deleteRowData(key);

                        getTradeInfo(key);
                      }}
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
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-light tra rounded bg-primary p-2 transition-all duration-200 hover:bg-secondary"
                      onClick={() => {
                        // deleteRowData(key);

                        editTradeInfo(key);
                        // deleteEntry(key.entryUid);
                      }}
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                  {/* Render total value */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
