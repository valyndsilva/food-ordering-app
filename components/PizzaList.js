import React from "react";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzaList }) {
  return (
    <div className="flex flex-col items-center py-10 px-3">
      <h1 className="text-center text-2xl font-bold pb-5">
        THE BEST PIZZA IN TOWN
      </h1>
      <p className="text-xl text-[#444] w-[90%] text-center md:text-left md:w-[70%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className="w-full flex items-center justify-center flex-wrap py-10">
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
