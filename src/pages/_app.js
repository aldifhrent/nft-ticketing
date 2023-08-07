import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  paperWallet,
  walletConnect,
  trustWallet,
  coinbaseWallet,
  rainbowWallet,
  zerionWallet,
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
        rainbowWallet(),
        zerionWallet(),
        paperWallet({
          clientId: "3012e8ba-000b-44d4-9b24-52050f2c6086",
        })
      ]}
      clientId="e6389c507523eeafc24805e8a124b5c5"
      key="e6389c507523eeafc24805e8a124b5c5"
    >
      <Component {...pageProps} />
      
    </ThirdwebProvider>
  );
}
