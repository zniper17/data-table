import { getPostPage } from "@/api/axisos";
import DataTable from "@/components/DataTable";
import React from "react";
async function Home({ searchParams }: any) {
  const headers = ["Timestamp", "Purchase Id", "Mail", "Name"];
  const totalData = 100;
  const perPageData = 10;
  const totalPages = totalData / perPageData;
  let currentPage = 1;
  if (Number(searchParams.page_num) >= 1) {
    currentPage = Number(searchParams.page_num);
  }

  const data = await getPostPage(searchParams.page_num);

  return (
    <React.Fragment>
      <DataTable
        sortable
        caption="Bookings"
        headers={headers}
        rows={data}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </React.Fragment>
  );
}

export default Home;
