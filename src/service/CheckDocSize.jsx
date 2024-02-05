// import React, { useState, useEffect, useContext } from "react";
// import { db } from "../utils/config";
// import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { DataContext } from "./DataContext";
// import { auth } from "../utils/config";

// function CheckDocSize() {
//   const { userData, userAuthState, siteDate } = useContext(DataContext);
//   const [fetchedData, setFetchedData] = useState();
//   const [isAuth, setIsAuth] = useState(false);
//   onAuthStateChanged(auth, (currentUser) => {
//     if (currentUser?.email) {
//       setIsAuth(currentUser);
//     }
//   });

//   const checkAndAdd = async () => {
//     try {
//       const docDataFetch = await getDoc(
//         doc(
//           db,
//           "users",
//           userAuthState?.email,
//           "userTradeData",
//           userData?.tradeWritableDoc
//         )
//       );
//       if (docDataFetch?.exists()) {
//         setFetchedData(docDataFetch?.data());
//         console.log("nullllll", fetchedData);
//       } else {
//         console.log("no doc");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     if (isAuth?.email) {
//       checkAndAdd();
//     }
//   }, [userAuthState]);

//   //   checkAndAdd();

//   return (
//     <div>
//       <button onClick={checkAndAdd}>Clici</button>
//     </div>
//   );
// }

// export default CheckDocSize;
