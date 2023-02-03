import axios from "axios";
import { useEffect, useState } from "react";
import { AddButton, AddProduct, Featured, PizzaList } from "../components";
const Home = ({ pizzaList, admin }) => {
  const [close, setClose] = useState(true);

  return (
    <main className="">
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddProduct setClose={setClose} />}
    </main>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  // If there is no cookie or the token is not correct, redirect to login page
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  const pizzaList = res.data;
  return {
    props: {
      pizzaList: pizzaList,
      admin: admin,
    },
  };
};
