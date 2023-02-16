import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from ".";

const Layout = ({ children ,isLoggedIn}: any) => {
  const auth = useSelector((state: any) => state.auth);
  // console.log(auth);
  const isAuthenticated = auth.isAuthenticated;

  return (
    <>
      <Head>
        <title>Pizza Rustica | Pizza Delivery App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Pizzeria Rustica | Pizza Delivery Service"
        />
      </Head>
      <div className="min-h-screen flex flex-col  ">
        <Header isLoggedIn={isAuthenticated} />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
