import React, { useEffect, useState } from "react";
import { BsDiscord, BsGlobe, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContractMetadata, useContract } from "@thirdweb-dev/react";
import { contractAddress, typeNFT } from "../../../const/mydetails";
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
        <img
          src={contractMetadata?.image}
          alt="Profil"
          className="border border-line bg-black w-[260px] h-[250px] mx-auto md:mx-0"
          onLoad={() => setShowSkeleton(false)} // Sembunyikan skeleton setelah gambar selesai dimuat
        />
      )}
      <div className="py-4">
        {loading ? (
          <Skeleton height={24} width={200} />
        ) : (
          <h3 className="font-bold text-gray-700 text-xl text-center md:text-left">
            {contractMetadata?.name}
          </h3>
        )}
        {loading ? (
          <Skeleton height={16} width={160} />
        ) : (
          <p className="text-gray-700 text-center md:text-left mt-2">
            Contoh NFTicketing
          </p>
        )}
        <div className="mt-2 flex justify-center md:justify-start">
          {showSkeleton ? (
            <>
              <Skeleton
                circle
                height={24}
                width={24}
                style={{ marginRight: "0.5rem" }}
              />
              <Skeleton
                circle
                height={24}
                width={24}
                style={{ marginRight: "0.5rem" }}
              />
              <Skeleton
                circle
                height={24}
                width={24}
                style={{ marginRight: "0.5rem" }}
              />
            </>
          ) : (
            <Link href="/" className="flex gap-4">
              <BsTwitter />
              <BsGlobe />
              <BsDiscord />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
