import { doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

function TradeInfo({ tradeKey, userData }) {
  const [currentStrat, setCurrentStrat] = useState();
  const [numberOfTradesToDisplay, setNumberOfTradesToDisplay] = useState();

  const closeInfoTrade = () => {
    document.getElementById("tradeInfoContainer").style.top = "100%";
    setCurrentStrat("");
    setNumberOfTradesToDisplay("");
  };

  useEffect(() => {
    setNumberOfTradesToDisplay(
      Array.from(
        {
          length: parseInt(tradeKey?.[currentStrat]?.detail?.noOfTrade),
        },
        (_, index) => +index + 1,
      ),
    );
  }, [currentStrat, tradeKey]);

  return (
    <>
      {tradeKey && userData && (
        <div
          id="tradeInfoContainer"
          className="card fixed left-0 right-0 top-20 z-50 m-auto h-5/6 overflow-y-auto bg-base-300 transition-all duration-100 ease-in-out md:w-9/12 lg:w-8/12"
        >
          <button
            onClick={() => {
              closeInfoTrade();
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

          <div className="card-body items-center text-center">
            <h2 className="card-title">Entry Info</h2>
            <div className="title text-lg">Date: {tradeKey?.date}</div>

            <div className="join mt-3">
              {userData?.strategytags?.map((tag) => {
                return (
                  <button
                    className={
                      currentStrat == tag
                        ? "btn join-item btn-active border-primary bg-primary hover:border-primary hover:bg-primary"
                        : "btn join-item border-secondary bg-secondary hover:border-secondary hover:bg-secondary"
                    }
                    onClick={() => {
                      setCurrentStrat(tag);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            {currentStrat && tradeKey?.[currentStrat] && (
              <>
                <div className="stats mt-3 shadow">
                  <div className="stat">
                    <div className="stat-title">PnL for {currentStrat}</div>
                    <div className="stat-value text-3xl">
                      <span
                        className={
                          tradeKey?.[currentStrat]?.pnl > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {tradeKey?.[currentStrat]?.pnl}
                      </span>
                    </div>
                  </div>
                </div>

                {currentStrat &&
                  tradeKey?.[currentStrat]?.detail?.noOfTrade && (
                    <div className="stats mt-3 shadow">
                      <div className="stat ">
                        <div className="stat-title">No. of Trades</div>
                        <div className="stat-value text-xl">
                          {tradeKey?.[currentStrat]?.detail?.noOfTrade}
                        </div>
                      </div>
                    </div>
                  )}
                {currentStrat &&
                  tradeKey?.[currentStrat]?.detail?.noOfTrade && (
                    <>
                      <div className="title mt-3 text-lg">Trade Wise data</div>
                      <div className="tradeCards mt3 flex flex-wrap items-center justify-center">
                        {numberOfTradesToDisplay.map((count) => {
                          let tradeName = "trade_" + count;
                          if (
                            tradeKey?.[currentStrat]?.detail?.[tradeName]
                              .tradeType == "Directional"
                          ) {
                            return (
                              <div className="card m-3 h-80 w-80 bg-base-100 shadow-xl ">
                                <div className="justify-left card-body  flex flex-col items-start text-xl">
                                  <div className="name">
                                    Name:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].scripName
                                    }
                                  </div>
                                  <div className="tradeType">
                                    Type:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].tradeType
                                    }
                                  </div>
                                  <div className="tradeDirection">
                                    Direction:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].direction
                                    }
                                  </div>
                                  <div className="tradeDirection">
                                    Qty:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].quantity
                                    }
                                  </div>
                                  <div className="tradeDirection">
                                    Entry Price:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].entryPrice
                                    }
                                  </div>
                                  <div className="tradeDirection">
                                    Exit Price:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].exitPrice
                                    }
                                  </div>
                                  <div className="tradePnl">
                                    PnL :{" "}
                                    <span
                                      className={
                                        tradeKey?.[currentStrat]?.detail?.[
                                          tradeName
                                        ].pnl > 0
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }
                                    >
                                      {
                                        tradeKey?.[currentStrat]?.detail?.[
                                          tradeName
                                        ].pnl
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          } else if (
                            tradeKey?.[currentStrat]?.detail?.[tradeName]
                              .tradeType != "Directional"
                          ) {
                            return (
                              <div className="card m-3 h-80 w-80 bg-base-100 shadow-xl ">
                                <div className="justify-left card-body  flex flex-col items-start text-xl">
                                  <div className="name">
                                    Name:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].scripName
                                    }
                                  </div>
                                  <div className="tradeType">
                                    Type:{" "}
                                    {
                                      tradeKey?.[currentStrat]?.detail?.[
                                        tradeName
                                      ].tradeType
                                    }
                                  </div>

                                  <div className="tradeDirection">
                                    PnL :{" "}
                                    <span
                                      className={
                                        tradeKey?.[currentStrat]?.detail?.[
                                          tradeName
                                        ].pnl > 0
                                          ? "text-green-400"
                                          : "text-red-400"
                                      }
                                    >
                                      {
                                        tradeKey?.[currentStrat]?.detail?.[
                                          tradeName
                                        ].pnl
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </>
                  )}
              </>
            )}
            {currentStrat && !tradeKey?.[currentStrat] && (
              <div className="title mt-10 text-2xl">
                No trade data available for {currentStrat} in this entry
              </div>
            )}
            {currentStrat && (
              <>
                <div className="title mt-4">Note for this entry</div>
                <div className="card w-96 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <p className="mt">{tradeKey?.note}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TradeInfo;
