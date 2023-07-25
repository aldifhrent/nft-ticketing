'use client'

import Head from "next/head";
import React, { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css' 
import Header from '../components/homepage/header/Header';
import { Hero } from "../components/homepage/hero/Hero";
import { About } from "../components/homepage/about/About";
import { Benefit } from "../components/homepage/benefit/Benefit";
import { Partner } from "../components/homepage/partner/Partner";
import { Footer } from "../components/homepage/footer/Footer";

export default function Home() {
  useEffect(() => {
    Aos.init();
  }, [])
  return (
    <>
      <Head>
        <title>NFT Ticketing Platform</title>
        <meta name="description" content="NFTicketing Experiment Using ThirdWeb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-black">
        <Header />
        <Hero/>
        <About/>
        <Benefit/>
        <Partner/>
        <Footer/>
      </main>
    </>
  );
}
