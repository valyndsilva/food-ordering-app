import React from "react";
import Image from "next/image";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
function Featured() {
  const images = [
    "/assets/featured/1.png",
    "/assets/featured/2.png",
    "/assets/featured/3.png",
  ];

  const [index, setIndex] = useState(0);

  const handleArrow = (direction:string) => {
    if (direction === "left") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "right") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  return (
    <div className="w-full h-[20vh] md:h-[70vh] overflow-hidden relative bg-[#3E2823]">
      <BsChevronLeft
        className=" w-8 h-8 text-white absolute left-0 top-0 bottom-0 m-auto cursor-pointer z-[999]"
        onClick={() => handleArrow("left")}
      />
      <div
        className={`w-[400vw] h-full flex transition-all ease-in duration-250`}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className="w-[100vw] h-full relative" key={i}>
            <Image priority src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <BsChevronRight
        className="w-8 h-8 right-0 text-white absolute top-0 bottom-0 m-auto cursor-pointer z-[999]"
        onClick={() => handleArrow("right")}
      />
    </div>
  );
}

export default Featured;
