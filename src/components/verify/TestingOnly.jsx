import React, { useState } from "react";
import { useContract, useAddress, ConnectWallet } from "@thirdweb-dev/react";
const TestingOnly = () => {
  const contract = useContract("0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1");
  const address = useAddress();

  const verifyNFTHolder = async () => {
    try {
      const data = await contract.ERC1155.
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <ConnectWallet />
      <button onClick={() => verifyNFTHolder()}>Testing Now</button>
    </div>
  );
};

export default TestingOnly;
