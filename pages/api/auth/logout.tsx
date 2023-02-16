/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;

  const jwt = cookies.userToken;

  if (!jwt) {
    return res.json({ message: "You are already logged out..." });
  } else {
    const serialised = serialize("userToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}
