import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../../redux/slices/authSlice";
import { GetServerSideProps } from "next";

interface Props {
  isLoggedIn: boolean;
  myCookie: Cookie;
}
function Login({ isLoggedIn, myCookie }: Props) {
  // console.log({ isLoggedIn });
  // console.log({ myCookie });
  const { register, handleSubmit } = useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  // console.log(auth);

  dispatch(setIsAuthenticated(isLoggedIn));

  // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const credentials = { username, password };
  //   await axios.post("/api/auth/login", credentials);

  //   handleGetUser();

  // };

  // const handleGetUser = async () => {
  //   const user = await axios.get("/api/user");
  //   // console.log(user.data.message);
  //   user.data.message === "Success!" && router.push("/admin");
  //   user.data.message === ("Invalid token!" || undefined) &&
  //     router.push("/admin/login");
  // };

  const onSubmit = handleSubmit(async (data) => {
    const user = await axios.post("/api/auth/login", data);
    console.log(user);
    user.data.message === "Success!" && router.push("/admin");
    user.data.message === ("Invalid token!" || undefined) &&
      router.push("/admin/login");
  });

  return (
    <>
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <form
          className="form-group flex flex-col"
          // onSubmit={(e) => handleSubmit(submitForm(e))}
          onSubmit={onSubmit}
        >
          <h1 className="text-4xl font-bold mb-5">Admin Dashboard</h1>
          <input
            type="text"
            {...register("username")}
            required
            className="form-input"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            {...register("password")}
            required
            className="form-input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="h-16 mb-5 border-none bg-[#3E2823]/80 text-white font-bold cursor-pointer rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // If there is no cookie or the token is not correct, redirect to login page
  const myCookie = context.req?.cookies || "";
  let isLoggedIn;
  if (!myCookie.userToken) {
    isLoggedIn = false;
  } // nextJS redirect method
  if (myCookie.userToken) {
    isLoggedIn = true;
    return { redirect: { destination: "/admin", permanent: false } };
  }

  return {
    props: {
      myCookie: myCookie,
      isLoggedIn: isLoggedIn,
    },
  };
};
