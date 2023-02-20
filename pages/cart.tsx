import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { reset } from "../redux/slices/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import { Header, OrderDetail } from "../components";
import Order from "../models/Order";

interface IBtn {
  currency: any;
  showSpinner: boolean;
}

interface Props {
  isLoggedIn: boolean;
}
function Cart({ isLoggedIn }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const createOrder = async (data: any) => {
    try {
      const res = await axios.post("/api/orders", data);
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

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }: IBtn) => {
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
          style={{ layout: "vertical" }}
          disabled={false}
          forceReRender={[amount, currency, { layout: "vertical" }]}
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
          onApprove={function (data: any, actions: any) {
            return actions.order.capture().then(function (details: any) {
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
    <>
      <div className="flex flex-col m-8 items-center justify-center ">
        <div className="w-full max-w-7xl md:w-full">
          <div className="w-full md:w-full">
            <h1 className="text-3xl mb-5">You Shopping Cart</h1>
            <p>
              Here, you can view the pizzas you've added to your order. You can
              also modify your order or remove items if needed.
            </p>
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 space-x-4 my-5">
              {cart.products.map((product: any) => (
                <div className="flex border  rounded-lg">
                  <div className="h-[250px] flex items-center justify-center">
                    <Image
                      src={product.img}
                      width={250}
                      height={200}
                      className="object-contain"
                      alt={product.title}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5">
                    <h2 className="text-xl md:text-2xl">{product.title}</h2>
                    <h3>
                      Extras:
                      {/* {product.extraOptions.map((option) => (
                        <span key={option._id}>{option.topping}</span>
                      ))} */}
                      <span className="ml-1">
                        {Array.from(
                          product.extraOptions.values(),
                          (v: any) => v.topping
                        ).join(",")}
                      </span>
                    </h3>
                    <span className="before:text-normal before:content-['Price: ']">
                      Price: £{product.price}
                    </span>
                    <span className="before:text-normal before:content-['Quantity: ']">
                      Quantity: {product.qty}
                    </span>
                    <span className="before:text-normal before:content-['Price: ']">
                      Total: £{product.price * product.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p>
            When you're ready to checkout, simply enter your delivery
            information and payment details. We accept a variety of payment
            options, including credit/debit cards and PayPal.
          </p>
          <div className="w-full flex-col space-y-2 md:space-y-0 md:inline-flex md:flex-row gap-6 border rounded-lg p-8 mt-5 items-center justify-center text-center ">
            <div className="font-medium text-lg">
              <b className=" mr-2">Subtotal:</b>£{cart.total}
            </div>
            <div className="font-medium text-lg">
              <b className=" mr-2">Discount:</b>£0.00
            </div>
            <div className="font-medium text-lg">
              <b className=" mr-2">Cart Total:</b>£{cart.total}
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
                    currency: "GBP",
                    "disable-funding": "credit,card,p24", // to disable any other payment methods which collaborates with paypal
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
      </div>
    </>
  );
}

export default Cart;

export const getServerSideProps = async (context: any) => {
  // If there is no cookie or the token is not correct, redirect to login page

  const myCookie = context.req?.cookies || "";
  let isLoggedIn = false;
  if (myCookie.userToken) {
    isLoggedIn = true;
  }

  return {
    props: {
      isLoggedIn: isLoggedIn,
    },
  };
};
