"use client";

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
  pageArray: number[];
}

function DataTable(props: IProps) {
  const [sortKey, setSortKey] = React.useState<keyof IRowData | "">("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const handleSort = (key: keyof IRowData) => {
    if (props.sortable) {
      if (key === sortKey) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    }
  };

  const sortedRows = React.useMemo(() => {
    if (!sortKey) return props.rows;

    const sorted = [...props.rows].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [props.rows, sortKey, sortDirection]);

  return (
    <React.Fragment>
      {!!props.caption && <span>{props.caption}</span>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.headers.map((header: any) => (
                <th key={header} className="px-6 py-3">
                  <div className="flex items-center">
                    <span>{header}</span>
                    {props.sortable && (
                      <button
                        onClick={() => handleSort(header)}
                        className="ml-1.5 focus:outline-none"
                      >
                        <svg
                          className={`w-3 h-3 transition-transform duration-150 transform ${
                            sortKey === header
                              ? sortDirection === "asc"
                                ? "rotate-180"
                                : ""
                              : "rotate-0"
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{row.id}</td>
                <td className="px-6 py-4">
                  {row.first_name} {row.last_name}
                </td>
                <td className="px-6 py-4">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {props.pagination && (
          <nav
            className="flex items-center justify-end pt-4"
            aria-label="Table navigation"
          >
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
              {props.pageArray.map((page) => (
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
        )}
      </div>
    </React.Fragment>
  );
}

export default DataTable;
