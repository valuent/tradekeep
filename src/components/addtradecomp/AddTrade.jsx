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
  const { userData, userAuthState, siteDate, userTradeData } =
    useContext(DataContext);

  return (
    <div className="addStrategy">
      <div className="title">Add Trade</div>

      {/* Date Selection */}
      <div className="dateSelection">
        <label htmlFor="date">Select date:</label>
        <input type="date" name="dateDropDown" id="dateDropDown" />
      </div>

      {/* StrategySelection */}
      <div className="strategySelection">
        <select name="strategyName" id="">
          <option disabled selected value>
            --Select Strategy--
          </option>
          <option value="Straddle">Straddle</option>
          <option value="Strangle">Strangle</option>
        </select>

        <label htmlFor="">Enter PnL for "Strategy"</label>
        <input type="number" name="" id="" step={0.05} />
      </div>
      <div className="addMoreInfoBtn"></div>
    </div>
  );
}

export default AddTrade;
