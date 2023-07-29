import React, { useState } from "react";
import Head from "next/head";
import { HeaderApps } from "../components/apps/HeaderApps";
import VerifyTicket from '../components/verify/VerifyTicket';
const VerifyNFT = () => {
  return (
    <>
      <Head>
        <title>Verify Ticket</title>
        <meta
          name="description"
          content="NFTicketing Experiment Using ThirdWeb"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeaderApps />
        <VerifyTicket />
      </main>
    </>
  );
};

export default VerifyNFT;
