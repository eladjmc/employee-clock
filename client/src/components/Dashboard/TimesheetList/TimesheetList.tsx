/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
import {
  getManagerReports,
  approveRejectTimesheet,
} from "../../../services/timesheetService";
import { Timesheet } from "../../../types/timesheet";
import Table from "../../Table/Table";
import ActionButtons from "../../ActionButtons/ActionButtons";
import Modal from "../../Modal/Modal";
import { transformToTimesheet } from "../../../utils/transformTimeSheet";
import { TimesheetStatus } from "../../../types/timesheet";
import Button from "../../Button/Button";
import "./TimesheetList.css";
import PaginationControls from "../../PaginationControls/PaginationControls";
import Spinner from "../../Spinner/Spinner";
import { tableColumns } from "../../../utils/createColumnsTimesheet";

const TimesheetList: React.FC = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // Fixed page size as per requirements
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null
  );
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  // Fetch timesheets based on current page
  const fetchTimesheets = async (page: number) => {
    setLoading(true);
    try {
      const response = await getManagerReports(page, pageSize);
      const transformedTimesheets = response.items.map(transformToTimesheet);
      setTimesheets(transformedTimesheets);
      setTotalCount(response.totalCount);
      setLoading(false);
    } catch (error: unknown) {
      console.error("Failed to fetch timesheets:", error);
      setLoading(false);
      setModalMessage("Failed to fetch timesheets.");
      setModalOpen(true);
    }
  };

  useEffect(() => {
    fetchTimesheets(currentPage);
  }, [currentPage]);

  const handleApprove = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet);
    setActionType("approve");
    setModalMessage("Are you sure you want to approve this timesheet?");
    setModalOpen(true);
  };

  const handleReject = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet);
    setActionType("reject");
    setModalMessage("Are you sure you want to reject this timesheet?");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedTimesheet) return;
    setLoading(true);
    try {
      await approveRejectTimesheet(selectedTimesheet.id, {
        status:
          actionType === "approve"
            ? TimesheetStatus.APPROVED
            : TimesheetStatus.REJECTED,
      });
      setModalOpen(false);
      setSelectedTimesheet(null);
      setModalMessage(`Successfully ${actionType}d the timesheet.`);
      fetchTimesheets(currentPage);
    } catch (error: unknown) {
      console.error(`Failed to ${actionType} timesheet:`, error);
      let errorMsg = `Failed to ${actionType} timesheet.`;
      setModalMessage(errorMsg);
      setModalOpen(true);
      setLoading(false);
    }
  };

  const columns = [
    ...tableColumns,
    {
      header: "Actions",
      accessor: (row: Timesheet) => (
        <ActionButtons
          status={row.status}
          onApprove={() => handleApprove(row)}
          onReject={() => handleReject(row)}
        />
      ),
    },
  ];

  return (
    <section className="TimesheetList">
      <h3>Timesheet List</h3>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table columns={columns} data={timesheets} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / pageSize)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      {/* Confirmation Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
        <div className="modal-buttons">
          <Button label="Yes" onClick={confirmAction} />
          <Button
            label="No"
            onClick={() => setModalOpen(false)}
            variant="secondary"
          />
        </div>
      </Modal>
    </section>
  );
};

export default TimesheetList;
