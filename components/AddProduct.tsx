import React, { useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  setAddExtra,
  setAddExtraOptions,
  setDesc,
  setExtraOptions,
  setImg,
  setPrices,
  // setProductList,
  setTitle,
  setTopping,
  setToppingPrice,
} from "../redux/slices/productSlice";
import { setAddModal } from "../redux/slices/modalSlice";
interface Props {}
function AddProduct({}: Props) {
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.product);
  // console.log(product);
  const [extraOptionsInput, setExtraOptionsInput] = useState([]);
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    console.log(index);
    // console.log(product.prices);
    const currentPrices = JSON.parse(JSON.stringify(product.prices)); //error fix: cannot add property 'X', object is not extensible
    console.log(currentPrices);
    currentPrices[index] = e.target.value;
    console.log(currentPrices);
    dispatch(setPrices(currentPrices));
  };

  const handleExtra = () => {
    setExtraOptionsInput([]);
    const extraTopping = {
      topping: product.topping,
      toppingPrice: product.toppingPrice,
    };
    dispatch(setExtraOptions([...product.extraOptions, extraTopping])); //concatenate new values to existing data
    dispatch(setAddExtra(true));
    console.log(product.extraOptions);
    setExtraOptionsInput([...product.extraOptions, extraTopping]);
  };

  const getCloudinaryUrl = async (file: any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/valyndsilva/image/upload",
        data
      );
      console.log(uploadRes.data);
      const { url }: any = uploadRes.data;
      dispatch(setImg(url));
      return product.img;
    } catch (err) {
      console.log(err);
    }
  };
  const router = useRouter();

  const handleCreate = async () => {
    setExtraOptionsInput([]);
    const newProduct = {
      title: product.title,
      desc: product.desc,
      prices: product.prices,
      extraOptions: product.extraOptions,
      img: product.img,
    };
    console.log({ newProduct });
    dispatch(addProduct(newProduct));
    await axios.post("http://localhost:3000/api/products", newProduct);

    handleClose();
    router.replace(router.asPath); // update through ssr without refreshing page
  };
  const handleClear = () => {
    setExtraOptionsInput([]);
    dispatch(setExtraOptions([]));
    console.log({ extraOptionsInput });
  };
  const handleClose = () => {
    handleClear();
    dispatch(setAddModal(false));
    router.replace(router.asPath);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-400/50 fixed top-0 left-0 z-[999] flex items-center justify-center">
      <div className="w-[500px] bg-white py-5 px-12 rounded-lg flex flex-col justify-between relative">
        <span
          onClick={handleClose}
          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer absolute top-5 right-5"
        >
          X
        </span>
        <h1 className="text-2xl mb-3">Add A New Pizza</h1>
        <div className="flex flex-col mb-5">
          <label className="mb-2 text-md font-bold">Choose an image</label>
          <input
            type="file"
            className="cursor-pointer"
            onChange={(e) => getCloudinaryUrl(e.target.files![0])}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Title</label>
          <input
            className="border p-2 outline-none"
            type="text"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Desc</label>
          <textarea
            className="border p-2 outline-none"
            rows={4}
            onChange={(e) => dispatch(setDesc(e.target.value))}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Prices</label>
          <div className="flex gap-4">
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-medium">Extra</label>
          <div className="flex gap-4">
            <input
              className="border p-2  outline-none w-[25%]"
              type="text"
              placeholder="Item"
              name="text"
              onChange={(e) => dispatch(setTopping(e.target.value))}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Price"
              name="price"
              onChange={(e) => dispatch(setToppingPrice(e.target.value))}
            />
            <span
              className=" cursor-pointer bg-teal-500 text-white rounded-lg py-2 px-3"
              onClick={handleExtra}
            >
              Add
            </span>
          </div>
          <div className="my-3 mx-0 flex flex-wrap">
            {extraOptionsInput?.map((option: any, index: any) => (
              <span
                key={option.topping + index}
                className="p-2 mb-2 text-md border border-red-400 bg-white text-red-400 mr-2 rounded-lg cursor-pointer"
              >
                {option.topping}
              </span>
            ))}
          </div>
        </div>
        <button
          className="width-[25%] border-none bg-teal-500 text-white rounded-lg  font-medium cursor-pointer py-2 px-3"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
