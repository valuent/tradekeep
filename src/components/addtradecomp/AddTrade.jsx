import React, { useState, useEffect, useContext } from "react";
import { db } from "../../utils/config";
import {
  collection,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import "./addtrade.css";
import { DataContext } from "../../service/DataContext";
import addInfosvg from "../../assets/addIcon.svg";

function AddTrade() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);

  const [tradeDataObject, setTradeDataObject] = useState({});
  const [tradeEntryCount, setTradeEntryCount] = useState();
  const [tradeEntryDate, setTradeEntryDate] = useState();
  const [strategyTag, setStrategyTag] = useState();

  useEffect(() => {
    const countEntries = () => {
      let dataCount = Object.keys(allData).length;
      let dataEntryCount = 0;
      for (let i = 1; i <= dataCount; i++) {
        let docname = "tradeDoc_" + i;
        dataEntryCount = dataEntryCount + Object.keys(allData[docname]).length;
      }
      setTradeEntryCount(dataEntryCount);
      console.log("data", dataEntryCount);
    };
    countEntries();
  }, [allData]);

  const setCurrentStrategy = (strategyData) => {
    setStrategyTag(JSON.parse(strategyData));
  };
  return (
    <div className="addTradeContainer">
      <div className="title">Add Trade</div>

      {/* Date Selection */}
      <div className="dateSelection">
        <label htmlFor="date">Select date</label>
        <input
          type="date"
          name="dateDropDown"
          id="dateDropDown"
          onChange={(e) => {
            setTradeEntryDate(e.target.value);
          }}
        />
      </div>

      {/* StrategySelection */}

      <div className="strategySelection">
        <div className="stratname">
          <label htmlFor="selectStrategy">
            Select strategy to enter trade data
          </label>
          <select
            name="strategyName"
            id="strategyselection"
            onChange={(e) => {
              setCurrentStrategy(e.target.value);
            }}
          >
            <option disabled selected value="0">
              --Select Strategy--
            </option>
            {userData?.strategytags.map((strategy, i) => {
              let jsonStringStrategy = JSON.stringify({
                strategyName: strategy,
                strategyNumber: i,
              });
              return <option value={jsonStringStrategy}>{strategy}</option>;
            })}
          </select>
        </div>

        <div className="pnl">
          <label htmlFor="AddPNL">Enter PnL for "Strategy"</label>
          <input
            type="number"
            name=""
            id=""
            step={0.05}
            placeholder="Profit/Loss"
          />
        </div>
      </div>
      <div className="addMoreInfoBtn">
        <div className="infoAddingButton">
          <img src={addInfosvg} />
          <span>Add Trade-wise Data</span>
        </div>
      </div>
    </div>
  );
}

export default AddTrade;
