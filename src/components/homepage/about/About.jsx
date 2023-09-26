import React from "react";

export const About = () => {
  return (
    <section className="" id="about" data-aos="fade-right">
      <div className="grid container px-4 py-8 mx-auto">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="flex">
            <h1 className="text-white mb-6 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Who Are We
            </h1>
          </div>
          <p className="max-w-2xl mb-6 font-normal text-gray-400 lg:mb-8 md:text-lg lg:text-xl">
            NFTicketing is an innovative project that aims to revolutionize the
            music ticketing industry through Non-Fungible Token (NFT)
            technology. The concept of NFTicketing combines blockchain
            technology with the world of music, creating a new ecosystem that
            enables music ticket sales and exclusive access using NFTs.
          </p>
        </div>
      </div>
    </section>
  );
};
