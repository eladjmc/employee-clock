import React from "react";
import Table from "../../Table/Table";
import ActionButtons from "../../ActionButtons/ActionButtons";
import { Timesheet } from "../../../types/timesheet";
import { tableColumns } from "../../../utils/createColumnsTimesheet";

interface TimesheetTableProps {
  timesheets: Timesheet[];
  onApprove: (timesheet: Timesheet) => void;
  onReject: (timesheet: Timesheet) => void;
}

const TimesheetTable: React.FC<TimesheetTableProps> = ({
  timesheets,
  onApprove,
  onReject,
}) => {
  const columns = [
    ...tableColumns,
    {
      header: "Actions",
      accessor: (row: Timesheet) => (
        <ActionButtons
          status={row.status}
          onApprove={() => onApprove(row)}
          onReject={() => onReject(row)}
        />
      ),
    },
  ];

  return <Table columns={columns} data={timesheets} />;
};

export default TimesheetTable;
