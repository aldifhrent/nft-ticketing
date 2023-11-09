import Link from "next/link";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";

export const AppsMenuList = () => {
  return (
    <div>
      <ul className="hidden lg:flex gap-6 items-center">
        <Link
          className="text-gray-400 font-medium text-lg hover:text-gray-200"
          href="/buyticket"
        >
          Buy Ticket
        </Link>
        <Link
          className="text-gray-400 font-medium text-lg hover:text-gray-200"
          href="/mynft"
        >
          My Ticket
        </Link>
        <Link
          className="text-gray-400 font-medium text-lg hover:text-gray-200"
          href="/verify"
        >
          Verify Ticket
        </Link>
        <Link
          className="text-gray-400 font-medium text-lg hover:text-gray-200"
          href="/history"
        >
          Transactions History
        </Link>
        <ConnectWallet
          theme={"light"}
          btnTitle={"Connect Wallet"}
          modalTitle={"NFTicketing"}
          switchToActiveChain={true}
          modalSize={"wide"}
          hideTestnetFaucet={"true"}
        />
      </ul>
    </div>
  );
};
