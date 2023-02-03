import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { reset } from "../redux/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import { OrderDetail } from "../components";
function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;


  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/order/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  // Paypal: This values are the props in the UI
  // const amount = "2";
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              console.log(details); // After the order has been approved by Paypal
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1, // cash method:0, PayPal method: 1
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col m-8 items-center justify-center ">
      <div className="w-full md:w-full">
        <table className="w-full flex flex-row flex-no-wrap  rounded-lg overflow-hidden sm:shadow-lg my-5 md:inline-table">
          <thead className="text-white">
            <tr className="hidden bg-red-400 flex-col flex-no wrap md:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              <th className="border h-[10vh] p-5 text-left">Product</th>
              <th className="border p-5 text-left">Name</th>
              <th className="border p-5 text-left">Extras</th>
              <th className="border p-5 text-left">Price</th>
              <th className="border p-5">Quantity</th>
              <th className="border p-5 text-left">Total</th>
              <th className="border p-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="flex-1 ">
            {cart.products.map((product) => (
              <tr
                className="flex flex-col flex-no wrap md:table-row mb-10 md:mb-0"
                key={product._id}
              >
                <td className=" border-grey-light border hover:bg-gray-100 p-5">
                  <div className="h-[5.5vh] md:h-[10vh] relative">
                    <Image
                      src="/assets/pizza.png"
                      layout="fill"
                      objectFit="contain"
                      alt=""
                    />
                  </div>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="font-medium text-[#d1411e] md:text-lg">
                    {product.title}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  <span className="">
                    {product.extraOptions.map((extra) => (
                      <span key={extra._id}>{extra.text}</span>
                    ))}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5">
                  <span className="before:text-normal before:content-['Price: ']">
                    {product.price}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="before:text-normal before:content-['Quantity: ']">
                    {product.qty}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
                  <span className="before:text-normal before:content-['Price: ']">
                    {product.price * product.qty}
                  </span>
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-5 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex-col space-y-2 md:space-y-0 md:inline-flex md:flex-row gap-6  border p-8 mt-5 items-center justify-center text-center ">
        <div className="font-medium text-lg">
          <b className=" mr-2">Subtotal:</b>${cart.total}
        </div>
        <div className="font-medium text-lg">
          <b className=" mr-2">Discount:</b>$0.00
        </div>
        <div className="font-medium text-lg">
          <b className=" mr-2">Cart Total:</b>${cart.total}
        </div>

        {open ? (
          <div className="mt-3 flex flex-col">
            <button
              className="p-2 cursor-pointer mb-2  bg-white text-teal-500 font-bold py-3 px-2"
              onClick={() => setCash(true)}
            >
              CASH ON DELIVERY
            </button>

            <PayPalScriptProvider
              options={{
                "client-id":
                  "ActxEO_49uJFNljhM78_FCcOz5xHoaw18anBB4zl8GmbBA2hT41l2BBSBr8-D5Ec8AkoUXwS9dxVqNmm",
                components: "buttons",
                currency: "USD",
                //  "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
              }}
            >
              <ButtonWrapper currency={currency} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        ) : (
          <button
            className="h-8 bg-[#d1411e] text-white px-4 rounded-lg font-bold cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Proceed To Checkout
          </button>
        )}
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
}

export default Cart;
