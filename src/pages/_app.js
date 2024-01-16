import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
  embeddedWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "../../styles/globals.css";
import { chainId } from "../../const/mydetails";
export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={chainId}
      supportedWallets={[
        metamaskWallet(),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: ["email", "google", "facebook"],
          },
        }),
      ]}
      clientId="cd9478f3c5c61398daf4ba3d2b97d5b9"
      secretKey="DAY2-X_h7n4VafURT2XtOE88pzTjiVXgFvqbLE8WUDXz_XbTlGIYAPrXONeyi1f-t2OUlgXuPMlJgGQx5BJi9g"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
