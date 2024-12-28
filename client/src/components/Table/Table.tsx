import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
} from "material-react-table";

interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: MRT_ColumnDef<T, unknown>[];
  rowCount?: number; // Total row count for server-side pagination
  onPaginationChange?: (updaterOrValue: MRT_PaginationState | ((old: MRT_PaginationState) => MRT_PaginationState)) => void; // Pagination change handler
  isLoading?: boolean; // Loading state
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowCount,
  onPaginationChange,
  isLoading = false,
}: TableProps<T>) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={isLoading ? [] : data} // Pass an empty array if loading
      manualPagination
      rowCount={rowCount} // Total rows from server
      onPaginationChange={(updaterOrValue) => {
        if (onPaginationChange) {
          if (typeof updaterOrValue === "function") {
            onPaginationChange((prev) => updaterOrValue(prev));
          } else {
            onPaginationChange(updaterOrValue);
          }
        }
      }}
      enableRowSelection={true}
      enableColumnOrdering={true}
      enableGlobalFilter={false}
      enableColumnFilters={false}
      enableSorting={false}
      muiTableProps={{
        sx: {
          "& .MuiTableCell-root": {
            padding: "8px",
          },
          "& .MuiTableHead-root": {
            backgroundColor: "#f5f5f5",
          },
        },
      }}
    />
  );
};

export default Table;
