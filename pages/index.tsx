import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { About, Featured, PizzaList } from "../components";
import Product from "../models/Product";
import { setIsAuthenticated } from "../redux/slices/authSlice";
import dbConnect from "../util/mongodb";
interface Props {
  products: any;
  isLoggedIn: any;
}
const Home = ({ products, isLoggedIn }: Props) => {
  // console.log({ isLoggedIn });
  const dispatch = useDispatch();
  dispatch(setIsAuthenticated(isLoggedIn));
  return (
    <>
      <main className="">
        <Featured />
        <About />
        <PizzaList products={products} />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: any) => {
  // If there is no cookie or the token is not correct, redirect to login page

  const myCookie = context.req?.cookies || "";
  let isLoggedIn = false;
  if (myCookie.userToken) {
    isLoggedIn = true;
  }

  await dbConnect();
  /* Fetch existing data from mongoDB*/
  const result = await Product.find({});
  const products = result.reverse().map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    return product;
  });
  // const productRes = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      // products: productRes.data,
      products: JSON.parse(JSON.stringify(products)),
      isLoggedIn: isLoggedIn,
    },
  };
};
