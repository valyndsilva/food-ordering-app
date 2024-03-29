import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import moment from "moment";
import dbConnect from "../../util/mongodb";
import { GetServerSideProps } from "next";
import Order from "../../models/Order";
interface Props {
  order: Order;
}
function OrderId({ order }: Props) {
  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // const status = 0;
  const status = order?.status;

  const statusClass = (index: number) => {
    if (index - status < 1) return "done flex flex-col items-center mb-5";
    if (index - status === 1)
      return "inProgress flex flex-col items-center mb-5  animate-pulse";
    if (index - status > 1)
      return "undone mb-5  flex flex-col items-center opacity-30";
  };
  return (
    <div className="w-full flex-col p-12 lg:inline-flex">
      <h1 className="text-4xl py-4">Thank you for your order!</h1>
      <p className="text-md">
        Thanks for ordering with Pizza Rustica! Your order has been received and
        is being prepared. You'll receive a confirmation email shortly with all
        the details. Your order details are below. Enjoy your pizza!
      </p>
      <table className="w-full flex flex-row flex-nowrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 lg:inline-table">
        <thead className="text-white">
          <tr className="bg-red-400 flex flex-col flex-no wrap lg:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="border p-5 text-left">Order ID</th>
            <th className="border p-5 text-left">Customer Name</th>
            <th className="border p-5 text-left">Address</th>
            <th className="border p-5 text-left">Order Date</th>
            <th className="border p-5 text-left">Total</th>
          </tr>
        </thead>
        <tbody className="flex-1 ">
          <tr className="flex flex-col flex-nowrap lg:table-row mb-5 mb:mb-0">
            <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
              <span className="font-medium text-[#d1411e] md:text-lg">
                {order?._id}
              </span>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-5 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
              <span className=""> {order?.customer}</span>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-5">
              <span className="before:text-normal before:content-['Price: ']">
                {order?.address}
              </span>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
              <span className="before:text-normal before:content-['Price: ']">
                {moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-5 truncate">
              <span className="before:text-normal before:content-['Price: ']">
                ${order?.total}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="text-2xl py-4">Order Status:</h1>
      <div className="w-full flex-col items-center justify-evenly py-10 border md:inline-flex md:flex-row">
        <div className={statusClass(0)}>
          <Image src="/assets/paid.png" width={30} height={30} alt="" />
          <span>Payment</span>
          <div className="checkedIcon">
            <Image
              className="checkedIcon"
              src="/assets/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(1)}>
          <Image src="/assets/bake.png" width={30} height={30} alt="" />
          <span>Preparing</span>
          <div className="checkedIcon">
            <Image
              className="checkedIcon"
              src="/assets/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(2)}>
          <Image src="/assets/bike.png" width={30} height={30} alt="" />
          <span>On the way</span>
          <div className="checkedIcon">
            <Image
              className="checkedIcon"
              src="/assets/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
        <div className={statusClass(3)}>
          <Image src="/assets/delivered.png" width={30} height={30} alt="" />
          <span>Delivered</span>
          <div className="checkedIcon">
            <Image
              className="checkedIcon"
              src="/assets/checked.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="w-full flex-col space-y-2 md:space-y-0 md:inline-flex md:flex-row gap-6  border p-8 mt-5 items-center justify-center text-center ">
        <div className="font-medium text-lg">
          <b className=" mr-2">Subtotal:</b>${order?.total}
        </div>
        <div className="font-medium text-lg">
          <b className=" mr-2">Discount:</b>$0.00
        </div>
        <div className="font-medium text-lg">
          <b className=" mr-2">Cart Total:</b>${order?.total}
        </div>
        <button className="h-8 bg-[#d1411e] text-white px-4 rounded-lg font-bold cursor-pointer ">
          Paid
        </button>
      </div>
    </div>
  );
}

export default OrderId;

// Fetch a single order
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  await dbConnect();
  const order = await Order.findById(id);

  // const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  // const order = res.data;
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};
