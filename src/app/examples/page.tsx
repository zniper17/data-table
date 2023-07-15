import DataTable from "@/components/DataTable";
import React from "react";
function Home() {
  const headers = [
    "Timestamp",
    "Purchase Id",
    "Mail",
    "Name",
    "Source",
    "Status",
    "Select",
  ];

  const rows = [
    {
      timestamp: "2023-07-15",
      purchaseId: "123",
      mail: "example@example.com",
      name: "John Doe",
      source: "Online",
      status: "Completed",
      select: "Yes",
    },
    {
      timestamp: "2023-07-14",
      purchaseId: "456",
      mail: "test@test.com",
      name: "Jane Smith",
      source: "In-store",
      status: "Pending",
      select: "No",
    },
    // Add more rows as needed
  ];

  return (
    <React.Fragment>
      <DataTable sortable caption="Bookings" headers={headers} rows={rows} />
    </React.Fragment>
  );
}

export default Home;
