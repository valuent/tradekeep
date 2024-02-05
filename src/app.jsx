import React, { useEffect, useState } from "react";
import { db } from "./utils/config";
import {
  doc,
  onSnapshot,
  collection,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { DataContext } from "./service/DataContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/config";
import { DateTime } from "luxon";

import "./style/app.css";
import Navbar from "./components/navbarcomp/Navbar";
import Register from "./components/registercomp/Register";
import Login from "./components/logincomp/Login";
import Profile from "./components/profilecomp/Profile";
import SendTestData from "./service/SendTestData";
import TopBar from "./components/topbarcomp/TopBar";
import AddStrategy from "./components/addstrategycomp/AddStrategy";
import AddTrade from "./components/addtradecomp/AddTrade";
// import CheckDocSize from "./service/CheckDocSize";

function App() {
  var siteDate = DateTime.now().setZone("local");

  const [userData, setUserData] = useState();
  const [allData, setAllData] = useState({});
  const [sizeCount, setSizeCount] = useState();
  const [userAuthState, setUserAuthState] = useState("");

  onAuthStateChanged(auth, (currentUser) => {
    setUserAuthState(currentUser);
  });

  useEffect(() => {
    const getDataSnap = () => {
      if (userAuthState) {
        const unsubscribe = onSnapshot(
          doc(db, "users", userAuthState?.email),
          (doc) => {
            setUserData(doc.data());
            setSizeCount(true);
            console.log("done");
          }
        );
      }
    };
    getDataSnap();
  }, [userAuthState]);

  useEffect(() => {
    if (userAuthState) {
      const unsub = onSnapshot(
        collection(db, "users", userAuthState?.email, "userTradeData"),
        (querySnapshot) => {
          const newData = {};
          querySnapshot.forEach((doc) => {
            const documentData = doc.data();
            const documentId = doc.id;
            newData[documentId] = documentData;
          });
          setAllData(newData);
        }
      );
    }
  }, [userData]);

  const checkSizeAndAddDoc = async () => {
    if (userData && allData) {
      let writableDoc = userData?.tradeWritableDoc;
      let currentSetDocSize = JSON.stringify(allData[writableDoc]).length;
      let numberOfDocs = Object.keys(allData).length;
      let nextDocNumber = numberOfDocs + 1;
      let nextDocName = "tradeDoc_" + nextDocNumber;
      if (currentSetDocSize > 500) {
        const userTradeDataAddDoc = await setDoc(
          doc(db, "users", userAuthState?.email, "userTradeData", nextDocName),
          {}
        );

        await updateDoc(doc(db, "users", userAuthState?.email), {
          tradeWritableDoc: nextDocName,
        });
        console.log("wrote");
      }
      console.log(currentSetDocSize, nextDocNumber, allData.tradeDoc_1);
    }
  };

  return (
    <div>
      <DataContext.Provider
        value={{ userData, userAuthState, siteDate, allData }}
      >
        <AddStrategy />
        <Profile />
        <Register />
        <Login />
        <Navbar />
        <TopBar />
        <SendTestData />
        <AddTrade />
      </DataContext.Provider>

      <button onClick={checkSizeAndAddDoc}>ClickHere</button>
    </div>
  );
}

export default App;