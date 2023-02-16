import dbConnect from "../../../util/mongodb";
import Order from "../../../models/Order";
import { reset } from "../../../redux/slices/cartSlice";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    // update order
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      }); //new:true returns the most updated version
      res.status(200).json(order);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  if (method === "DELETE") {
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json("The order has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
