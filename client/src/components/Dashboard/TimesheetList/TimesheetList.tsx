import React from "react";
import "./TimesheetList.css";
import Spinner from "../../Spinner/Spinner";
import PaginationControls from "../../PaginationControls/PaginationControls";
import TimesheetTable from "./TimesheetTable";
import ConfirmationModal from "./ConfirmationModal";
import { useTimesheets } from "../../../hooks/useTimsheets";

const TimesheetList: React.FC = () => {
  const {
    timesheets,
    loading,
    currentPage,
    totalCount,
    pageSize,
    setCurrentPage,
    modalOpen,
    modalMessage,
    confirmAction,
    cancelAction,
    handleApprove,
    handleReject,
  } = useTimesheets();

  return (
    <section className="TimesheetList">
      <h3>Timesheet List</h3>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TimesheetTable
            timesheets={timesheets}
            onApprove={handleApprove}
            onReject={handleReject}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / pageSize)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        message={modalMessage}
        onConfirm={confirmAction}
        onCancel={cancelAction}
      />
    </section>
  );
};

export default TimesheetList;
