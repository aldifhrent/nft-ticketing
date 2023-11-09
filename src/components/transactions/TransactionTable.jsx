import React from "react";
import Link from "next/link";
import web3 from "web3";
const TransactionTable = ({ data,}) => {

  return (
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              <table class="flex-rows md:flex-col min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-slate-800">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start whitespace-nowrap"
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        #
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start whitespace-nowrap "
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        TX HASH
                      </span>
                    </th>

                    <th
                      scope="col"
                      class="px-6 py-3 text-start whitespace-nowrap min-w-[16rem]"
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Address
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start whitespace-nowrap"
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Price
                      </span>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-start whitespace-nowrap min-w-[16rem]"
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Date
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.map((tx, index) => (
                    <tr>
                      <td class="h-px w-px whitespace-nowrap px-6 py-3">
                        <button type="button" class="flex items-center gap-x-2">
                          <svg
                            class="flex-shrink-0 w-4 h-4 text-gray-800 dark:text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span class="text-sm text-gray-800 dark:text-gray-200">
                            {index + 1}
                          </span>
                        </button>
                      </td>
                      <td class="h-px w-px whitespace-nowrap px-6 py-3">
                        <div class="flex items-center gap-x-3">
                          <span class="font-semibold text-sm text-gray-800 dark:text-white hover:text-gray-600">
                            <Link
                              href={`https://mumbai.polygonscan.com/tx/${tx.hash}`}
                            >
                              Tx Hash
                            </Link>
                          </span>
                        </div>
                      </td>
                      <td class="h-px w-px whitespace-nowrap px-6 py-3">
                        <div class="flex items-center gap-x-3">
                          <span class="font-semibold text-sm text-gray-800 dark:text-white">
                            {tx.from}
                          </span>
                        </div>
                      </td>
                      <td class="h-px w-px whitespace-nowrap px-6 py-3">
                        <span class="text-sm text-gray-800 dark:text-white">
                          {web3.utils.fromWei(tx.value, "ether")} MATIC
                        </span>
                      </td>

                      <td class="h-px w-px whitespace-nowrap px-6 py-3">
                        <span class="text-sm text-gray-800 dark:text-white">
                          {new Date(tx.timeStamp * 1000).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
