import { IRowData } from "@/types";
import Link from "next/link";
import React from "react";

interface IProps {
  sortable?: boolean;
  headers: string[];
  caption?: string;
  rows: IRowData[];
  pagination?: boolean;
  currentPage: number;
  totalPages: number;
}

function DataTable(props: IProps) {
  let pageNumbers = [];

  for (let i = props.currentPage - 3; i <= props.currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > props.totalPages) break;
    pageNumbers.push(i);
  }

  return (
    <React.Fragment>
      {!!props.caption && <span>{props.caption}</span>}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.headers.map((header) => (
                <th key={header} className="px-6 py-3">
                  <div className="flex items-center">
                    <span>{header}</span>
                    <a href="#">
                      <svg
                        className="w-3 h-3 ml-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => (
              <tr
                key={row.name}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-400 mx-2">1-10</span>
            of
            <span className="font-semibold text-gray-400 mx-2">1000</span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            {props.currentPage - 1 >= 1 && (
              <li>
                <Link href={`/examples?page_num=${props.currentPage - 1}`}>
                  <span className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </span>
                </Link>
              </li>
            )}
            {pageNumbers.map((page) => (
              <Link key={page} href={`/examples?page_num=${page}`}>
                <span
                  className={`flex items-center justify-center px-3 h-8 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page === props.currentPage
                      ? "!text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {page}
                </span>
              </Link>
            ))}
            <li>
              <Link href={`/examples?page_num=${props.currentPage + 1}`}>
                <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default DataTable;
