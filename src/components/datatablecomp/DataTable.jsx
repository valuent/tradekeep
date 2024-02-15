import React from "react";

function DataTable() {
  return (
    <div className="flex  items-center justify-center ">
      <div className="mt-6 max-h-[80vh] w-11/12 overflow-x-auto">
        <table className="table table-pin-rows table-pin-cols table-lg">
          <thead>
            <tr className="active ">
              <th>Date</th>
              <td>Name</td>
              <td>Job</td>
              <td>company</td>
              <td>location</td>
              <td>Last Login</td>
              <td>Favorite Color</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
              <th>1</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
