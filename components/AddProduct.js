import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function AddProduct({ setClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/valyndsilva/image/upload",
        data
      );
      console.log(uploadRes.data);
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-400 fixed top-0 z-[999] flex items-center justify-center">
      <div className="w-[500px] bg-white py-5 px-12 rounded-lg flex flex-col justify-between relative">
        <span
          onClick={() => setClose(true)}
          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer absolute top-5 right-5"
        >
          X
        </span>
        <h1 className="text-2xl mb-3">Add A New Pizza</h1>
        <div className="flex flex-col mb-5">
          <label className="mb-2 text-md font-bold">Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Title</label>
          <input
            className="border p-2 outline-none"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Desc</label>
          <textarea
            className="border p-2 outline-none"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
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
              onChange={handleExtraInput}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button
              className="bg-teal-500 text-white rounded-lg py-2 px-3"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className="my-3 mx-0 flex flex-wrap">
            {extraOptions.map((option) => (
              <span
                key={option.text}
                className="p-2 mb-2 text-md border border-red-400 bg-white text-red-400 mr-2 rounded-lg cursor-pointer"
              >
                {option.text}
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
