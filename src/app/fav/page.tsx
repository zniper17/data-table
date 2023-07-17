"use client";

import { getUsers } from "@/api/axisos";
import DataTable from "@/components/DataTable";
import { sortData } from "@/helpers";
import { IRowData } from "@/types";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import React from "react";

const headers = ["Id", "first_name", "email"];

interface IProps {
  searchParams: {
    page_num?: number;
  };
}

function Home({ searchParams }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [pagination, setPagination] = React.useState({
    currentPage: 0,
    totalPages: 0,
  });

  const [paginatedData, setPaginatedData] = React.useState<any>();
  const [sortKey, setSortKey] = React.useState<keyof IRowData | "">("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const currentPage = isNaN(Number(searchParams.page_num))
    ? 1
    : Number(searchParams.page_num);

  React.useEffect(() => {
    fetchData(currentPage);
  }, [searchParams.page_num]);

  const fetchData = async (page: number) => {
    try {
      const response = await getUsers(page);
      setPaginatedData(response);
    } catch (error) {
      router.push("/404");
    }
  };

  const paginationHandler = (page: number) => {
    router.push(`${pathname}?page_num=${page}`);
  };

  const sortedData = React.useCallback(() => {
    return sortData(paginatedData?.data, sortKey, sortDirection === "desc");
  }, [sortDirection, sortKey, paginatedData]);

  function changeSort(key: keyof IRowData) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setSortKey(key);
  }

  if (!paginatedData) {
    return <div>Loading</div>;
  }

  const pageArray = Array(paginatedData.total_pages)
    .fill(1)
    .map((_, index) => index + 1);

  return (
    <DataTable
      sortable
      caption="Bookings"
      headers={headers}
      rows={sortedData()}
      changeSort={changeSort}
      pagination
      currentPage={currentPage}
      paginationHandler={paginationHandler}
      pageArray={pageArray}
    />
  );
}

export default Home;
