import Head from "next/head";
import { Header, Footer } from "./";

const Layout = ({ children }) => {
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
        <Header />
        <main className="flex-grow ">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
