import React from "react";
import PizzaCard from "./PizzaCard";

interface Props {
  products: Product[];
}

function PizzaList({ products }: Props) {
  // console.log(products);
  return (
    <div
      id="pizza-menu"
      className="flex flex-col items-center py-10 px-3 text-gray-800"
    >
      <div className="w-[90%] md:w-[90%] text-center">
        <h2 className="text-xl font-semibold py-5">Our Menu</h2>
        <p>
          At Pizza Rustica, we believe that every pizza should be a work of art.
          That's why we use only the freshest ingredients and traditional
          techniques to craft pizzas that are both delicious and nutritious. Our
          menu features a variety of vegetarian and non-vegetarian options, made
          with only the finest ingredients. Order online now to enjoy the best
          pizza in town.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="border rounded-lg  p-10">
            <h3 className="text-md py-4 font-semibold">Vegetarian Pizzas</h3>
            <p>
              Our vegetarian pizzas are made with the same care and attention as
              our meat-based options. Try one of our classic margheritas, or opt
              for something a little more adventurous with our veggie supreme.
            </p>
          </div>
          <div className="border rounded-lg  p-10">
            <h3 className="text-md py-4 font-semibold">
              Non-Vegetarian Pizzas
            </h3>
            <p>
              For meat-lovers, our non-vegetarian pizzas are the perfect choice.
              From classic pepperoni to more exotic options like chicken tikka,
              there's something for everyone on our menu.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 w-full items-center text-center justify-center py-10">
          {products.map((product) => (
            <div key={product._id}>
              <PizzaCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PizzaList;
