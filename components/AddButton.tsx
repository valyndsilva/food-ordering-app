import React from "react";
import { useDispatch } from "react-redux";
import { setAddModal } from "../redux/slices/modalSlice";

function AddButton({}) {
  const dispatch = useDispatch();

  return (
    <button
      className="p-3 my-5 bg-[#3E2823]/80 w-40 rounded-lg text-white font-medium text-center cursor-pointer"
      onClick={() => dispatch(setAddModal(true))}
    >
      Add New Pizza
    </button>
  );
}

export default AddButton;
