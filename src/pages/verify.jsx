"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { NFTAbi } from '../components/NftAbi.js';
import { HeaderApps } from "../components/apps/HeaderApps.jsx";
import QRCode from "qrcode.react";

const verifyNFT = () => {
  const [isNFTHolder, setIsNFTHolder] = useState(false);
  const [showBarcode, setShowBarcode] = useState(true);
  const address = "0x854dB5c41419A42967DE4eC6A47C011b28B227eB";
  console.log(address);
  const contract = "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1";
  const nftId = 0;

  useEffect(() => {
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
          .balanceOf(address, nftId)
          .call();

        // Jika nilai balik dari fungsi balanceOf bukan 0, berarti pemegang NFT valid
        const isHolder = parseInt(nftHolder) > 0;
        setIsNFTHolder(isHolder);
        setShowBarcode(false); // Setelah verifikasi, sembunyikan barcode
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!showBarcode) {
      verifyNFTHolder();
    }
  }, [showBarcode, address]);

  return (
    <div>
        <HeaderApps/>
      {showBarcode ? (
        <div>
          <QRCode value={contract} />
          {/* Tampilkan barcode dengan nilai contract (alamat NFT) */}
        </div>
      ) : (
        <div>
          <ConnectWallet />
          {isNFTHolder ? (
            <h3>Pemegang NFT Valid!</h3>
          ) : (
            <h3>Pemegang NFT Tidak Valid!</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default verifyNFT;
