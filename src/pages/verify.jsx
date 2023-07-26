import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { NFTAbi } from "../components/NftAbi.js";
import { HeaderApps } from "../components/apps/HeaderApps.jsx";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";

const VerifyNFT = () => {
  const [isNFTHolder, setIsNFTHolder] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const contract = "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1";
  const nftId = 0;
  const address = useAddress();

  const verifyNFTHolder = async () => {
    try {
      // Inisialisasi Web3 dengan node Ethereum di Testnet Mumbai (Matic)
      const web3 = new Web3(
        "https://rpc-mumbai.maticvigil.com/v1/a19a3cb1b68023800e1c769f750570dbd6d58fc4"
      );
      // Buat instance kontrak NFT berdasarkan alamat kontrak
      const nftContract = new web3.eth.Contract(NFTAbi, contract);

      // Panggil fungsi balanceOf di kontrak NFT untuk mendapatkan pemegang NFT dari NFT ID
      const nftHolder = await nftContract.methods
        .balanceOf(address, nftId) // Menggunakan inputAddress sebagai alamat NFT
        .call();

      // Jika nilai balik dari fungsi balanceOf bukan 0, berarti pemegang NFT valid
      const isHolder = parseInt(nftHolder) > 0;
      setIsNFTHolder(isHolder);
      setShowResult(true); // Setelah verifikasi, tampilkan hasil
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <HeaderApps />
      <div className="bg-gray-500 min-h-screen">
        <div className="items-center text-center p-12">
          <h1 className="text-white font-bold text-2xl py-12">Verify Ticket</h1>
          <input type="text" placeholder="Masukkan address" value={address} />
          <br />
          <button
            onClick={verifyNFTHolder}
            className="bg-blue-500 text-white w-24 h-12 m-12"
          >
            Scan Now
          </button>
          <br />
          {showResult && (
            <>
              {!isNFTHolder && (
                <h3 className="bg-green text-red-500 font-bold">
                  Pemegang NFT Tidak Valid!
                </h3>
              )}
              {isNFTHolder && (
                <h3 className="text-green-500 font-bold">
                  Pemegang NFT Valid!
                </h3>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyNFT;
