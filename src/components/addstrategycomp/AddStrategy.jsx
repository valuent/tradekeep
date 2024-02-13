import React, { useContext, useState, useEffect } from "react";
import { db } from "../../utils/config";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { DataContext } from "../../service/DataContext";
// import "./addstrategy.css";
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
    setStrategyToDelete(null);
  };

  const closeConfirmPopDelete = () => {
    removeStratInArray(strategyToDelete);
    setStrategyToDelete(null);
  };

  return (
    <div
      className="fixed top-full z-50  h-full w-full transition-all duration-100 ease-in-out "
      id="addStratContainer"
    >
      {strategyToDelete && (
        <div className="card absolute left-0 right-0 top-20 z-50 m-auto w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-warning">Warning</h2>
            Deleting {strategyToDelete} will delete all the trade data related
            to {strategyToDelete}
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => {
                  closeConfirmPopDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  closeConfirmPop();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="card left-0 right-0 m-auto w-11/12 bg-base-300  md:w-9/12 lg:w-8/12">
        <button
          onClick={closeAddStrategy}
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
          <h2 className="card-title">Add Strategy</h2>
          <div className="disclaimer">
            A. Once you add a strategy, you can't change its name <br />
            B. Deleting the strategy will delete all the trade data related to
            that strategy
          </div>
          <div className=" w-4/5 overflow-x-auto text-center xl:w-3/5">
            <table className="table text-lg ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Strategy Name</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {userStrategyTags?.map((strategy, i) => {
                  return (
                    <tr className="hover">
                      <th>{i + 1}</th>
                      <td>{strategy}</td>
                      <td>
                        <svg
                          onClick={() => {
                            setStrategyToDelete(strategy);
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <input
            type="text"
            placeholder="Strategy Name"
            className="input input-bordered mt-5 w-full max-w-xs"
            id="strategyinput"
            maxLength="20"
            onChange={(event) => {
              setNewStrategyName(event.target.value);
            }}
          />
          <div className="card-actions justify-end">
            <button
              className="btn bg-primary hover:border-secondary hover:bg-secondary"
              onClick={addStratInArray}
            >
              Add Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStrategy;
