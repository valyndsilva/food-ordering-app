import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

function Product({ pizza }) {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  // To fix hydration UI mismatch issues, we need to wait until the component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  // const pizza = {
  //   id: 1,
  //   img: "/assets/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 23.9, 27.9],
  //   desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  // };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(diff);
  };
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  // console.log(extras);

  // Dispatching the cart actions:
  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, qty }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-10">
      <div className="col-span-1 md:col-span-2 items-center justify-center p-10">
        <div className=" h-[300px] w-full md:h-full relative">
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className="col-span-1 text-center space-y-4 md:text-left md:col-span-2 p-5">
        <h1 className="text-3xl md:text-3xl font-bold">{pizza.title}</h1>
        <span className="text-[#d1411e] text-2xl font-normal border-b-2 border-bottom-[#d1411e]">
          ${price}
        </span>
        <p className="desc">{pizza.desc}</p>
        <div className="w-full items-center justify-center">
          <h3 className="font-bold text-xl">Choose the size:</h3>
          <div className="grid grid-cols-3 gap-6 items-center md:w-fit py-5 ">
            <div
              className="col-span-1 w-8 h-8 relative cursor-pointer justify-self-center"
              onClick={() => handleSize(0)}
            >
              <Image src="/assets/size.png" layout="fill" alt="" />
              <span className="absolute top[-5px] right-[-20px] bg-teal-500 text-white text-sm py-0 px-1 rounded-xl">
                Small
              </span>
            </div>
            <div
              className="col-span-1  w-10 h-10 relative cursor-pointer justify-self-center"
              onClick={() => handleSize(1)}
            >
              <Image src="/assets/size.png" layout="fill" alt="" />
              <span className="absolute top[-5px] right-[-20px] bg-teal-500 text-white text-sm py-0 px-1 rounded-xl">
                Medium
              </span>
            </div>
            <div
              className="col-span-1  w-12 h-12 relative cursor-pointer justify-self-center"
              onClick={() => handleSize(2)}
            >
              <Image src="/assets/size.png" layout="fill" alt="" />
              <span className="absolute top[-5px] right-[-20px] bg-teal-500 text-white text-sm py-0 px-1 rounded-xl">
                Large
              </span>
            </div>
          </div>
        </div>
        <div className="w-full items-center justify-center">
          <h3 className="font-bold text-xl">Choose Ingredients:</h3>

          <div className="flex-col md:inline-flex md:flex-row md:flex-wrap gap-4 pt-5">
            {pizza.extraOptions.map((option) => (
              <div className="checkboxItem" key={option._id}>
                <input
                  className="w-6 h-6 md:w-5 md:h-5"
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="extra_cheese">{option.text}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-5">
          <input
            min="1"
            onChange={(e) => setQty(e.target.value)}
            type="number"
            defaultValue={1}
            className="border border-gray-500 rounded-md w-16 text-center md:h-8"
          />
          <button
            className="px-3 rounded-md md:h-8 ml-2 bg-[#d1411e] text-white border-none font-medium cursor-pointer"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;

// Fetch a single product
export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  const pizza = res.data;
  return {
    props: {
      pizza: pizza,
    },
  };
};
