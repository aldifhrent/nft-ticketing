  import React, { useState, useEffect } from "react";
  import Web3 from "web3";
  import { NFTAbi } from "../NftAbi.js";
  import { useAddress } from "@thirdweb-dev/react";
  import { contractAddress, tokenId } from "../../../const/mydetails.jsx";

  const VerifyTicket = () => {
    const [isNFTHolder, setIsNFTHolder] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const contract = "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1";
    const nftId = "0";
    const address = useAddress();
    const [isConnected, setIsConnected] = useState(false);

    const verifyNFTHolder = async () => {
      try {
        const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
        const nftContract = new web3.eth.Contract(NFTAbi, contract);
        const nftHolder = await nftContract.methods
          .balanceOf(address, nftId)
          .call();

        const isHolder = parseInt(nftHolder) > 0;
        setIsNFTHolder(isHolder);
        setShowResult(true);
      } catch (error) {
        console.error("Error:", error);
        alert(error);
      }
    };

    useEffect(() => {
      if (!address) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    }, [address]);

    return (
      <div className="bg-gray-500 min-h-screen">
        <div className="flex flex-col items-center">
          {isConnected ? (
            <>
              <h1 className="text-white font-bold text-2xl py-12">Verify Ticket</h1>
              <input
                type="text"
                placeholder="Address"
                value={address}
                className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <br />
              <button
                onClick={verifyNFTHolder}
                className="bg-blue-500 text-white w-24 h-12 m-12 rounded-md"
              >
                Scan Now
              </button>
            </>
          ) : (
            <div className="items-center text-center justify-center h-screen mx-auto">
              <p>Please Connect to your wallet</p>
            </div>
          )}
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
