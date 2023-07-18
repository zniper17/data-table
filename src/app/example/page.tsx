"use client";

import { getUsers } from "@/api/axisos";
import DataTable from "@/components/DataTable";
import { sortData } from "@/helpers";
import { IRowData } from "@/types";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React from "react";

const HEADERS = ["Id", "first_name", "email"];

interface IProps {
  searchParams: {
    page_num?: number;
  };
}

function Example({ searchParams }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [paginatedData, setPaginatedData] = React.useState<any>();
  const [sortKey, setSortKey] = React.useState<keyof IRowData | "">("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const currentPage = isNaN(Number(searchParams.page_num))
    ? 1
    : Number(searchParams.page_num);

  // Fetch data based on the current page number
  React.useEffect(() => {
    fetchData(currentPage);
  }, [searchParams.page_num]);

  // Fetch data from the API
  const fetchData = async (page: number) => {
    try {
      const response = await getUsers(page);
      setPaginatedData(response);
    } catch (error) {
      router.push("/404");
    }
  };

  // Handle pagination page changes
  const paginationHandler = (page: number) => {
    router.push(`${pathname}?page_num=${page}`);
  };

  // Sorting function
  const sortedData = React.useCallback(() => {
    return sortData(paginatedData?.data, sortKey, sortDirection === "desc");
  }, [sortDirection, sortKey, paginatedData]);

  // Handle sorting change
  function changeSort(key: keyof IRowData) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortKey(key);
  }

  // Show loading state if data is not available yet
  if (!paginatedData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }
  // Generate the array of page numbers for pagination
  const pageArray = Array(paginatedData.total_pages)
    .fill(1)
    .map((_, index) => index + 1);

  return (
    <DataTable
      sortable
      caption="Bookings"
      headers={HEADERS}
      rows={sortedData()}
      changeSort={changeSort}
      pagination
      currentPage={currentPage}
      paginationHandler={paginationHandler}
      pageArray={pageArray}
    />
  );
}

export default Example;
