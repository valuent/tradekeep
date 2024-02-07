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

  const currentStrategy = (strategyData) => {
    setStrategyTag(JSON.parse(strategyData));
  };

  useEffect(() => {
    console.log(strategyTag);
  }, [strategyTag]);

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (index) => {
    setActiveButton(index);
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
        <div className="title">Select strategy to enter trade data</div>
        <div className="strategyBtn">
          {userData?.strategytags.map((strategy, i) => {
            let jsonStringStrategy = JSON.stringify({
              strategyName: strategy,
              strategyNumber: i,
            });
            return (
              <button
                key={i}
                className={i === activeButton ? "active" : "inactive"}
                onClick={(e) => {
                  currentStrategy(jsonStringStrategy);
                  handleClick(i);
                }}
              >
                {strategy}
              </button>
            );
          })}
        </div>
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

      <div className="addMoreInfoBtn">
        <span>Add Trade-wise Data</span>
        <img src={addInfosvg} />
      </div>
    </div>
  );
}

export default AddTrade;
