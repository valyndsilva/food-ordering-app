import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddButton, AddProduct, EditProduct } from "../../components";
import Order from "../../models/Order";
import Product from "../../models/Product";
import { setIsAuthenticated } from "../../redux/slices/authSlice";
import { setAddModal, setEditModal } from "../../redux/slices/modalSlice";
import {
  setExtraOptions,
  setProductId,
  setProductList,
} from "../../redux/slices/productSlice";
import dbConnect from "../../util/mongodb";

interface Props {
  orders: Order[];
  products: Product[];
  isLoggedIn: boolean;
}
function Index({ orders, products, isLoggedIn }: Props) {
  // console.log({ orders });
  // console.log({ products });
  // console.log({ isLoggedIn });

  const [orderList, setOrderList] = useState(orders);
  const status = ["Payment", "Preparing", "On the way", "Delivered"];

  const dispatch = useDispatch();
  dispatch(setIsAuthenticated(isLoggedIn));
  dispatch(setProductList(products));

  const product = useSelector((state: any) => state.product);
  // console.log("productList:", product.productList);
  const productArr = product.productList;
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/products/" + id);

      dispatch(
        setProductList(productArr.filter((pizza: Product) => pizza._id !== id))
      );
      router.replace(router.asPath); // update through ssr without refreshing page
      console.log("productList after delete:", product.productList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id: string) => {
    // console.log("edit product:",id);
    dispatch(setEditModal(true));
    dispatch(setProductId(id));
    // router.replace(router.asPath); // update through ssr without refreshing page
  };

  const handleStatus = async (id: string) => {
    const item = orderList.filter((order) => order?._id === id)[0];
    const currentStatus = item?.status;
    try {
      const res = await axios.put("/api/orders/" + id, {
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

  const modal = useSelector((state: any) => state.modal);
  // console.log(modal);
  const isAddModal = modal.addModal;
  const isEditModal = modal.editModal;
  // console.log({ isAddModal });
  // console.log({ isEditModal });
  return (
    <>
      <div className="flex flex-col gap-4  p-12">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex relative">
          {isLoggedIn && (
            <button
              className="p-3 my-5 bg-[#3E2823]/80 w-40 rounded-lg text-white font-medium text-center cursor-pointer"
              onClick={() => dispatch(setAddModal(true))}
            >
              Add New Pizza
            </button>
          )}
        </div>
        {isAddModal && <AddProduct />}
        {isEditModal && <EditProduct />}
        <div className="flex flex-col lg:inline-flex lg:flex-row space-x-4">
          <div className="flex-1">
            <h1 className="">Products</h1>
            <table className="w-full border-spacing-5 text-left flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 lg:inline-table">
              <thead className="text-white ">
                <tr className="hidden  lg:table-row bg-[#3E2823]/70 ] flex-col flex-no wrap rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="border p-5 text-left">Image</th>
                  <th className="border p-5 text-left">Id</th>
                  <th className="border p-5 text-left">Title</th>
                  <th className="border p-5 text-left">Price</th>
                  <th className="border p-5 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="flex-1 lg:flex-none">
                {productArr.map((product: Product) => (
                  <tr
                    key={product._id}
                    className="flex flex-col flex-no wrap lg:table-row mb-5 mb:mb-0"
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <Link href={`/product/${product._id}`}>
                        <span className="font-medium text-[#d1411e] md:text-lg">
                          <Image
                            src={product.img}
                            alt=""
                            width={50}
                            height={50}
                            objectFit="cover"
                          />
                        </span>
                      </Link>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 text-[#3E2823]/70 hover:text-red-600 hover:font-medium cursor-pointer">
                      <span className="">
                        {" "}
                        <span className="pr-5 text-left md:hidden">Id:</span>
                        {product._id!.slice(0, 5)}...
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5">
                      <span className="before:text-normal before:content-['Price: ']">
                        <span className="pr-5 text-left md:hidden">Title:</span>
                        {product.title}
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <span className="before:text-normal before:content-['Price: ']">
                        <span className="pr-5 text-left md:hidden">Price:</span>
                        ${product.prices[0]}
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <button
                        className="border-none bg-teal-500 mr-2 text-white rounded-lg p-2 cursor-pointer"
                        onClick={() => handleEdit(product._id!)}
                      >
                        Edit
                      </button>
                      <button
                        className="border-none bg-red-500 text-white rounded-lg p-2 cursor-pointer"
                        onClick={() => handleDelete(product._id!)}
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
            <table className="w-full  border-spacing-5 text-left flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 lg:inline-table">
              <thead className="text-white ">
                <tr className="hidden lg:table-row bg-[#3E2823]/70 flex-col flex-no wrap rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="border p-5 text-left">OrderID</th>
                  <th className="border p-5 text-left">Customer</th>
                  <th className="border p-5 text-left">Total</th>
                  <th className="border p-5 text-left">Payment</th>
                  <th className="border p-5 text-left">Status</th>
                  <th className="border p-5 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="flex-1 lg:flex-none">
                {orderList?.map((order) => (
                  <tr
                    key={order?._id}
                    className="flex flex-col flex-no wrap md:table-row mb-5 mb:mb-0"
                  >
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <Link href={`/order/${order?._id}`}>
                        <span className="font-medium text-[#d1411e] md:text-lg">
                          {order?._id.slice(0, 5)}...
                        </span>
                      </Link>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 text-[#3E2823]/70 hover:text-red-600 hover:font-medium cursor-pointer">
                      <span className="">{order?.customer}</span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5">
                      <span className="before:text-normal before:content-['Price: ']">
                        ${order?.total}
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <span className="before:text-normal before:content-['Price: ']">
                        {order?.method === 0 ? (
                          <span>Cash</span>
                        ) : (
                          <span>Paid</span>
                        )}
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      <span className="before:text-normal before:content-['Price: ']">
                        {status[order?.status]}
                      </span>
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                      {(status[order?.status] === "Payment" ||
                        status[order?.status] === "Preparing" ||
                        status[order?.status] === "On the way") && (
                        <button
                          className="border-none bg-teal-500 text-white rounded-lg p-2 cursor-pointer"
                          onClick={() => handleStatus(order?._id)}
                        >
                          Next Stage
                        </button>
                      )}
                      {status[order?.status] === "Delivered" && (
                        <button className="border-none bg-gray-500 text-white rounded-lg p-2 cursor-pointer">
                          Order Fulfilled
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If there is no cookie or the token is not correct, redirect to login page
  const myCookie = context.req?.cookies || "";
  let isLoggedIn;
  if (!myCookie.userToken) {
    isLoggedIn = false;
    return { redirect: { destination: "/admin/login", permanent: false } };
  } // nextJS redirect method
  if (myCookie.userToken) {
    isLoggedIn = true;
  }

  await dbConnect();
  /* Fetch existing data from mongoDB*/
  const productsResult = await Product.find({});
  const products = productsResult.reverse().map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    return product;
  });

  const ordersResult = await Order.find({});
  const orders = ordersResult.reverse().map((doc) => {
    const order = doc.toObject();
    order._id = order._id.toString();
    return order;
  });
  // const productRes = await axios.get("http://localhost:3000/api/products");
  // const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      // orders: orderRes.data,
      orders: JSON.parse(JSON.stringify(orders)),
      // products: productRes.data,
      products: JSON.parse(JSON.stringify(products)),
      isLoggedIn: isLoggedIn,
    },
  };
};
