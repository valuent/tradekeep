import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../service/DataContext";
import "./topBar.css";

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
      console.log("data", dataEntryCount);
    };
    countEntries();
  }, [allData]);

  const openAddStrategy = () => {
    document.getElementById("addStratContainer").style.top = "0%";
  };

  return (
    <div className="topbarContainer">
      <div className="left">
        {allData && (
          <div className="createdDate">
            Created: {userData?.userInfo?.registerDate}
          </div>
        )}
        {allData && (
          <div className="entries">No. of Entries : {dataEntryCounter} </div>
        )}
        <div className="selectMenuShow">
          <span>Show:</span>
          <select type="range" name="" id="">
            <option value="10">Latest 10</option>
            <option value="20">Latest 20</option>
            <option value="50">Latest 50</option>
            <option value="all">Show all</option>
          </select>
        </div>
      </div>
      <div className="right">
        <div className="addStrategy" onClick={openAddStrategy}>
          Add Strategy
        </div>
        <div className="addTrade">Add Trade</div>
      </div>
    </div>
  );
}

export default TopBar;
