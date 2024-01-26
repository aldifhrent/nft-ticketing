import { useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { HeaderApps } from "../components/apps/HeaderApps";
import TransactionTable from "../components/transactions/TransactionTable";
import Head from "next/head";
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const address = useAddress(); // Menggunakan alamat wallet pengguna
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    async function FetchTransactionHistory() {
      try {
        if (!address) {
          // Checking address connect or not , if not setTransaction to [];
          setTransactions([]);
          setIsConnected(false);
          return;
        } else {
          setIsConnected(true);
        }

        const MumbaiApiKey = "WV72499DICI162T4V9BF7Y1GMSICZHFQ11";
        const apiUrl = `https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&apikey=${MumbaiApiKey}&tag=latest`;
        const response = await axios.get(apiUrl);
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
    <>
      <Head>
        <title>Transaction History</title>
        <meta
          name="description"
          content="NFTicketing Experiment Using ThirdWeb"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-500 h-screen">
        <HeaderApps />
        {isConnected ? (
          <TransactionTable data={transactions} />
        ) : (
          <div className="items-center text-center justify-center h-screen mx-auto py-12">
            <p>Please Connect to your wallet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionHistory;
