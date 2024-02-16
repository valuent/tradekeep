import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../service/DataContext";

function DataTable() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);
  const [allObject, setAllObject] = useState();
  const [dataArray, setDataArray] = useState();

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

  // useEffect(() => {
  //   console.log(allObject);
  // }, [allObject]);
  let trailingPnl = 0;
  return (
    <div className="flex  items-center justify-center ">
      <div className="mt-6 max-h-[75vh] w-11/12 overflow-x-auto overflow-y-scroll">
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
              <td className="w-20 bg-base-200">Info/Edit</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {allObject?.map((key) => {
              let total = userData?.strategytags?.reduce((acc, element) => {
                let stat = element;
                return acc + (key[stat]?.pnl || 0); // Use optional chaining and default value to handle undefined or null
              }, 0);
              let prevTrailingPnl = trailingPnl;
              trailingPnl = prevTrailingPnl + total;
              let totalInvestment = 7200000; // Total capital invested for ROI calculation
              let roi = calculateROI(total, totalInvestment); // Calculate ROI// Initialize accumulator with 0
              return (
                <tr key={key.id}>
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
                    <td className="flex items-center justify-center text-center text-green-400">
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
                    </td>
                  )}
                  {prevTrailingPnl > trailingPnl && (
                    <td className="flex items-center justify-center text-center text-red-400">
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
                    </td>
                  )}
                  <td>
                    <a href={key.date}>....</a>
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
