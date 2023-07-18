"use client";
import { IRowData } from "@/types";
import React from "react";
import Button from "./Button";

interface DataTableProps {
  sortable?: boolean;
  headers: string[];
  caption?: string;
  rows: IRowData[];
  pagination?: boolean;
  paginationHandler: (page: number) => void;
  currentPage: number;
  changeSort(key: keyof IRowData): void;
  pageArray: number[];
}

function DataTable(props: DataTableProps) {
  return (
    <React.Fragment>
      {!!props.caption && <h1 className="text-3xl my-5">{props.caption}</h1>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {props.headers.map((header: any, index) => (
                <th key={index} className="px-6 py-3">
                  <div className="flex items-center">
                    <span>{header}</span>
                    {props.sortable && (
                      <button
                        onClick={() => props.changeSort(header)}
                        className="ml-1.5 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 transition-transform duration-150 transform"
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
            {props.rows.map((row) => (
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
                  <Button
                    onClick={() => {
                      props.paginationHandler(props.currentPage - 1);
                    }}
                  >
                    Previous
                  </Button>
                </li>
              )}
              {props.pageArray.map((page) => (
                <Button
                  key={page}
                  onClick={() => props.paginationHandler(page)}
                  className={`${
                    page === props.currentPage
                      ? "!text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {page}
                </Button>
              ))}
              {props.currentPage !== props.pageArray.pop() && (
                <li>
                  <Button
                    onClick={() => {
                      props.paginationHandler(props.currentPage + 1);
                    }}
                  >
                    Next
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </React.Fragment>
  );
}

export default DataTable;
