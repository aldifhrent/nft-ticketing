import React, { useEffect, useState } from "react";
import { BsDiscord, BsGlobe, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContractMetadata, useContract } from "@thirdweb-dev/react";
import { contractAddress, typeNFT } from "../../../const/mydetails";
import Image from "next/image";
export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { contract: editionDrop } = useContract(contractAddress, typeNFT);
  const { data: contractMetadata } = useContractMetadata(editionDrop);
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="max-w-[360px]">
      {loading ? (
        <div className="bg-gray-100 object-cover w-[260px] h-[250px] mx-auto md:mx-0">
          <Skeleton height={250} width={260} />
        </div>
      ) : (
        <div className="bg-black border border-line  mx-auto md:mx-0 w-[240px] h-[240px]">
          <Image
            src={contractMetadata?.image}
            alt="Profil"
            width={230}
            height={230}
            className="mt-4 mx-auto"
            onLoad={() => setShowSkeleton(false)} // Sembunyikan skeleton setelah gambar selesai dimuat
          />
        </div>
      )}
      <div className="py-4">
        {loading ? (
          <Skeleton height={24} width={200} />
        ) : (
          <h3 className="font-bold text-black text-xl text-center md:text-left">
            {contractMetadata?.name}
          </h3>
        )}
        {loading ? (
          <Skeleton height={16} width={160} />
        ) : (
          <p className="text-black text-center md:text-left mt-2">
            Experiment Implementation Ticket using NFT
          </p>
        )}
        <div className="mt-2 flex justify-center md:justify-start">
          {showSkeleton ? (
            <>
              <Skeleton circle height={24} width={24} className="mr-[0.5rem]" />
              <Skeleton circle height={24} width={24} className="mr-[0.5rem]" />
              <Skeleton circle height={24} width={24} className="mr-[0.5rem]" />
            </>
          ) : (
            <div className="flex gap-x-4">
              <Link href="/">
                <BsTwitter />
              </Link>
              <Link href="/">
                <BsGlobe />
              </Link>
              <Link href="/">
                <BsDiscord />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
