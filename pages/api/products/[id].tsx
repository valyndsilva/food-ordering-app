import dbConnect from "../../../util/mongodb";
import Product from "../../../models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.userToken;

  // Connect to dbConnect
  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }
  if (method === "PUT") {
    console.log(req.body);
    
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }
    // update product
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      }); //new:true returns the most updated version
      // const product = await Product.updateOne(id, req.body, {
      //   new: true,
      // }); //new:true returns the most updated version
      res.status(200).json(product);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }
  if (method === "DELETE") {
    if (!token) {
      return res.status(401).json("Not authenticated!");
    }
    // delete product
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }
}
