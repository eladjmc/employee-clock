import React, { useEffect, useState } from "react";
import { getManagerReports } from "../../../services/timesheetService";
import { TimesheetResponseItem } from "../../../dto/timesheet.dto";
import { TimesheetStatus } from "../../../types/timesheet";
import Table from "../../Table/Table";
import Button from "../../Button/Button";
import { MRT_ColumnDef, MRT_PaginationState } from "material-react-table";

const TimesheetList: React.FC = () => {
  const [timesheets, setTimesheets] = useState<TimesheetResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchReports = async (currentPage: number, currentPageSize: number) => {
    setLoading(true);
    try {
      const response = await getManagerReports(currentPage, currentPageSize);
      setTimesheets(response.items);
      setTotalCount(response.totalCount); // Update total count from the server
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination]);

  // Define columns with custom formatting
  const columns: MRT_ColumnDef<TimesheetResponseItem, unknown>[] = [
    {
      accessorKey: "employee.firstName",
      header: "Name",
      Cell: ({ row }) =>
        `${row.original.employee.firstName} ${row.original.employee.lastName}`,
    },
    {
      accessorKey: "startTime",
      header: "Date",
      Cell: ({ row }) =>
        new Date(row.original.startTime).toLocaleDateString(), // Format as MM/DD/YYYY
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      Cell: ({ row }) =>
        new Date(row.original.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }), // Format as HH:MM
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      Cell: ({ row }) =>
        row.original.endTime
          ? new Date(row.original.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A", // Format or show N/A if null
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          {row.original.status === TimesheetStatus.PENDING && (
            <>
              <Button label="Approve" onClick={() => console.log("Approve")} />
              <Button
                label="Reject"
                onClick={() => console.log("Reject")}
                variant="secondary"
              />
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <section>
      <Table
        columns={columns}
        data={timesheets}
        rowCount={totalCount}
        onPaginationChange={(updaterOrValue) => {
          if (typeof updaterOrValue === "function") {
            setPagination((prev) => updaterOrValue(prev));
          } else {
            setPagination(updaterOrValue);
          }
        }}
        isLoading={loading}
      />
    </section>
  );
};

export default TimesheetList;
