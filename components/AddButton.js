import React from "react";

function AddButton({ setClose }) {
  return (
    <div
      className="p-3 m-5 bg-red-500 w-40 rounded-lg text-white font-medium text-center cursor-pointer"
      onClick={() => setClose(false)}
    >
      Add New Pizza
    </div>
  );
}

export default AddButton;
