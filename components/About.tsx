import React from "react";

type Props = {};

function About({}: Props) {
  return (
    <div id="about" className="flex flex-col w-full justify-center items-center pt-10 px-3 text-gray-800 dark:bg-[#3E2823]/80">
      <div className="w-[90%] text-center">
        <h1 className="text-center text-2xl font-bold pb-5">
          Welcome to Pizza Rustica!
        </h1>
        <p className="">
          Welcome to the Pizza Rustica, an online ordering system! We are a
          locally-owned pizza delivery service dedicated to bringing you the
          freshest and most delicious pizzas right to your door.
        </p>
      </div>
    </div>
  );
}

export default About;
