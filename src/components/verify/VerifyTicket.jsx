import React, { useState } from "react";
import Web3 from "web3";
import { NFTAbi } from "../NftAbi.js";
import { useAddress } from "@thirdweb-dev/react";
import { contractAddress, tokenId} from "../../../const/mydetails.jsx"

const VerifyTicket = () => {
  const [isNFTHolder, setIsNFTHolder] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const contract = "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1"
  const nftId = "0";
  const address = useAddress();
  const verifyNFTHolder = async () => {
    try {
      // Inisialisasi Web3 dengan node Ethereum di Testnet Mumbai (Matic)
      const web3 = new Web3("https://rpc-mumbai.maticvigil.com"); // RPC
      // Buat instance kontrak NFT berdasarkan alamat kontrak
      const nftContract = new web3.eth.Contract(NFTAbi, contract);
      console.log(nftContract);
      // Panggil fungsi balanceOf di kontrak NFT untuk mendapatkan pemegang NFT dari NFT ID
      const nftHolder = await nftContract.methods
        .balanceOf(address, nftId) // Menggunakan address sebagai alamat NFT dan nftId sebagai token id dari NFT
        .call();

      // Jika nilai balik dari fungsi balanceOf bukan 0, berarti pemegang NFT valid
      const isHolder = parseInt(nftHolder) > 0;
      setIsNFTHolder(isHolder);
      setShowResult(true); // Setelah verifikasi, tampilkan hasil
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };
  return (
    <div className="bg-gray-500 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-white font-bold text-2xl py-12">Verify Ticket</h1>
        <input
          type="text"
          placeholder="Address"
          value={address}
          className=" text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <button
          onClick={verifyNFTHolder}
          className="bg-blue-500 text-white w-24 h-12 m-12 rounded-md"
        >
          Scan Now
        </button>
        {showResult && (
          <>
            {!isNFTHolder && (
              <h3 className="text-center p-auto bg-red-500 font-bold text-white p-4 flex">
                Non Verified Ticket Holders, buy ticket first
              </h3>
            )}
            {isNFTHolder && (
              <h3 className="text-center p-auto bg-green-500 font-bold text-white p-4 flex">
                Verified Ticket Holders
              </h3>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyTicket;