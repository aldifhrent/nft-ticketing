import React, { useState } from "react";
import Link from "next/link";
import web3 from "web3";
import ReactPaginate from "react-paginate";
const TransactionTable = ({ data }) => {
  const itemsPerPage = 10; // Ubah sesuai kebutuhan
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              <table className="flex-rows md:flex-col min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        #
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap "
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        TX HASH
                      </span>
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap min-w-[16rem]"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Address
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Price
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start whitespace-nowrap min-w-[16rem]"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Date
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedData.map((tx, index) => (
                    <tr key={{ index }}>
                      <td className="h-px w-px whitespace-nowrap px-6 py-3">
                        <button
                          type="button"
                          className="flex items-center gap-x-2"
                        >
                          <svg
                            className="flex-shrink-0 w-4 h-4 text-gray-800 dark:text-white"
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
                          <span className="text-sm text-gray-800 dark:text-gray-200">
                          {(currentPage * itemsPerPage) + index + 1}
                          </span>
                        </button>
                      </td>
                      <td className="h-px w-px whitespace-nowrap px-6 py-3">
                        <div className="flex items-center gap-x-3">
                          <span className="font-semibold text-sm text-gray-800 dark:text-white hover:text-gray-600">
                            <Link
                              href={`https://mumbai.polygonscan.com/tx/${tx.hash}`}
                            >
                              Tx Hash
                            </Link>
                          </span>
                        </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap px-6 py-3">
                        <div className="flex items-center gap-x-3">
                          <span className="font-semibold text-sm text-gray-800 dark:text-white">
                            {tx.from}
                          </span>
                        </div>
                      </td>
                      <td className="h-px w-px whitespace-nowrap px-6 py-3">
                        <span className="text-sm text-gray-800 dark:text-white">
                          {web3.utils.fromWei(tx.value, "ether")} MATIC
                        </span>
                      </td>

                      <td className="h-px w-px whitespace-nowrap px-6 py-3">
                        <span className="text-sm text-gray-800 dark:text-white">
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
              <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">
                    Page {currentPage + 1} of {pageCount}
                    </span>{" "}
                  </p>
                </div>

                <div>
                  <div class="inline-flex gap-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentPage === 0}
                      type="button"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        class="flex-shrink-0 w-4 h-4"
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
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      Prev
                    </button>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(
                            prev + 1,
                            Math.ceil(data.length / itemsPerPage) - 1
                          )
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(data.length / itemsPerPage) - 1
                      }
                      type="button"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Next
                      <svg
                        class="flex-shrink-0 w-4 h-4"
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
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center"></div>
    </div>
  );
};

export default TransactionTable;
