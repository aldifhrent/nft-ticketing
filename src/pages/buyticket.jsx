import Head from "next/head";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Heroes } from "../components/apps/Heroes";
import { HeaderApps } from "../components/apps/HeaderApps";

const BuyTicket = () => {
  return (
    <>
      <Head>
        <title>Buy Ticket</title>
        <meta name="description" content="NFTicketing Experiment Using ThirdWeb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <HeaderApps />
          <Heroes />
        </div>
      </main>
    </>
  );
};

export default BuyTicket;
