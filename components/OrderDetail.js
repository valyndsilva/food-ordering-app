import React, { useState } from "react";

function OrderDetail({ total, createOrder }) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };
  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 flex items-center justify-center bg-gray-400 z-[999] ">
      <div className="w-[500px] bg-white rounded-lg p-5 flex flex-col items-center justify-center">
        <h1 className="font-light text-2xl mb-4">
          You will pay $12 after delivery.
        </h1>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Full Name</label>
          <input
            className="h-10 border p-2"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Phone Number</label>
          <input
            className="h-10  border p-2"
            type="text"
            placeholder="+1 234 567 89"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Address</label>
          <textarea
            className="h-10  border p-2"
            type="text"
            rows={5}
            placeholder="Elton St. 505 NY"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="border-none bg-teal-500 text-white py-2 px-3 font-semibold text-lg rounded-md cursor-pointer"
          onClick={handleClick}
        >
          Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
