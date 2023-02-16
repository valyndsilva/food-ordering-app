import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddExtra,
  setDeleteExtra,
  setDesc,
  setEditProduct,
  setExtraOptions,
  setImg,
  setPrices,
  setTitle,
  setTopping,
  setToppingPrice,
} from "../redux/slices/productSlice";
import { setEditModal } from "../redux/slices/modalSlice";
interface Props {}
function EditProduct({}: Props) {
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.product);
  console.log(product);
  // product.id
  const editProduct = product.productList.filter(
    (pizza: { _id: any; }) => pizza._id === product.productId && pizza
  )[0];
  console.log({ editProduct });
  dispatch(setEditProduct(editProduct));
  const [titleInput, setTitleInput] = useState(editProduct.title);
  const [descInput, setDescInput] = useState(editProduct.desc);
  const [pricesInput, setPricesInput] = useState(editProduct.prices);
  const [toppingInput, setToppingInput] = useState("");
  const [toppingPriceInput, setToppingPriceInput] = useState("");
  const [extraOptionsInput, setExtraOptionsInput] = useState(
    editProduct.extraOptions
  );
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    dispatch(setTitle(e.target.value));
  };

  const onDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescInput(e.target.value);
    dispatch(setDesc(e.target.value));
  };

  const onPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    console.log(index);
    console.log(editProduct.prices);
    const currentPrices = JSON.parse(JSON.stringify(product.prices)); //error fix: cannot add property 'X', object is not extensible
    console.log(currentPrices);
    currentPrices[index] = e.target.value;
    setPricesInput(currentPrices);
    dispatch(setPrices(currentPrices));
  };

  const onToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToppingInput(e.target.value);
    dispatch(setTopping(e.target.value));
  };
  const onToppingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToppingPriceInput(e.target.value);
    dispatch(setToppingPrice(e.target.value));
  };

  const handleExtra = () => {
    const extraTopping = {
      topping: product.topping,
      toppingPrice: product.toppingPrice,
    };
    console.log(extraTopping); //latest topping added
    dispatch(setAddExtra(true));
    dispatch(setExtraOptions([...extraOptionsInput, extraTopping])); //editProduct.extraOptions below
    console.log(product.extraOptions);
    setExtraOptionsInput([...extraOptionsInput, extraTopping]);
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

  const handleDeleteOption = (topping: string) => {
    console.log("option clicked to delete topping:", topping);
    const afterDeleteOptions = extraOptionsInput.filter(
      (option: { topping: string; }) => option.topping !== topping
    );
    console.log(afterDeleteOptions);
    dispatch(setExtraOptions(afterDeleteOptions));
     setExtraOptionsInput(afterDeleteOptions);

  };

  const handleUpdate = async () => {
    setExtraOptionsInput([]);

    const updateProduct = {
      title: titleInput,
      desc: descInput,
      prices: pricesInput,
      extraOptions: extraOptionsInput,
      img: editProduct.img,
    };
    console.log(updateProduct);
    await axios.put(
      "http://localhost:3000/api/products/" + product.productId,
      updateProduct
    );

    handleClose();
    router.replace(router.asPath); // update through ssr without refreshing page
  };
  const handleClear = () => {
    setExtraOptionsInput([]);
    dispatch(setExtraOptions([]));
    console.log({ extraOptionsInput });

    setTitleInput("");
    setDescInput("");
    setPricesInput([]);
    setToppingInput("");
    setToppingPriceInput("");
  };

  const handleClose = () => {
    handleClear();
    dispatch(setEditModal(false));
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
        <h1 className="text-2xl mb-3">Update Pizza Details</h1>
        <div className="flex flex-col mb-5">
          <label className="mb-2 text-md font-bold">Choose an image</label>
          <input
            type="file"
            onChange={(e) => getCloudinaryUrl(e.target.files![0])}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Title</label>
          <input
            className="border p-2 outline-none"
            type="text"
            name="title"
            value={titleInput}
            onChange={(e) => onTitleChange(e)}
            // onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Desc</label>
          <textarea
            className="border p-2 outline-none"
            rows={4}
            value={descInput}
            onChange={(e) => onDescChange(e)}
            // onChange={(e) => dispatch(setDesc(e.target.value))}
          />
        </div>
        <div className="flex flex-col mb-3">
          <label className="mb-2 text-md font-bold">Prices</label>
          <div className="flex gap-4">
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Small"
              value={pricesInput[0]}
              onChange={(e) => onPriceChange(e, 0)}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Medium"
              value={pricesInput[1]}
              onChange={(e) => onPriceChange(e, 1)}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Large"
              value={pricesInput[2]}
              onChange={(e) => onPriceChange(e, 2)}
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
              value={toppingInput}
              onChange={(e) => onToppingChange(e)}
            />
            <input
              className="border p-2  outline-none w-[25%]"
              type="number"
              placeholder="Price"
              name="price"
              value={toppingPriceInput}
              onChange={(e) => onToppingPriceChange(e)}
            />
            <span
              className="bg-teal-500 text-white rounded-lg py-2 px-3"
              onClick={handleExtra}
            >
              Add
            </span>
          </div>
          <div className="my-3 mx-0 flex flex-wrap">
            {extraOptionsInput?.map((option: any, index: any) => (
              <span
                onClick={() => handleDeleteOption(option.topping)}
                key={option.topping + index}
                className="relative py-2 px-7 mb-2 text-md border border-red-400 bg-white text-red-400 mr-2 rounded-lg cursor-pointer"
              >
                {option.topping}
                <span className="w-5 h-5 text-xs text-red-400 border border-red-400 rounded-full flex items-center justify-center absolute top-1 right-1">
                  X
                </span>
              </span>
            ))}
          </div>
        </div>
        <button
          className="width-[25%] border-none bg-teal-500 text-white rounded-lg  font-medium cursor-pointer py-2 px-3"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditProduct;
