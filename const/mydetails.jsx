export const contractAddress = "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1";
export const typeNFT="edition-drop";
export const tokenId = "0";
export const chainId = "mumbai";
export const truncateAddress = (address) => {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
};
