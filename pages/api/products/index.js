import dbConnect from "../../../util/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  // we make this function asynchronous because we're going to make our CRUD operations and there is no way to know how long it's going to take

  const { method, cookies } = req;
  const token = cookies.token;
  
  // Connect to dbConnect
  await dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  if (method === "POST") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authorised!");
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
