import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  paperWallet,
  walletConnect,
  trustWallet,
  coinbaseWallet,
} from "@thirdweb-dev/react";
import "../../styles/globals.css";
import { chainId } from "../../const/mydetails";
export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={chainId}
      supportedWallets={[
        metamaskWallet(),
        localWallet(),
        paperWallet({
          clientId: "3012e8ba-000b-44d4-9b24-52050f2c6086",
        }),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
      ]}
      clientId="e6389c507523eeafc24805e8a124b5c5"
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       relayerUrl:
      //         "https://api.defender.openzeppelin.com/autotasks/e5ff2d3d-be21-4b02-9a12-9ef98d530657/runs/webhook/1b285739-9faf-4bf0-aa15-9b3a7bd99e55/P2D2fduQcNtHKUv9138D6N",
      //     },
      //   },
      // }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
