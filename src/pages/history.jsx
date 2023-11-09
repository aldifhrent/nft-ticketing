import { useEffect, useState } from "react";
import web3 from "web3";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderApps } from "../components/apps/HeaderApps";
import Link from "next/link";
import TransactionTable from "../components/transactions/TransactionTable";
import { contractAddress } from "../../const/mydetails";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const address = useAddress(); // Menggunakan alamat wallet pengguna

  useEffect(() => {
    async function FetchTransactionHistory() {
      try {
        const MumbaiApiKey = "WV72499DICI162T4V9BF7Y1GMSICZHFQ11";
        const apiUrl = `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&apikey=${MumbaiApiKey}&tag=latest`;
        const response = await axios.get(apiUrl);
        console.log(response.data.result);
        if (response.data && response.data.result) {
          const filteredTransactions = response.data.result.filter((tx) => {
            // Memeriksa apakah input data transaksi mengandung metode "Claim"
            const input = tx.input.toLowerCase();
            const claimSignature = "0x57bc3d78";
            const contractAddress =
              "0x1f1155BAd0CB7B9da4Ab7dD29091b614BEC7b6D1";
            const isYourContractClaim =
              tx.to.toLowerCase() === contractAddress.toLowerCase() &&
              input.includes(claimSignature);
            return isYourContractClaim;
          });

          setTransactions(filteredTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    }

    FetchTransactionHistory();
  }, [address]); // Menambahkan [address] sebagai dependensi, sehingga useEffect akan berjalan ketika alamat berubah

  return (
    <div>
      <HeaderApps />
      <TransactionTable data={transactions} />
    </div>
  );
};

export default TransactionHistory;
