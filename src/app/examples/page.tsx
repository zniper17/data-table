import React from "react";
import { getUsers } from "@/api/axisos";
import DataTable from "@/components/DataTable";
import { redirect } from "next/navigation";

interface IProps {
  searchParams: {
    page_num?: number;
  };
}

async function Home({ searchParams }: IProps) {
  const headers = ["Id", "title", "body"];
  const currentPage = isNaN(Number(searchParams.page_num))
    ? 1
    : Number(searchParams.page_num);
  try {
    const response = await getUsers(currentPage);
    const users = response.data;

    if (!response) {
      return <div>Loading...</div>;
    }

    if (users.length === 0) {
      return <div>No users found.</div>;
    }

    const pageArray = Array(response.total_pages)
      .fill(1)
      .map((_, index) => index + 1);

    return (
      <>
        <DataTable
          sortable
          caption="Bookings"
          headers={headers}
          rows={users}
          pagination
          pageArray={pageArray}
          currentPage={currentPage}
        />
      </>
    );
  } catch (error) {
    return redirect("./404");
  }
}

export default Home;
