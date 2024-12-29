import { Timesheet } from "../types/timesheet"
import { formatDate } from "./formatDate"

  // Define columns
  export const tableColumns = [
    {
      header: "Name",
      accessor: (row: Timesheet) => `${row.employeeFirstName} ${row.employeeLastName}`,
    },
    {
      header: "Date",
      accessor: (row: Timesheet) => formatDate(row.startTime).split(',')[0], // MM/DD/YYYY
    },
    {
      header: "Start Time",
      accessor: (row: Timesheet) =>
        new Date(row.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      header: "End Time",
      accessor: (row: Timesheet) =>
        row.endTime
          ? new Date(row.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
    },
    {
      header: "Report",
      accessor: (row: Timesheet) => row.reportText || "No Report",
    },
    {
      header: "Status",
      accessor: (row: Timesheet) => row.status,
    },

  ];