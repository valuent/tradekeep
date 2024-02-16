import React, { useState, useEffect, useContext } from "react";
import { db } from "../utils/config";
import {
  collection,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { DataContext } from "./DataContext";

function SendTestData() {
  const { userData, userAuthState, siteDate, userTradeData } =
    useContext(DataContext);

  const testDataSend = async () => {
    let s1 = "Straddle";
    let s2 = "Stragle";

    let entryCount = 0;
    let userTradeDataLength = userTradeData?.length;
    for (var i = 0; i < userTradeDataLength; i++) {
      entryCount += Object?.keys(userTradeData[i]).length;
    }
    // entryCount += 1;

    // console.log("count", entryCount);

    let tradeDataTemp = {
      119: {
        date: siteDate.c.day + "-" + siteDate.c.month + "-" + siteDate.c.year,
        noOfStrats: 3,
        [s1]: {
          pnl: 6000,
          detail: {
            noOfTrade: 5,
            trade1: {
              scripName: "Nifty",
              direction: "Long",
              quantity: 100,
              entryPrice: 1000,
              exitPrice: 1020,
              pnl: 2000,
            },
            trade2: {
              scripName: "Nifty",
              direction: "Long",
              quantity: 100,
              entryPrice: 1000,
              exitPrice: 1020,
              pnl: 2000,
            },
            trade3: {
              scripName: "Nifty",
              direction: "Long",
              pnl: 2000,
            },
          },
        },
        [s2]: {
          pnl: 6000,
          detail: {
            noOfTrade: 3,
            trade1: {
              scripName: "Nifty",
              direction: "Long",
              pnl: 2000,
            },
            trade2: {
              scripName: "Nifty",
              direction: "Long",
              pnl: 2000,
            },
            trade3: {
              scripName: "Nifty",
              direction: "Long",
              pnl: 2000,
            },
          },
        },
      },
    };

    // console.log(tradeDataTemp);
    // for (let i = 0; i < 5; i++) {
    //   data.push(data[i]);
    // }

    // await updateDoc(testingSendingData, { strategyTags: arrayUnion(data) });

    await setDoc(
      doc(db, "users", userAuthState?.email, "userTradeData", "tradeDoc_2"),
      tradeDataTemp,
      { merge: true },
    );
  };

  return (
    <div>
      <button onClick={testDataSend}>send Data</button>
    </div>
  );
}

export default SendTestData;
