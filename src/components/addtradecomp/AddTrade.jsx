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

function AddTrade() {
  const { userData, userAuthState, siteDate, userTradeData } =
    useContext(DataContext);

  return (
    <div className="addStrategy">
      <div className="title">Add Trade</div>
      <div className="dateSelection">
        <label htmlFor="date">Select date:</label>
        <input type="date" name="dateDropDown" id="dateDropDown" />
      </div>
      <div className="strategySelection">
        <select name="strategyName" id="">
          <option disabled selected value>
            --Select Strategy--
          </option>
          <option value="Straddle">Straddle</option>
          <option value="Strangle">Strangle</option>
        </select>
      </div>
    </div>
  );
}

export default AddTrade;
