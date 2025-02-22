import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
import NFTCard from "./NFTCard";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { contractAddress } from "../../../const/mydetails";
const Gallery = ({ nft }) => {
  const address = useAddress();
  const { contract: editionDrop } = useContract(
    contractAddress,
    "edition-drop"
  );
  const { data: nfts, isLoading: nftsLoading } = useOwnedNFTs(
    editionDrop,
    address
  );
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    Aos.init();

    if (!address) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [address]);

  useEffect(() => {}, [address]);
  return (
    <div className="bg-gray-500 min-h-screen py-12">
      <div>
        {isConnected ? (
          <>
            <h1 className="text-center font-bold text-2xl text-white mt-12 my-12 ">
              My Ticket
            </h1>
            {nftsLoading && (
              <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
                {Array.from({ length: nft }).map((_, i) => (
                  <div
                    className="!h-60 !w-60 animate-pulse rounded-lg bg-gray-800"
                    key={i}
                  />
                ))}
              </div>
            )}
            {nfts && nfts?.length > 0 && (
              <div
                className="flex flex-wrap items-center justify-center gap-8"
                data-aos="fade-up"
              >
                {nfts.map((nft) => (
                  <NFTCard nft={nft} key={nft.metadata.id} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="items-center text-center justify-center h-screen mx-auto">
            <p>Please Connect to your wallet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
