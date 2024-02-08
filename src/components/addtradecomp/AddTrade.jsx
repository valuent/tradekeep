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

  const [strategyTag, setStrategyTag] = useState();
  const [isTradewise, setIsTradewise] = useState(0);
  const [numberOfTrades, setNumberOfTrades] = useState();
  const [activeTradeButton, setActiveTradeButton] = useState();
  const [activeTradeTag, setActiveTradeTag] = useState();

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

  useEffect(() => {
    console.log(tradeDataObject[tradeEntryCount]);
  }, [tradeDataObject, numberOfTrades]);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const handleTradeBtnClick = (index) => {
    setActiveTradeButton(index);
  };

  useEffect(() => {
    if (document.getElementById("pnlInput")) {
      document.getElementById("pnlInput").value =
        tradeDataObject[tradeEntryCount][strategyTag]["pnl"];
    }
  }, [strategyTag]);

  useEffect(() => {
    if (document.getElementById("tradeScripName")) {
      if (
        !tradeDataObject[tradeEntryCount][strategyTag]["detail"][
          activeTradeTag
        ]["scripName"]
      ) {
        document.getElementById("tradeScripName").value = "";
      } else {
        document.getElementById("tradeScripName").value =
          tradeDataObject[tradeEntryCount][strategyTag]["detail"][
            activeTradeTag
          ]["scripName"];
      }
    }
  }, [activeTradeTag]);

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
                    if (updatedObject[tradeEntryCount][strategy]) {
                      setStrategyTag(strategy);
                    } else {
                      updatedObject[tradeEntryCount][strategy] = strategyObject;
                      setTradeDataObject(updatedObject);
                      setStrategyTag(strategy);
                    }
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
            id="pnlInput"
            step={0.05}
            placeholder="Profit/Loss"
            onChange={(e) => {
              let pnlObject = parseFloat(e.target.value);
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag]["pnl"] = pnlObject;
              setTradeDataObject(updatedObject);
            }}
          />
        </div>
      )}
      {strategyTag && isTradewise == 0 && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            setIsTradewise(1);
          }}
        >
          <span>Add Trade-wise Data</span>
          <img src={addInfosvg} />
        </div>
      )}
      {strategyTag && isTradewise == 1 && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            setIsTradewise(0);
            // let updatedObject = Object.assign({}, tradeDataObject);
            // delete updatedObject[tradeEntryCount][strategyTag]["detail"];
            // setTradeDataObject(updatedObject);
          }}
        >
          <span>Remove Trade-wise Data</span>
          <img src={addInfosvg} className="removeTradewise" />
        </div>
      )}
      {isTradewise == 1 && (
        <div className="numOfTrades">
          <div className="title">Input number of trades for {strategyTag}</div>
          <input
            type="number"
            step={1}
            pattern="[0-9]*"
            placeholder="No. of trades"
            onInput={(e) => {
              if (e.target.value > 20) {
                e.target.value = 20;
              }
            }}
            onChange={(e) => {
              let noOfTradeObject = { noOfTrade: parseInt(e.target.value) };
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag]["detail"] =
                noOfTradeObject;
              setTradeDataObject(updatedObject);
              setNumberOfTrades(
                Array.from(
                  { length: parseInt(e.target.value) },
                  (_, index) => +index + 1
                )
              );
            }}
          />
        </div>
      )}
      <div className="tradeSelectionMenu">
        {/* <button className={i === activeTradeButton ? "active" : "inactive"}>
          Trade 1
        </button> */}
        {numberOfTrades?.map((i) => {
          let tradeName = "trade_" + i;
          return (
            <button
              className={i === activeTradeButton ? "active" : "inactive"}
              onClick={(e) => {
                let tradeObject = {};
                let updatedObject = Object.assign({}, tradeDataObject);
                if (
                  updatedObject[tradeEntryCount][strategyTag]["detail"][
                    tradeName
                  ]
                ) {
                  setActiveTradeTag(tradeName);
                } else {
                  updatedObject[tradeEntryCount][strategyTag]["detail"][
                    tradeName
                  ] = tradeObject;
                  setTradeDataObject(updatedObject);
                  setActiveTradeTag(tradeName);
                }
                handleTradeBtnClick(i);
              }}
            >
              Trade {i}
            </button>
          );
        })}
      </div>
      {activeTradeTag && (
        <div className="tradeWiseInputs">
          <div className="title">Trade 1</div>
          <input
            type="text"
            pattern="[^' ']+"
            name=""
            id="tradeScripName"
            placeholder="Scrip Name"
            style={{ textTransform: "uppercase" }}
            onClick={(e) => {
              const input = document.getElementById("tradeScripName");
              input.addEventListener("keypress", function (e) {
                if (e.key === " ") {
                  e.preventDefault();
                }
              });
            }}
            onChange={(e) => {
              let tradeInfoData = e.target.value.toUpperCase();
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag]["detail"][
                activeTradeTag
              ]["scripName"] = tradeInfoData;
              setTradeDataObject(updatedObject);
            }}
          />
          <div className="tradeTypeBtn">
            <button className="tradeType">Directional</button>
            <button className="tradeType">Non-Directional</button>
          </div>
          <div className="directionSelectBtn">
            <button className="direction">Long</button>
            <button className="direction">Short</button>
          </div>

          <input
            type="number"
            name=""
            id="tradePnlInput"
            step={0.05}
            placeholder="Profit/Loss"
          />
        </div>
      )}
      {/* <div className="finalButtons">
        <button className="Confirm">Confirm</button>
        <button className="Save"></button>
      </div> */}
    </div>
  );
}

export default AddTrade;
