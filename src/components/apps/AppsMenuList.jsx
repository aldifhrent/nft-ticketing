import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";

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
        <ConnectWallet
          theme={"dark"}
          btnTitle={"Connect Wallet"}
          modalTitle={"NFTicketing"}
          switchToActiveChain={true}
          modalSize={"wide"}
        />
      </ul>
    </div>
  );
};
