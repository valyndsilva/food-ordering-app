import { NextApiRequest, NextApiResponse } from "next";

/* eslint-disable import/no-anonymous-default-export */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;
console.log({cookies});
  const jwt = cookies.userToken;
// console.log(jwt);
  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }

  return res.json({ message: "Success!" });
}
