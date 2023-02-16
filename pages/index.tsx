import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { About, Featured, PizzaList } from "../components";
import { setIsAuthenticated } from "../redux/slices/authSlice";
interface Props {
  products: any;
  isLoggedIn: any;
}
const Home = ({ products, isLoggedIn }: Props) => {
  console.log({ isLoggedIn });
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

  const productRes = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: productRes.data,
      isLoggedIn: isLoggedIn,
    },
  };
};
