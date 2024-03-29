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

import Navbar from "./components/navbarcomp/Navbar";
import Register from "./components/registercomp/Register";
import Login from "./components/logincomp/Login";
import Profile from "./components/profilecomp/Profile";
import TopBar from "./components/topbarcomp/TopBar";
import AddStrategy from "./components/addstrategycomp/AddStrategy";
import AddTrade from "./components/addtradecomp/AddTrade";
import LandingPage from "./containers/LandingPage";
import Footer from "./components/footercomp/Footer";
// import CheckDocSize from "./service/CheckDocSize";

function App() {
  var siteDate = DateTime.now().setZone("local");

  const [userData, setUserData] = useState();
  const [allData, setAllData] = useState({});
  const [sizeCount, setSizeCount] = useState();
  const [userAuthState, setUserAuthState] = useState();

  // Function to handle the selected data change

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
            // console.log(doc.data());
          },
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
        },
      );
    }
  }, [userData]);

  // useEffect(() => {
  //   console.log(allData);
  // }, [allData]);

  return (
    <>
      <div className="min-h-screen">
        <DataContext.Provider
          value={{ userData, userAuthState, siteDate, allData }}
        >
          <Navbar />

          {userAuthState && userAuthState?.email && (
            <>
              <AddTrade />
              <AddStrategy />
              <Profile />
              <TopBar />
            </>
          )}

          {!userAuthState?.email && (
            <>
              <Register />
              <Login />
              <LandingPage />
            </>
          )}
        </DataContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default App;
