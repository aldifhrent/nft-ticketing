'use client'

import Head from "next/head";
import React, { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css' 
import Header from '../components/homePage/header/Header';
import { Hero } from "../components/homePage/hero/Hero";
import { About } from "../components/homePage/about/About";
import { Benefit } from "../components/homePage/benefit/Benefit";
import { Partner } from "../components/homePage/partner/Partner";
import { Footer } from "../components/homePage/footer/Footer";

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
