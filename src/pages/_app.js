import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  paperWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "../../styles/globals.css";
import { chainId } from "../../const/mydetails";
export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={chainId}
      supportedWallets={[
        metamaskWallet({ recommended: true}),
        walletConnect(),
        paperWallet({
          paperClientId: "3012e8ba-000b-44d4-9b24-52050f2c6086",
        }),
        localWallet(),
      ]}
      clientId="c40363e937d5ddb52923ed7313ed45c8"
      secretKey="nYZC6vLOmpp98OTMCfhDAtievoYjgDnucaKJbLzV8TtXfU_4i8QjutqXmS2KrFlTkDfeKYAQguM46peKwIjusA"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
