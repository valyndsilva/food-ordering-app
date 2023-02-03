import { Html, Head, Main, NextScript } from "next/document";
// import loader from "../components/Loader";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <style>{loader}</style> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=Inter:wght@300;400;500;600;700&family=Satisfy&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        {/* <div id={"globalLoader"}>
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div> */}
        <Main />
        <NextScript />
        {/* <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script> */}
      </body>
    </Html>
  );
}
