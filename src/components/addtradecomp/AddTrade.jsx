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
  const [activeButton, setActiveButton] = useState(null);

  const [tradeDataObject, setTradeDataObject] = useState({});

  const [tradeEntryCount, setTradeEntryCount] = useState();

  const [tradeEntryDate, setTradeEntryDate] = useState();
  const [strategyTag, setStrategyTag] = useState();
  const [isTradewise, setIsTradewise] = useState(false);
  const [numberOfTrades, setNumberOfTrades] = useState();

  let strategyPnL = {};

  useEffect(() => {
    const countEntries = () => {
      if (!tradeEntryCount) {
        let dataCount = Object.keys(allData).length;
        let dataEntryCount = 0;
        for (let i = 1; i <= dataCount; i++) {
          let docname = "tradeDoc_" + i;
          dataEntryCount =
            dataEntryCount + Object.keys(allData[docname]).length;
        }
        setTradeEntryCount(dataEntryCount);
        console.log("data", dataEntryCount);
      } else {
        console.log("data", tradeEntryCount);
      }
    };

    countEntries();
  }, [allData]);

  const currentStrategyPnl = (strategyName, pnl, noOfTrades) => {
    strategyPnL[strategyName] = pnl;
    console.log(strategyPnL);
  };

  const currentStrategy = (strategyData) => {
    setStrategyTag(JSON.parse(strategyData));
  };

  useEffect(() => {
    console.log(tradeDataObject[tradeEntryCount]);
  }, [tradeDataObject]);

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
            let updatedObject = { [tradeEntryCount]: { date: e.target.value } };
            setTradeDataObject(updatedObject);
          }}
        />
      </div>

      {/* StrategySelection */}
      {tradeDataObject[tradeEntryCount] && (
        <div className="strategySelection">
          <div className="title">Select strategy to enter trade data</div>
          <div className="strategyBtn">
            {userData?.strategytags.map((strategy, i) => {
              return (
                <button
                  key={i}
                  className={i === activeButton ? "active" : "inactive"}
                  onClick={(e) => {
                    let strategyObject = {};
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategy] = strategyObject;
                    setTradeDataObject(updatedObject);
                    setStrategyTag(strategy);
                    handleClick(i);
                  }}
                >
                  {strategy}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {strategyTag && (
        <div className="pnl">
          <label htmlFor="AddPNL">Enter PnL for {strategyTag}</label>
          <input
            type="number"
            name=""
            id=""
            step={0.05}
            placeholder="Profit/Loss"
            onChange={(e) => {
              let pnlObject = { pnl: parseFloat(e.target.value) };
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag] = pnlObject;
              setTradeDataObject(updatedObject);
            }}
          />
        </div>
      )}
      {strategyTag && !isTradewise && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            setIsTradewise(true);
          }}
        >
          <span>Add Trade-wise Data</span>
          <img src={addInfosvg} />
        </div>
      )}
      {strategyTag && isTradewise && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            setIsTradewise(false);
          }}
        >
          <span>Remove Trade-wise Data</span>
          <img src={addInfosvg} className="removeTradewise" />
        </div>
      )}
      {isTradewise && (
        <div div className="numOfTrades">
          <input
            type="number"
            name=""
            id=""
            min={1}
            max={10}
            step={1}
            pattern="[0-9]*"
            placeholder="Profit/Loss"
            onInput={(e) => {
              if (e.target.value > 5) {
                e.target.value = 5;
              }
            }}
            onChange={(e) => {
              let pnlObject = { noOfTrade: e.target.value };
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag]["detail"] = pnlObject;
              setTradeDataObject(updatedObject);
              setNumberOfTrades(parseInt(e.target.value));
            }}
          />
        </div>
      )}

      <div className="tradeWiseInputs">
        {/* <div className="title">Trade 1</div> */}
      </div>
    </div>
  );
}

export default AddTrade;
