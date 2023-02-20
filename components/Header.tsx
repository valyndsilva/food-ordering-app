import React from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { GiFullPizza, GiHamburgerMenu } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { FaUser, FaUserCircle } from "react-icons/fa";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  isLoggedIn: boolean;
}

function Header({ isLoggedIn }: Props) {
  // console.log({ isLoggedIn });

  const dispatch = useDispatch();

  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  //   if (!mounted) return null;

  // Mobile Navigation
  const [isNavOpen, setIsNavOpen] = useState(false);
  // console.log(isNavOpen);

  const quantity = useSelector((state: any) => state.cart.cartQuantity);

  const router = useRouter();

  // const handleLogOut = async () => {
  //   const user = await axios.get("/api/auth/logout");
  //   console.log(user);
  //   router.push("/admin/login");
  // };

  const handleLogOut = async () => {
    const user = await axios.post("/api/auth/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({}),
    });
    console.log(user);
    router.push("/admin/login");
  };

  return (
    <>
      <header className="w-full shadow-xl  h-24 py-0 px-12 bg-[#3E2823]/90 flex items-center justify-between sticky top-0 z-50">
        <div className="container px-4 md:px-0 h-full mx-auto flex items-center justify-between">
          {/* Logo Here */}
          <Link href="/">
            <span className="flex items-center text-yellow-400 text-xl font-bold italic">
              <GiFullPizza className="w-14 h-14 lg:w-12 lg:h-12 text-white mr-2" />
              Pizza<span className="text-white">Rustica</span>
            </span>
          </Link>

          {/* Menu links here  */}
          <nav
            id="menu"
            className="flex fixed top-0 right-0 px-10 py-5 md:py-16 z-50 items-center
            md:relative"
          >
            <div
              className="hidden 
            lg:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6 "
            >
              <Link href="/#about">
                <a className="listItem" href="#">
                  About
                </a>
              </Link>
              <Link href="/#plans">
                <a className="listItem" href="#">
                  Menu
                </a>
              </Link>
              <Link href="/#contact">
                <a className="listItem" href="#">
                  Contact
                </a>
              </Link>
              {isLoggedIn && (
                <Link href="/admin">
                  <a className="listItem" href="/admin">
                    Dashboard
                  </a>
                </Link>
              )}
            </div>
            <div className="flex md:p-0 md:bg-transparent md:flex-row md:space-x-6 ml-4">
              <Link href="#">
                <a className="hidden listItem md:inline-flex items-center gap-2 lg:border-l pl-4">
                  <MdLocationOn className="w-8 h-8" />
                </a>
              </Link>

              <Link href="/cart">
                <div className="flex md:flex-grow items-center justify-end relative cursor-pointer">
                  <AiOutlineShoppingCart className="w-8 h-8 ml-2 text-white opacity-70 hover:opacity-100" />
                  <div className="absolute top-[5px] right-[-10px] w-5 h-5 rounded-[50%] bg-white p-1 flex items-center font-bold text-[#d1411e]">
                    {quantity}
                  </div>
                </div>
              </Link>
              {isLoggedIn && (
                <span className="flex items-center ml-4">
                  <div
                    className=" flex p-3 border hover:bg-gray-400/50 rounded-lg text-white font-medium text-center cursor-pointer"
                    onClick={() => handleLogOut()}
                  >
                    <FaUser className="hidden md:inline-flex w-5 h-5 mr-2 cursor-pointer text-white" />
                    Logout
                  </div>
                </span>
              )}

              {isNavOpen ? (
                <div
                  className="lg:hidden p-4 rounded dark:bg-zinc-600 hover:dark:bg-zinc-500  cursor-pointer"
                  onClick={() => setIsNavOpen(false)}
                >
                  <AiOutlineClose className="h-6 w-6 cursor-pointer text-white hover:text-red-200" />
                </div>
              ) : (
                <div
                  className="lg:hidden p-4 rounded dark:bg-zinc-600 hover:dark:bg-zinc-500  cursor-pointer"
                  onClick={() => setIsNavOpen((prev) => !prev)}
                >
                  <GiHamburgerMenu className="h-6 w-6 cursor-pointer text-white hover:text-red-200" />
                </div>
              )}
            </div>
          </nav>
          {/* This is used to open the menu on mobile devices */}

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className="flex flex-col lg:hidden space-x-8 items-center z-100">
              <div className="fixed right-0 top-[6rem] bg-[#3E2823] border-t py-4 px-12 flex flex-col items-center justify-center space-y-12 w-full h-screen text-white">
                <span
                  className="hover:text-red-200  py-4 px-4"
                  onClick={() => {
                    setIsNavOpen(false);
                    router.push("/#about");
                  }}
                >
                  <span className="">About</span>
                </span>
                <span
                  className="hover:text-red-200  py-4 px-4"
                  onClick={() => {
                    setIsNavOpen(false);
                    router.push("/#plans");
                  }}
                >
                  <span className="">Menu</span>
                </span>

                <span
                  className="hover:text-red-200  py-4 px-4"
                  onClick={() => {
                    setIsNavOpen(false);
                    router.push("/#contact");
                  }}
                >
                  <span className="">Contact</span>
                </span>

                {isLoggedIn && (
                  <span
                    onClick={() => {
                      setIsNavOpen(false);
                      router.push("/admin");
                    }}
                    className="hover:text-red-200  py-4 px-4"
                  >
                    <span className="">Dashboard</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
