import React, { useContext, useState, useEffect } from "react";
import { db } from "../../utils/config";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { DataContext } from "../../service/DataContext";
import "./addstrategy.css";
import trash from "../../assets/trash.svg";

function AddStrategy() {
  const { userData, userAuthState, siteDate, allData } =
    useContext(DataContext);
  const [userStrategyTags, setUserStrategyTags] = useState([]);
  const [newStrategyName, setNewStrategyName] = useState();
  const [strategyToDelete, setStrategyToDelete] = useState();

  useEffect(() => {
    setUserStrategyTags(userData?.strategytags);
  }, [userData]);

  const addStratInArray = async () => {
    if (userData.strategytags.length <= 9) {
      await updateDoc(doc(db, "users", userAuthState?.email), {
        strategytags: arrayUnion(newStrategyName),
      });
      document.getElementById("strategyinput").value = null;
    }
  };

  const removeStratInArray = async (strategyName) => {
    await updateDoc(doc(db, "users", userAuthState?.email), {
      strategytags: arrayRemove(strategyName),
    });
  };

  const closeAddStrategy = () => {
    document.getElementById("addStratContainer").style.top = "100%";
    setStrategyToDelete(null);
  };

  const closeConfirmPop = () => {
    removeStratInArray(strategyToDelete);
    setStrategyToDelete(null);
  };

  return (
    <div className="addStratContainer" id="addStratContainer">
      {strategyToDelete && (
        <div className="confirmDelete" id="confirmpop">
          <div className="message">
            <span className="warning">Warning</span>
            <span className="msg">
              Deleting <span className="strat">{strategyToDelete}</span> will
              delete all the trade data related to{" "}
              <span className="strat">{strategyToDelete}</span>
            </span>
          </div>
          <div className="buttonsConfirm">
            <button
              onClick={() => {
                closeConfirmPop(strategyToDelete);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                closeConfirmPop();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="exit" onClick={closeAddStrategy}>
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="title">Add Strategy Name</div>
      <div className="disclaimer">
        A. Once you add a strategy, you cant change its name
        <br />
        B. Deleting the strategy will delete all the trade data related to that
        strategy
      </div>
      <div className="existingStrategies">
        <table>
          <tr>
            <th>Sr No.</th>
            <th>Strategy Name</th>
            <th>Remove</th>
          </tr>

          {userStrategyTags?.map((strategy, i) => {
            return (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{strategy}</td>
                <td>
                  <img
                    src={trash}
                    onClick={() => {
                      setStrategyToDelete(strategy);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="addStrategyInputs">
        <input
          type="text"
          placeholder="Strategy Name...."
          id="strategyinput"
          maxLength="20"
          onChange={(event) => {
            setNewStrategyName(event.target.value);
          }}
        />
        <button onClick={addStratInArray}>Add Strategy</button>
      </div>
    </div>
  );
}

export default AddStrategy;
