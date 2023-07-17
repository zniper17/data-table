import { IRowData } from "@/types";

export function sortData(
  tableData: IRowData[],
  sortKey: keyof IRowData | "",
  reverse: boolean
) {
  if (!sortKey) return tableData;

  const sortedData = tableData.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}
