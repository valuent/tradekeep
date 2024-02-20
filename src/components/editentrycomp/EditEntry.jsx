import React, { useState, useEffect, useContext } from "react";
import { db } from "../../utils/config";
import { setDoc, updateDoc, doc, deleteField } from "firebase/firestore";

import "../../style/app.css";
import { DataContext } from "../../service/DataContext";

function EditEntry({ entryData }) {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);
  const [start, setStart] = useState(false);

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
  const [deleteTradePop, setDeleteTradePop] = useState(false);

  const countEntries = () => {
    setTradeEntryCount(entryData.entryUid);
    setTradeDataObject({ [entryData.entryUid]: entryData });
  };

  useEffect(() => {
    if (document.getElementById("noteForDay")) {
      document.getElementById("noteForDay").value = entryData.note;
    }
  }, [strategyTag, tradeDataObject, tradeEntryCount]);

  //   useEffect(() => {
  //     console.log(tradeDataObject);
  //   }, [tradeDataObject]);

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
              ],
            ),
          },
          (_, index) => +index + 1,
        ),
      );
      document.getElementById("numberOfTrades").value = parseInt(
        tradeDataObject[tradeEntryCount][strategyTag]["detail"]["noOfTrade"],
      );
      // Start Of dynamic PnL
    } else if (document.getElementById("numberOfTrades")) {
      document.getElementById("numberOfTrades").value = 0;
      setNumberOfTrades(
        Array.from(
          {
            length: parseInt(0),
          },
          (_, index) => +index + 1,
        ),
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
        ],
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
          document.getElementById("tradePnlInput").value,
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
          document.getElementById("tradePnlInput").value,
        );
        let updatedObject = Object.assign({}, tradeDataObject);
        updatedObject[tradeEntryCount][strategyTag]["detail"][activeTradeTag][
          "pnl"
        ] = pnlTrade;
        setTradeDataObject(updatedObject);
      }
    }
  }, [tradeType, tradeDirection, tempToRefreshPnl]);

  const deleteEntry = async (entryId) => {
    // const docRef = doc(db, "users", userAuthState.email, "userTradeData");
    Object.keys(allData).forEach(async (key) => {
      let docRef = doc(db, "users", userAuthState.email, "userTradeData", key);
      await updateDoc(docRef, {
        [entryId]: deleteField(),
      }).then(() => {
        setSaveTradePop(false);
        closeEditEntry();
      });
    });
  };

  const saveTradeDataToDb = async (entryId) => {
    // const docRef = doc(db, "users", userAuthState.email, "userTradeData");
    Object.keys(allData).forEach(async (key) => {
      let docRef = doc(db, "users", userAuthState.email, "userTradeData", key);
      await updateDoc(docRef, {
        [entryId]: deleteField(),
      });
    });

    await setDoc(
      doc(
        db,
        "users",
        userAuthState?.email,
        "userTradeData",
        userData["tradeWritableDoc"],
      ),
      tradeDataObject,
      { merge: true },
    ).then(() => {
      setSaveTradePop(false);
      closeEditEntry();
    });
  };

  //   const checkSizeAndAddDoc = async () => {
  //     if (userData && allData) {
  //       let writableDoc = userData?.tradeWritableDoc;
  //       let currentSetDocSize = JSON.stringify(allData[writableDoc]).length;
  //       let numberOfDocs = Object.keys(allData).length;
  //       let nextDocNumber = numberOfDocs + 1;
  //       let nextDocName = "tradeDoc_" + nextDocNumber;
  //       if (currentSetDocSize > 1024000) {
  //         const userTradeDataAddDoc = await setDoc(
  //           doc(db, "users", userAuthState?.email, "userTradeData", nextDocName),
  //           {},
  //         );

  //         await updateDoc(doc(db, "users", userAuthState?.email), {
  //           tradeWritableDoc: nextDocName,
  //         });
  //       }
  //     }
  //   };

  const closeEditEntry = () => {
    document.getElementById("editEntryContainer").style.top = "100%";

    setStart(false);
    setTradeDataObject({});

    setTradeEntryCount(null); //
    setActiveButton("");
    setActiveTradeButton("");
    setTempToRefreshPnl("");
    setTradeDataObject("");
    setTradeEntryCount("");
    setStrategyTag("");
    setIsTradewise("");
    setNumberOfTrades("");
    setActiveTradeTag("");
    setTradeType("");
    setTradeDirection("");
    setDeleteTradePop(false);
    setSaveTradePop(false);
  };
  return (
    <div
    // className="fixed top-20 z-50 h-full w-full  transition-all duration-100 ease-in-out "
    >
      <div
        id="editEntryContainer"
        className="fixed left-0 right-0 top-full z-50 m-auto h-5/6 overflow-y-auto rounded-xl bg-base-300 transition-all duration-100 ease-in-out md:w-9/12 lg:w-8/12"
      >
        <button
          onClick={() => {
            closeEditEntry();
          }}
          className="btn btn-square btn-sm absolute right-3 top-3 border-primary bg-primary hover:border-red-500 hover:bg-red-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {saveTradePop === true && (
          <div className="card fixed left-0 right-0 z-50 m-auto mt-72 w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-warning">Warning</h2>
              Are you sure you want to save the entered data?
              <div className="card-actions justify-end">
                <button
                  className="btn border-0 bg-primary hover:border-0 hover:bg-secondary"
                  onClick={() => {
                    saveTradeDataToDb(entryData.entryUid);
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setSaveTradePop(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {deleteTradePop === true && (
          <div className="card fixed left-0 right-0 z-50 m-auto mt-72 w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-error">Warning</h2>
              Are you sure you want to delete the entered data?
              <div className="card-actions justify-end">
                <button
                  className="btn border-0 bg-primary hover:border-0 hover:bg-secondary"
                  onClick={() => {
                    deleteEntry(entryData.entryUid);
                    setDeleteTradePop(false);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setDeleteTradePop(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="card-body items-center text-center">
          <h2 className="card-title">Edit Trade Entry</h2>
          <div className="title">
            Note: This panel works just like the "Add Trade" Panel.
          </div>
          <div className="startingBtns flex flex-wrap items-center justify-center">
            {!tradeDataObject[tradeEntryCount] && (
              <>
                <button
                  className="btn w-32 bg-primary text-lg hover:bg-secondary"
                  onClick={() => {
                    countEntries();
                    setStart(true);
                  }}
                >
                  Edit Entry
                </button>
              </>
            )}
            {!tradeDataObject[tradeEntryCount] && start == false && (
              <>
                <button
                  className="btn bg-primary text-lg hover:bg-secondary"
                  onClick={() => {
                    setDeleteTradePop(true);
                  }}
                >
                  Delete Entry
                </button>
              </>
            )}
          </div>

          {start && tradeDataObject[tradeEntryCount] && (
            <>
              <div className="title text-lg">Add Date</div>
              <input
                type="date"
                className="rounded bg-primary p-2"
                id="dateDropDown"
                value={entryData.date}
                placeholder="dd/mm/yyyy"
                onChange={(e) => {
                  let date = e.target.value;
                  let updatedObject = Object.assign({}, tradeDataObject);
                  updatedObject[tradeEntryCount]["date"] = date;
                  setTradeDataObject(updatedObject);
                }}
              />
            </>
          )}
          {tradeDataObject[tradeEntryCount] &&
            tradeDataObject[tradeEntryCount]?.["date"] &&
            tradeDataObject[tradeEntryCount]?.["date"] != "" && (
              <>
                <div className="title mt-3 text-lg">
                  Select strategy to enter trade data
                </div>
                <div className="join">
                  {userData?.strategytags.map((strategy, i) => {
                    return (
                      <input
                        key={i}
                        className="btn join-item border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
                        type="radio"
                        name="strategy"
                        aria-label={strategy}
                        onClick={(e) => {
                          let strategyObject = {};
                          let updatedObject = Object.assign(
                            {},
                            tradeDataObject,
                          );
                          if (updatedObject[tradeEntryCount][strategy]) {
                            setStrategyTag(strategy);
                          } else {
                            updatedObject[tradeEntryCount][strategy] =
                              strategyObject;
                            setTradeDataObject(updatedObject);
                            setStrategyTag(strategy);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </>
            )}
          {tradeDataObject[tradeEntryCount] && strategyTag && (
            <>
              <div className="title mt-3 text-lg">
                Enter PnL for {strategyTag}
              </div>
              <input
                type="number"
                id="pnlInput"
                step={0.05}
                placeholder="Profit/Loss"
                onChange={(e) => {
                  let pnlObject = parseFloat(e.target.value);
                  let updatedObject = Object.assign({}, tradeDataObject);
                  updatedObject[tradeEntryCount][strategyTag]["pnl"] =
                    pnlObject;
                  setTradeDataObject(updatedObject);
                }}
                className="input input-bordered max-w-xs text-lg"
              />
            </>
          )}
          {tradeDataObject[tradeEntryCount] &&
            strategyTag &&
            isTradewise == 0 && (
              <div
                className="tradewise mt-3 flex h-fit cursor-pointer items-center justify-center"
                onClick={() => {
                  let updatedObject = Object.assign({}, tradeDataObject);
                  updatedObject[tradeEntryCount][strategyTag]["detail"] = {};
                  setTradeDataObject(updatedObject);
                }}
              >
                <p className="mr-3">Add trade-wise data</p>
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          {tradeDataObject[tradeEntryCount] &&
            strategyTag &&
            isTradewise == 1 && (
              <div
                className="tradewise mt-3 flex h-fit cursor-pointer items-center justify-center"
                onClick={() => {
                  let updatedObject = Object.assign({}, tradeDataObject);
                  delete updatedObject[tradeEntryCount][strategyTag]["detail"];
                  setTradeDirection("");
                  setTradeType("");
                  setTradeDataObject(updatedObject);
                }}
              >
                <p className="mr-3">Remove trade-wise data</p>
                <button className="btn btn-circle btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          {tradeDataObject[tradeEntryCount] && isTradewise == 1 && (
            <>
              <div className="title mt-3 text-lg">
                Enter number of trades for {strategyTag}
              </div>
              <input
                type="number"
                class="input input-bordered max-w-xs text-lg"
                id="numberOfTrades"
                step={1}
                pattern="[0-9]*"
                placeholder="No. of trades"
                onInput={(e) => {
                  if (e.target.value > 20) {
                    e.target.value = 20;
                  }
                  if (e.target.value < 0) {
                    e.target.value = 0;
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
            </>
          )}
          {tradeDataObject[tradeEntryCount] &&
            isTradewise == 1 &&
            numberOfTrades && (
              <>
                <div className="title mt-3 text-lg">Select Trade</div>
                <div className="join">
                  {numberOfTrades?.map((i) => {
                    let tradeName = "trade_" + i;
                    let tradeDisplayName = "Trade " + i;
                    return (
                      <button
                        key={i}
                        className={
                          i === activeTradeButton
                            ? "btn join-item btn-active border-primary bg-primary hover:border-primary hover:bg-primary"
                            : "btn join-item border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
                        }
                        type="radio"
                        name="tradeCount"
                        onClick={(e) => {
                          let tradeObject = {};
                          let updatedObject = Object.assign(
                            {},
                            tradeDataObject,
                          );
                          if (
                            updatedObject[tradeEntryCount][strategyTag][
                              "detail"
                            ][tradeName]
                          ) {
                            setActiveTradeTag(tradeName);
                          } else {
                            updatedObject[tradeEntryCount][strategyTag][
                              "detail"
                            ][tradeName] = tradeObject;
                            setTradeDataObject(updatedObject);
                            setActiveTradeTag(tradeName);
                          }
                          handleTradeBtnClick(i);
                        }}
                      >
                        {tradeDisplayName}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          {tradeDataObject[tradeEntryCount] &&
            isTradewise == 1 &&
            activeTradeTag &&
            numberOfTrades.length > 0 &&
            activeTradeButton && (
              <div className="card flex items-center justify-center bg-base-200 px-10 pb-10">
                <div className="title mb-3 mt-3 text-lg">
                  {activeTradeTag
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
                <label className="input input-bordered  flex w-full items-center gap-2">
                  Name
                  <input
                    type="text"
                    pattern="[^' ']+"
                    name=""
                    id="tradeScripName"
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
                    className="grow bg-base-100 "
                    placeholder="Stock/Index"
                  />
                </label>
                <div className="join mt-3 w-full">
                  <button
                    className={
                      tradeType === "Directional"
                        ? "btn join-item btn-active w-1/2 border-primary bg-primary hover:border-primary hover:bg-primary"
                        : "btn join-item w-1/2 border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
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
                      tradeType === "Non-Directional"
                        ? "btn join-item btn-active w-1/2 border-primary bg-primary hover:border-primary hover:bg-primary"
                        : "btn join-item w-1/2 border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
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
                  <div className="join mb-1 mt-3 w-full">
                    <button
                      className={
                        tradeDirection === "Long"
                          ? "btn join-item btn-active w-1/2 border-primary bg-primary hover:border-primary hover:bg-primary"
                          : "btn join-item w-1/2 border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
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
                        tradeDirection === "Short"
                          ? "btn join-item btn-active w-1/2 border-primary bg-primary hover:border-primary hover:bg-primary"
                          : "btn join-item w-1/2 border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
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
                  <label className="input input-bordered my-2 flex w-full items-center gap-2">
                    Qty
                    <input
                      className=" grow bg-base-100"
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
                  </label>
                )}
                {tradeType == "Directional" && tradeDirection && (
                  <label className="input input-bordered my-2 flex w-full items-center gap-2">
                    Entry Price
                    <input
                      type="number"
                      name=""
                      id="entryPrice"
                      step={0.05}
                      onChange={(e) => {
                        let entryPrice = parseFloat(e.target.value);
                        let updatedObject = Object.assign({}, tradeDataObject);
                        updatedObject[tradeEntryCount][strategyTag]["detail"][
                          activeTradeTag
                        ]["entryPrice"] = entryPrice;
                        setTradeDataObject(updatedObject);
                        setTempToRefreshPnl(entryPrice);
                      }}
                      className="grow bg-base-100"
                      placeholder="Add Entry Price"
                    />
                  </label>
                )}
                {tradeType == "Directional" && tradeDirection && (
                  <label className="input input-bordered my-2 flex w-full items-center gap-2">
                    Exit Price
                    <input
                      type="number"
                      name=""
                      id="exitPrice"
                      step={0.05}
                      onChange={(e) => {
                        let exitPrice = parseFloat(e.target.value);
                        let updatedObject = Object.assign({}, tradeDataObject);
                        updatedObject[tradeEntryCount][strategyTag]["detail"][
                          activeTradeTag
                        ]["exitPrice"] = exitPrice;
                        setTradeDataObject(updatedObject);
                        setTempToRefreshPnl(exitPrice);
                      }}
                      className="grow bg-base-100"
                      placeholder="Add Exit Price"
                    />
                  </label>
                )}
                {tradeType == "Directional" && tradeDirection && (
                  <label className="input input-bordered my-2 flex w-full items-center gap-2">
                    PnL
                    <input
                      type="number"
                      name=""
                      id="tradePnlInput"
                      step={0.05}
                      onChange={(e) => {
                        if (tradeType == "Non-Directional") {
                          let pnl = parseFloat(e.target.value);
                          let updatedObject = Object.assign(
                            {},
                            tradeDataObject,
                          );
                          updatedObject[tradeEntryCount][strategyTag]["detail"][
                            activeTradeTag
                          ]["pnl"] = pnl;
                          setTradeDataObject(updatedObject);
                        }
                      }}
                      className="grow bg-base-100"
                      placeholder="Add PnL"
                    />
                  </label>
                )}
                {tradeType == "Non-Directional" && (
                  <label className="input input-bordered my-2 flex w-full items-center gap-2">
                    PnL
                    <input
                      type="number"
                      name=""
                      id="tradePnlInputND"
                      step={0.05}
                      onChange={(e) => {
                        if (tradeType == "Non-Directional") {
                          let pnl = parseFloat(e.target.value);
                          let updatedObject = Object.assign(
                            {},
                            tradeDataObject,
                          );
                          updatedObject[tradeEntryCount][strategyTag]["detail"][
                            activeTradeTag
                          ]["pnl"] = pnl;
                          setTradeDataObject(updatedObject);
                        }
                      }}
                      className="grow bg-base-100"
                      placeholder="Add PnL"
                    />
                  </label>
                )}
              </div>
            )}
          {tradeDataObject[tradeEntryCount] && strategyTag && (
            <textarea
              className="textarea textarea-bordered mt-3 h-52 w-96"
              name="message"
              id="noteForDay"
              cols="30"
              rows="10"
              placeholder="Note for the day: For example....Reason to enter and exit, mistakes, learnings, improvements, etc."
              maxLength={1000}
              onChange={(e) => {
                let note = e.target.value;
                let updatedObject = Object.assign({}, tradeDataObject);
                updatedObject[tradeEntryCount]["note"] = note;
                setTradeDataObject(updatedObject);
              }}
            ></textarea>
          )}
          {tradeDataObject[tradeEntryCount] && (
            <div
              className="hover btn mt-6 border-0 bg-primary hover:bg-secondary"
              onClick={() => {
                setSaveTradePop(true);
              }}
            >
              Confirm
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditEntry;
