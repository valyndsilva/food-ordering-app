import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
}

function PizzaCard({ product }: Props) {
  // console.log(product);
  return (
    <div className=" w-full  p-3 flex flex-col items-center justify-center py-5 px-10 cursor-pointer hover:shadow-lg">
      <Link  href={`/product/${product._id}`}>
        <Image src={product.img} alt="" width="500" height="500" />
      </Link>
      <h1 className="pt-5 text-3xl md:text-lg font-bold text-[#d1411e]">
        {product.title}
      </h1>
      <span className="text-2xl md:text-lg font-bold text-[#666]">
        ${product.prices[0]}
      </span>
      <p className="text-2xl md:text-lg text-center text-[#777]">
        {product.desc}
      </p>
    </div>
  );
}

export default PizzaCard;
