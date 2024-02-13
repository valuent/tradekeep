import React from "react";

function AddTradeDesign() {
  return (
    <div
      className="fixed top-10 z-50 h-full w-full transition-all duration-100 ease-in-out "
      id="addStratContainer"
    >
      <div className="card left-0 right-0 m-auto w-11/12 bg-base-300 md:w-9/12 lg:w-8/12">
        <button className="btn btn-square btn-sm absolute right-3 top-3 border-primary bg-primary hover:border-red-500 hover:bg-red-500 ">
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
          <h2 className="card-title">Add Trade</h2>
          <button className="btn w-32 bg-primary text-lg hover:bg-secondary">
            Start
          </button>
          <input type="date" name="" className="rounded bg-primary p-2" id="" />
        </div>
      </div>
    </div>
  );
}

export default AddTradeDesign;
