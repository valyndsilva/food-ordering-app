import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { AddButton, AddProduct } from "../../components";

function Index({ orders, products, admin }) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const status = ["Preparing", "On the way", "Delivered"];
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-12 flex gap-4">
      <div className="flex-1">
        <h1 className="">Products</h1>
        {admin && <AddButton setClose={setClose} />}
        {!close && <AddProduct setClose={setClose} />}
        <table className="w-full border-spacing-5 text-left flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 md:inline-table">
          <thead className="text-white">
            <tr className="bg-red-400 flex flex-col flex-no wrap md:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="border p-5 text-left">Image</th>
              <th className="border p-5 text-left">Id</th>
              <th className="border p-5 text-left">Title</th>
              <th className="border p-5 text-left">Price</th>
              <th className="border p-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {pizzaList.map((product) => (
              <tr
                key={product._id}
                className="flex flex-col flex-no wrap md:table-row mb-5 mb:mb-0"
              >
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="font-medium text-[#d1411e] md:text-lg">
                    <Image
                      //   src="/assets/pizza.png"
                      src={product.img}
                      alt=""
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  <span className="">{product._id.slice(0, 5)}...</span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5">
                  <span className="before:text-normal before:content-['Price: ']">
                    {product.title}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="before:text-normal before:content-['Price: ']">
                    ${product.prices[0]}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <button
                    className="border-none bg-teal-500 mr-2 text-white rounded-lg p-2 cursor-pointer"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="border-none bg-red-500 text-white rounded-lg p-2 cursor-pointer"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1">
        <h1 className="">Orders</h1>
        <table className="w-full  border-spacing-5 text-left flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 md:inline-table">
          <thead className="text-white">
            <tr className="bg-red-400 flex flex-col flex-no wrap md:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="border p-5 text-left">OrderID</th>
              <th className="border p-5 text-left">Customer</th>
              <th className="border p-5 text-left">Total</th>
              <th className="border p-5 text-left">Payment</th>
              <th className="border p-5 text-left">Status</th>
              <th className="border p-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {orderList.map((order) => (
              <tr
                key={order._id}
                className="flex flex-col flex-no wrap md:table-row mb-5 mb:mb-0"
              >
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="font-medium text-[#d1411e] md:text-lg">
                    {order._id.slice(0, 5)}...
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  <span className="">{order.customer}</span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5">
                  <span className="before:text-normal before:content-['Price: ']">
                    ${order.total}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="before:text-normal before:content-['Price: ']">
                    {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="before:text-normal before:content-['Price: ']">
                    {status[order.status]}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <button
                    className="border-none bg-teal-500 text-white rounded-lg p-2 cursor-pointer"
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;

export const getServerSideProps = async (context) => {
  // If there is no cookie or the token is not correct, redirect to login page
  const myCookie = context.req?.cookies || "";
  if (myCookie.token !== process.env.TOKEN) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  } // nextJS redirect method

  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      admin: admin,
    },
  };
};
