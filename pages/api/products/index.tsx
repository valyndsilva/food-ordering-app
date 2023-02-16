import dbConnect from "../../../util/mongodb";
import Product from "../../../models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // we make this function asynchronous because we're going to make our CRUD operations and there is no way to know how long it's going to take

  const { method, cookies } = req;
  const token = cookies.userToken;

  // Connect to dbConnect
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      console.log(products);
      
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  if (method === "POST") {
    if (!token) {
      return res.status(401).json("Not authorised!");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
