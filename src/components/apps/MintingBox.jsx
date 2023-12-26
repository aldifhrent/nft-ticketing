import {
  useContract,
  useTotalCirculatingSupply,
  useActiveClaimConditionForWallet,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  Web3Button,
  useAddress,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BigNumber, utils } from "ethers";
import { useMemo, useState } from "react";
import { parseIneligibility } from "../utils/parseIneligibility";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { contractAddress, typeNFT, tokenId } from "../../../const/mydetails";
import nftImage from '../../assets/0.png';
export const MintingBox = () => {
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const { contract: editionDrop } = useContract(contractAddress, typeNFT);
  const { data: contractMetadata } = useContractMetadata(editionDrop);
  const claimConditions = useClaimConditions(editionDrop);
  const activeClaimCondition = useActiveClaimConditionForWallet(
    editionDrop,
    address,
    tokenId
  );
  const claimerProofs = useClaimerProofs(editionDrop, address || "", tokenId);
  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    editionDrop,
    {
      quantity,
      walletAddress: address || "",
    },
    tokenId
  );

  const claimedSupply = useTotalCirculatingSupply(editionDrop, tokenId);

  const totalAvailableSupply = useMemo(() => {
    try {
      return BigNumber.from(activeClaimCondition.data?.availableSupply || 0);
    } catch {
      return BigNumber.from(1_000_000);
    }
  }, [activeClaimCondition.data?.availableSupply]);

  const numberClaimed = useMemo(() => {
    return BigNumber.from(claimedSupply.data || 0).toString();
  }, [claimedSupply]);

  const numberTotal = useMemo(() => {
    const n = totalAvailableSupply.add(BigNumber.from(claimedSupply.data || 0));
    if (n.gte(1_000_000)) {
      return "";
    }
    return n.toString();
  }, [totalAvailableSupply, claimedSupply]);

  const priceToMint = useMemo(() => {
    const bnPrice = BigNumber.from(
      activeClaimCondition.data?.currencyMetadata.value || 0
    );
    return `${utils.formatUnits(
      bnPrice.mul(quantity).toString(),
      activeClaimCondition.data?.currencyMetadata.decimals || 18
    )} ${activeClaimCondition.data?.currencyMetadata.symbol}`;
  }, [
    activeClaimCondition.data?.currencyMetadata.decimals,
    activeClaimCondition.data?.currencyMetadata.symbol,
    activeClaimCondition.data?.currencyMetadata.value,
    quantity,
  ]);

  const maxClaimable = useMemo(() => {
    let bnMaxClaimable;
    try {
      bnMaxClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimableSupply || 0
      );
    } catch (e) {
      bnMaxClaimable = BigNumber.from(1_000_000);
    }

    let perTransactionClaimable;
    try {
      perTransactionClaimable = BigNumber.from(
        activeClaimCondition.data?.maxClaimablePerWallet || 0
      );
    } catch (e) {
      perTransactionClaimable = BigNumber.from(1_000_000);
    }

    if (perTransactionClaimable.lte(bnMaxClaimable)) {
      bnMaxClaimable = perTransactionClaimable;
    }

    const snapshotClaimable = claimerProofs.data?.maxClaimable;

    if (snapshotClaimable) {
      if (snapshotClaimable === "0") {
        // allowed unlimited for the snapshot
        bnMaxClaimable = BigNumber.from(1_000_000);
      } else {
        try {
          bnMaxClaimable = BigNumber.from(snapshotClaimable);
        } catch (e) {
          // fall back to default case
        }
      }
    }

    let max;
    if (totalAvailableSupply.lt(bnMaxClaimable)) {
      max = totalAvailableSupply;
    } else {
      max = bnMaxClaimable;
    }

    if (max.gte(1_000_000)) {
      return 1_000_000;
    }
    return max.toNumber();
  }, [
    claimerProofs.data?.maxClaimable,
    totalAvailableSupply,
    activeClaimCondition.data?.maxClaimableSupply,
    activeClaimCondition.data?.maxClaimablePerWallet,
  ]);

  const isSoldOut = useMemo(() => {
    try {
      return (
        (activeClaimCondition.isSuccess &&
          BigNumber.from(activeClaimCondition.data?.availableSupply || 0).lte(
            0
          )) ||
        numberClaimed === numberTotal
      );
    } catch (e) {
      return false;
    }
  }, [
    activeClaimCondition.data?.availableSupply,
    activeClaimCondition.isSuccess,
    numberClaimed,
    numberTotal,
  ]);

  const canClaim = useMemo(() => {
    return (
      activeClaimCondition.isSuccess &&
      claimIneligibilityReasons.isSuccess &&
      claimIneligibilityReasons.data?.length === 0 &&
      !isSoldOut
    );
  }, [
    activeClaimCondition.isSuccess,
    claimIneligibilityReasons.data?.length,
    claimIneligibilityReasons.isSuccess,
    isSoldOut,
  ]);

  const isLoading = useMemo(() => {
    return (
      activeClaimCondition.isLoading || claimedSupply.isLoading || !editionDrop
    );
  }, [activeClaimCondition.isLoading, editionDrop, claimedSupply.isLoading]);

  const buttonLoading = useMemo(
    () => isLoading || claimIneligibilityReasons.isLoading,
    [claimIneligibilityReasons.isLoading, isLoading]
  );
  const buttonText = useMemo(() => {
    if (isSoldOut) {
      return "Sold Out";
    }

    if (canClaim) {
      const pricePerToken = BigNumber.from(
        activeClaimCondition.data?.currencyMetadata.value || 0
      );
      if (pricePerToken.eq(0)) {
        return "Mint (Free)";
      }
      return `Mint (${priceToMint})`;
    }
    if (claimIneligibilityReasons.data?.length) {
      return parseIneligibility(claimIneligibilityReasons.data, quantity);
    }
    if (buttonLoading) {
      return "Checking eligibility...";
    }

    return "Claiming not available";
  }, [
    isSoldOut,
    canClaim,
    claimIneligibilityReasons.data,
    buttonLoading,
    activeClaimCondition.data?.currencyMetadata.value,
    priceToMint,
    quantity,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000); // Setelah 2 detik, hide skeleton
  }, []);

  return (
    <div className="w-[250px]">
      {showSkeleton ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <div className="h-40 w-40 relativek">
            <Skeleton circle height={170} width={170} />
          </div>
          <div className="text-white mt-4">
            <Skeleton height={20} width={150} />
          </div>
          <div className="mt-2">
            <Skeleton height={15} width={100} />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Skeleton circle height={40} width={40} />
            <Skeleton height={30} width={30} className="mx-2" />
            <Skeleton circle height={40} width={40} />
          </div>
          <div className="mt-6 w-full flex justify-center">
            <Skeleton height={40} width={180} />
          </div>
        </div>
      ) : (
        <div className="bg-black border border-outline">
          <Image
            src={nftImage}
            width={200}
            height={200}
            alt="NFTicketing"
            className="mx-auto mt-4"
          />
          <p className="text-center text-white mt-2">
            {contractMetadata?.name}
          </p>
          <div className="text-center bg-black text-white">
            {claimedSupply ? (
              <div className="py-4">
                <p>Minted</p>
                <p>
                  <b>{numberClaimed}</b> / {numberTotal || "∞"}
                </p>
              </div>
            ) : (
              <h2>....</h2>
            )}
            {claimConditions.data?.length === 0 ||
            claimConditions.data?.every(
              (cc) => cc.maxClaimableSupply === "0"
            ) ? (
              <div>
                <h2>
                  This drop is not ready to be minted yet. (No claim condition
                  set)
                </h2>
              </div>
            ) : (
              <>
                <div className="flex flex-row items-center justify-center ml-4">
                  <button
                    className="cursor-pointer w-10 h-10 text-3xl bg-transparent text-white"
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    className="text-white bg-none w-12 text-center rounded-sm bg-transparent focus:border-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <button
                    className="cursor-pointer w-10 h-10 text-3xl bg-transparent ml-4"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= maxClaimable}
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-row items-center justify-center mt-6">
                  {isSoldOut ? (
                    <div className="mb-6 w-48">
                      <Web3Button theme="light" isDisabled={!canClaim} className="text-white">
                        {buttonLoading ? "Loading..." : buttonText}
                      </Web3Button>
                    </div>
                  ) : (
                    <div className="mb-6 w-48">
                      <Web3Button
                        contractAddress={editionDrop?.getAddress() || ""}
                        action={async (cntr) => {
                          setLoading(true);
                          const loadingToast = toast.loading("Process Minting");
                          try {
                             const tx = await cntr.erc1155.claim(tokenId, quantity);
                             const receipt = tx.receipt.transactionHash;
                             toast.success(
                              <>
                                Minting Success!<br/>
                                <a
                                  href={`https://mumbai.polygonscan.com/tx/${receipt}`}
                                  target="_blank"
                                  className="text-bold text-black"
                                >
                                  Transaction Link
                                </a>
                              </>
                            );
                          } catch (error) {
                            toast.error("Process Minting Error");
                          } finally {
                            setLoading(false);
                            toast.dismiss(loadingToast);
                          }
                        }}
                      >
                        {loading ? "Loading..." : buttonText}
                      </Web3Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};
