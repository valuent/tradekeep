import React, { useState, useEffect, useContext } from "react";
import { db } from "../../utils/config";
import {
  collection,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  documentId,
} from "firebase/firestore";
import "./addtrade.css";
import { DataContext } from "../../service/DataContext";
import addInfosvg from "../../assets/addIcon.svg";

function AddTrade() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);
  const [activeButton, setActiveButton] = useState(null);
  const [activeTradeButton, setActiveTradeButton] = useState(null);
  const [tempToRefreshPnl, setTempToRefreshPnl] = useState(null);

  const [tradeDataObject, setTradeDataObject] = useState({});

  const [tradeEntryCount, setTradeEntryCount] = useState();

  const [strategyTag, setStrategyTag] = useState();
  const [isTradewise, setIsTradewise] = useState(0);
  const [numberOfTrades, setNumberOfTrades] = useState();
  const [activeTradeTag, setActiveTradeTag] = useState();
  const [tradeType, setTradeType] = useState();
  const [tradeDirection, setTradeDirection] = useState();

  const [saveTradePop, setSaveTradePop] = useState(false);

  // cont[(arrayForPnl, setArrayForPnl)] = useState();
  useEffect(() => {
    const countEntries = () => {
      if (userData && allData) {
        let writableDoc = userData?.tradeWritableDoc;
        let lastDoc = allData[writableDoc];
        if (lastDoc && writableDoc) {
          let lastWrittenUid = Object.keys(lastDoc)?.at(-1);
          setTradeEntryCount(parseInt(lastWrittenUid) + 1);
        }
      }
    };
    countEntries();
  }, [allData, userData]);

  useEffect(() => {
    console.log(tradeDataObject[tradeEntryCount]);
    // console.log(numberOfTrades);
    // console.log(strategyTag);
    // console.log(activeTradeTag);
  }, [tradeDataObject, numberOfTrades, strategyTag, activeTradeTag]);

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
    setActiveTradeButton(null);
  }, [strategyTag]);

  useEffect(() => {
    if (
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag].hasOwnProperty("detail")
    ) {
      setIsTradewise(1);
    } else {
      setIsTradewise(0);
    }
  }, [strategyTag, tradeDataObject]);

  useEffect(() => {
    if (
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"]["noOfTrade"] &&
      isTradewise == 1
    ) {
      setNumberOfTrades(
        Array.from(
          {
            length: parseInt(
              tradeDataObject[tradeEntryCount][strategyTag]["detail"][
                "noOfTrade"
              ]
            ),
          },
          (_, index) => +index + 1
        )
      );
      document.getElementById("numberOfTrades").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"]["noOfTrade"]
      );
      // Start Of dynamic PnL
    } else if (document.getElementById("numberOfTrades")) {
      document.getElementById("numberOfTrades").value = 0;
      setNumberOfTrades(
        Array.from(
          {
            length: parseInt(0),
          },
          (_, index) => +index + 1
        )
      );
    }
  }, [
    isTradewise,
    tradeDataObject,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("tradeScripName") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "scripName"
      ]
    ) {
      document.getElementById("tradeScripName").value =
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "scripName"
        ];
    } else if (
      document.getElementById("tradeScripName") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "scripName"
      ]
    ) {
      document.getElementById("tradeScripName").value = "";
    }
  }, [activeTradeButton, strategyTag, activeTradeTag]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "tradeType"
      ]
    ) {
      setTradeType(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "tradeType"
        ]
      );
    } else {
      setTradeType(null);
    }
  }, [activeTradeButton, strategyTag, activeTradeTag]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "direction"
      ]
    ) {
      setTradeDirection(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "direction"
        ]
      );
    } else {
      setTradeDirection(null);
    }
  }, [activeTradeButton, strategyTag, activeTradeTag]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("quantity") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "quantity"
      ]
    ) {
      document.getElementById("quantity").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "quantity"
        ]
      );
    } else if (
      document.getElementById("quantity") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "quantity"
      ]
    ) {
      document.getElementById("quantity").value = 0;
    }
  }, [
    tradeType,
    tradeDirection,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("entryPrice") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "entryPrice"
      ]
    ) {
      document.getElementById("entryPrice").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "entryPrice"
        ]
      );
    } else if (
      document.getElementById("entryPrice") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "entryPrice"
      ]
    ) {
      document.getElementById("entryPrice").value = 0;
    }
  }, [
    tradeType,
    tradeDirection,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("exitPrice") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "exitPrice"
      ]
    ) {
      document.getElementById("exitPrice").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "exitPrice"
        ]
      );
    } else if (
      document.getElementById("exitPrice") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "exitPrice"
      ]
    ) {
      document.getElementById("exitPrice").value = 0;
    }
  }, [
    tradeType,
    tradeDirection,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("tradePnlInput") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "pnl"
      ]
    ) {
      document.getElementById("tradePnlInput").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "pnl"
        ]
      );
    } else if (
      document.getElementById("tradePnlInput") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "pnl"
      ]
    ) {
      document.getElementById("tradePnlInput").value = 0;
    }
  }, [
    tradeType,
    tradeDirection,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      activeTradeButton != null &&
      document.getElementById("tradePnlInputND") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "pnl"
      ]
    ) {
      document.getElementById("tradePnlInputND").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "pnl"
        ]
      );
    } else if (
      document.getElementById("tradePnlInputND") &&
      tradeDataObject[tradeEntryCount] &&
      tradeDataObject[tradeEntryCount][strategyTag] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"] &&
      tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag] &&
      !tradeDataObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
        "pnl"
      ]
    ) {
      document.getElementById("tradePnlInputND").value = 0;
    }
  }, [
    tradeType,
    tradeDirection,
    strategyTag,
    activeTradeButton,
    activeTradeTag,
  ]);

  useEffect(() => {
    if (
      tradeType == "Directional" &&
      document.getElementById("quantity") &&
      document.getElementById("entryPrice") &&
      document.getElementById("exitPrice") &&
      document.getElementById("tradePnlInput")
    ) {
      if (tradeDirection == "Long") {
        let sum =
          parseFloat(document.getElementById("exitPrice").value) -
          parseFloat(document.getElementById("entryPrice").value);

        sum = sum * document.getElementById("quantity").value;
        document.getElementById("tradePnlInput").value = sum;
        let pnlTrade = parseFloat(
          document.getElementById("tradePnlInput").value
        );
        let updatedObject = Object.assign({}, tradeDataObject);
        updatedObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "pnl"
        ] = pnlTrade;
        setTradeDataObject(updatedObject);
      } else if (tradeDirection == "Short") {
        let sum =
          parseFloat(document.getElementById("exitPrice").value) -
          parseFloat(document.getElementById("entryPrice").value);
        sum = sum * -document.getElementById("quantity").value;
        document.getElementById("tradePnlInput").value = sum;
        let pnlTrade = parseFloat(
          document.getElementById("tradePnlInput").value
        );
        let updatedObject = Object.assign({}, tradeDataObject);
        updatedObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "pnl"
        ] = pnlTrade;
        setTradeDataObject(updatedObject);
      }
    }
  }, [tradeType, tradeDirection, tempToRefreshPnl]);

  const saveTradeDataToDb = async () => {
    await setDoc(
      doc(
        db,
        "users",
        userAuthState?.email,
        "userTradeData",
        userData["tradeWritableDoc"]
      ),
      tradeDataObject,
      { merge: true }
    ).then(() => {
      setSaveTradePop(false);
      closeAddTrade();
      setTradeDataObject({});
    });
  };

  const checkSizeAndAddDoc = async () => {
    if (userData && allData) {
      let writableDoc = userData?.tradeWritableDoc;
      let currentSetDocSize = JSON.stringify(allData[writableDoc]).length;
      let numberOfDocs = Object.keys(allData).length;
      let nextDocNumber = numberOfDocs + 1;
      let nextDocName = "tradeDoc_" + nextDocNumber;
      if (currentSetDocSize > 1024000) {
        const userTradeDataAddDoc = await setDoc(
          doc(db, "users", userAuthState?.email, "userTradeData", nextDocName),
          {}
        );

        await updateDoc(doc(db, "users", userAuthState?.email), {
          tradeWritableDoc: nextDocName,
        });
        console.log("wrote");
      }
    }
  };

  const closeAddTrade = () => {
    document.getElementById("addTradeContainer").style.top = "100%";
    document.getElementById("dateDropDown").value = null;
    setTradeDataObject({});

    setActiveButton(null);
    setActiveTradeButton(null);
    setTempToRefreshPnl(null);
    setTradeDataObject(null);
    setStrategyTag(null);
    setIsTradewise(null);
    setNumberOfTrades(null);
    setActiveTradeTag(null);
    setTradeType(null);
    setTradeDirection(null);
  };
  return (
    <div className="addTradeContainer" id="addTradeContainer">
      {saveTradePop === true && (
        <div className="confirmSave" id="saveConfirmPop">
          <div className="message">
            <span className="warning">Warning</span>
            <span className="msg">
              Are you sure you want to save the entered data?
            </span>
          </div>
          <div className="buttonsConfirm">
            <button
              onClick={() => {
                setSaveTradePop(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveTradeDataToDb();
              }}
            >
              Save Data
            </button>
          </div>
        </div>
      )}
      <div
        className="exit"
        onClick={() => {
          closeAddTrade();
        }}
      >
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="title">Add Trade</div>
      {/* Date Selection */}
      <div className="dateSelection">
        <label htmlFor="date">Select date</label>
        <input
          type="date"
          name="dateDropDown"
          id="dateDropDown"
          onChange={(e) => {
            let updatedObject = {
              [tradeEntryCount]: { date: e.target.value },
            };
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
      {tradeDataObject[tradeEntryCount] && strategyTag && (
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
      {tradeDataObject[tradeEntryCount] && strategyTag && isTradewise == 0 && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            let updatedObject = Object.assign({}, tradeDataObject);
            updatedObject[tradeEntryCount][strategyTag]["detail"] = {};
            setTradeDataObject(updatedObject);
          }}
        >
          <span>Add Trade-wise Data</span>
          <img src={addInfosvg} />
        </div>
      )}
      {tradeDataObject[tradeEntryCount] && strategyTag && isTradewise == 1 && (
        <div
          className="addMoreInfoBtn"
          onClick={() => {
            let updatedObject = Object.assign({}, tradeDataObject);
            delete updatedObject[tradeEntryCount][strategyTag]["detail"];
            setTradeDataObject(updatedObject);
          }}
        >
          <span>Remove Trade-wise Data</span>
          <img src={addInfosvg} className="removeTradewise" />
        </div>
      )}
      {tradeDataObject[tradeEntryCount] && isTradewise == 1 && (
        <div className="numOfTrades">
          <div className="title">Input number of trades for {strategyTag}</div>
          <input
            id="numberOfTrades"
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
              let noOfTradeObject = parseInt(e.target.value);
              let updatedObject = Object.assign({}, tradeDataObject);
              updatedObject[tradeEntryCount][strategyTag]["detail"][
                "noOfTrade"
              ] = noOfTradeObject;
              setTradeDataObject(updatedObject);
            }}
          />
        </div>
      )}
      {tradeDataObject[tradeEntryCount] && isTradewise == 1 && (
        <div className="tradeSelectionMenu">
          {/* <button className={i === activeTradeButton ? "active" : "inactive"}>
          Trade 1
        </button> */}
          {numberOfTrades?.map((i) => {
            let tradeName = "trade_" + i;
            return (
              <button
                key={i}
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
      )}
      {tradeDataObject[tradeEntryCount] &&
        isTradewise == 1 &&
        activeTradeTag &&
        numberOfTrades.length > 0 &&
        activeTradeButton && (
          <div className="tradeWiseInputs">
            <div className="title">
              {activeTradeTag
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
            <div className="tradeDataInput">
              <div className="title">Add Scrip Name</div>
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
            </div>
            <div className="tradeTypeBtn">
              <button
                className={
                  tradeType == "Directional"
                    ? "tradeType active"
                    : "tradeType inactive"
                }
                onClick={(e) => {
                  let tradeType = "Directional";
                  let updatedObject = Object.assign({}, tradeDataObject);
                  updatedObject[tradeEntryCount][strategyTag]["detail"][
                    activeTradeTag
                  ]["tradeType"] = tradeType;
                  setTradeDataObject(updatedObject);
                  setTradeType("Directional");
                }}
              >
                Directional
              </button>
              <button
                className={
                  tradeType == "Non-Directional"
                    ? "tradeType active"
                    : "tradeType inactive"
                }
                onClick={(e) => {
                  let tradeType = "Non-Directional";
                  let updatedObject = Object.assign({}, tradeDataObject);
                  updatedObject[tradeEntryCount][strategyTag]["detail"][
                    activeTradeTag
                  ]["tradeType"] = tradeType;
                  setTradeDataObject(updatedObject);
                  setTradeType("Non-Directional");
                }}
              >
                Non-Directional
              </button>
            </div>
            {tradeType == "Directional" && (
              <div className="directionSelectBtn">
                <button
                  className={
                    tradeDirection == "Long"
                      ? "direction active"
                      : "direction inactive"
                  }
                  onClick={(e) => {
                    let tradeDirection = "Long";
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategyTag]["detail"][
                      activeTradeTag
                    ]["direction"] = tradeDirection;
                    setTradeDataObject(updatedObject);
                    setTradeDirection("Long");
                  }}
                >
                  Long
                </button>
                <button
                  className={
                    tradeDirection == "Short"
                      ? "direction active"
                      : "direction inactive"
                  }
                  onClick={(e) => {
                    let tradeDirection = "Short";
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategyTag]["detail"][
                      activeTradeTag
                    ]["direction"] = tradeDirection;
                    setTradeDataObject(updatedObject);
                    setTradeDirection("Short");
                  }}
                >
                  Short
                </button>
              </div>
            )}

            {tradeType == "Directional" && tradeDirection && (
              <div className="tradeDataInput">
                <div className="title">Add Qty</div>
                <input
                  type="number"
                  id="quantity"
                  step={1}
                  placeholder="Quantity"
                  onChange={(e) => {
                    let tradeQty = parseInt(e.target.value);
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategyTag]["detail"][
                      activeTradeTag
                    ]["quantity"] = tradeQty;
                    setTradeDataObject(updatedObject);
                    setTempToRefreshPnl(tradeQty);
                  }}
                />
              </div>
            )}
            {tradeType == "Directional" && tradeDirection && (
              <div className="tradeDataInput">
                <div className="title">Add Entry Price</div>
                <input
                  type="number"
                  name=""
                  id="entryPrice"
                  step={0.05}
                  placeholder="Entry Price"
                  onChange={(e) => {
                    let entryPrice = parseFloat(e.target.value);
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategyTag]["detail"][
                      activeTradeTag
                    ]["entryPrice"] = entryPrice;
                    setTradeDataObject(updatedObject);
                    setTempToRefreshPnl(entryPrice);
                  }}
                />
              </div>
            )}
            {tradeType == "Directional" && tradeDirection && (
              <div className="tradeDataInput">
                <div className="title">Add Exit Price</div>
                <input
                  type="number"
                  name=""
                  id="exitPrice"
                  step={0.05}
                  placeholder="Exit Price"
                  onChange={(e) => {
                    let exitPrice = parseFloat(e.target.value);
                    let updatedObject = Object.assign({}, tradeDataObject);
                    updatedObject[tradeEntryCount][strategyTag]["detail"][
                      activeTradeTag
                    ]["exitPrice"] = exitPrice;
                    setTradeDataObject(updatedObject);
                    setTempToRefreshPnl(exitPrice);
                  }}
                />
              </div>
            )}
            {tradeType == "Directional" && (
              <div className="tradeDataInput">
                <div className="title">Add Pnl</div>
                <input
                  type="number"
                  name=""
                  id="tradePnlInput"
                  step={0.05}
                  placeholder="Profit/Loss"
                  onChange={(e) => {
                    if (tradeType == "Non-Directional") {
                      let pnl = parseFloat(e.target.value);
                      let updatedObject = Object.assign({}, tradeDataObject);
                      updatedObject[tradeEntryCount][strategyTag]["detail"][
                        activeTradeTag
                      ]["pnl"] = pnl;
                      setTradeDataObject(updatedObject);
                    }
                  }}
                />
              </div>
            )}

            {tradeType == "Non-Directional" && (
              <div className="tradeDataInput">
                <div className="title">Add Pnl</div>
                <input
                  type="number"
                  name=""
                  id="tradePnlInputND"
                  step={0.05}
                  placeholder="Profit/Loss"
                  onChange={(e) => {
                    if (tradeType == "Non-Directional") {
                      let pnl = parseFloat(e.target.value);
                      let updatedObject = Object.assign({}, tradeDataObject);
                      updatedObject[tradeEntryCount][strategyTag]["detail"][
                        activeTradeTag
                      ]["pnl"] = pnl;
                      setTradeDataObject(updatedObject);
                    }
                  }}
                />
              </div>
            )}
          </div>
        )}
      {tradeDataObject[tradeEntryCount] &&
        tradeEntryCount >= 0 &&
        strategyTag && (
          <div className="finalButton">
            <button
              className="Confirm"
              onClick={() => {
                setSaveTradePop(true);
                checkSizeAndAddDoc();
              }}
            >
              Confirm
            </button>
          </div>
        )}
    </div>
  );
}

export default AddTrade;
