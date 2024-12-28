import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getManagerReports,
  approveRejectTimesheet,
} from "../../services/timesheetService";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import "./ManagerDashboard.css";
import { Timesheet, TimesheetStatus } from "../../types/timesheet";
import { transformToTimesheets } from "../../utils/transformTimeSheet";
import axios from "axios";
import { TimesheetResponseItem } from "../../dto/timesheet.dto";
import "./ManagerDashboard.css"

const ManagerDashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [timesheets, setTimesheets] = useState<TimesheetResponseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const fetchReports = async (page: number) => {
    setLoading(true);
    try {
      const response = await getManagerReports(page, 10);
      setTimesheets(response.items);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response?.data?.message);
      } else {
        setError("Failed to fetch reports");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  const openModal = (
    timesheet: TimesheetResponseItem,
    type: "approve" | "reject"
  ) => {
    const ts = transformToTimesheets(timesheet);
    setSelectedTimesheet(ts);
    setActionType(type);
    setModalOpen(true);
    setError("");
    setSuccessMessage("");
  };

  const handleAction = async () => {
    if (!selectedTimesheet) return;

    try {
      await approveRejectTimesheet(selectedTimesheet.id, {
        status:
          actionType === "approve"
            ? TimesheetStatus.APPROVED
            : TimesheetStatus.REJECTED,
      });
      setSuccessMessage(
        `Successfully ${
          actionType === "approve" ? "approved" : "rejected"
        } the timesheet.`
      );
      setModalOpen(false);
      fetchReports(currentPage);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response?.data?.message);
      } else {
        setError(`Failed to ${actionType} the timesheet`);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="ManagerDashboard">
      <header>
        <h1>Manager Dashboard</h1>
        <Button label="Logout" onClick={logout} variant="secondary" />
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : timesheets.length === 0 ? (
          <p>No timesheets to display.</p>
        ) : (
          <table className="TimesheetTable">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Report</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((ts) => (
                <tr key={ts._id}>
                  <td>{`${ts.employee.firstName} ${ts.employee.lastName}`}</td>
                  <td>{new Date(ts.startTime).toLocaleString()}</td>
                  <td>
                    {ts.endTime ? new Date(ts.endTime).toLocaleString() : "N/A"}
                  </td>
                  <td>{ts.reportText || "No Report"}</td>
                  <td>{ts.status}</td>
                  <td>
                    {ts.status === TimesheetStatus.PENDING && (
                      <>
                        <Button
                          label="Approve"
                          onClick={() => openModal(ts, "approve")}
                        />
                        <Button
                          label="Reject"
                          onClick={() => openModal(ts, "reject")}
                          variant="secondary"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <Button
              label="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              label="Next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </div>
        )}
      </main>

      {/* Action Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>
          {actionType === "approve" ? "Approve Timesheet" : "Reject Timesheet"}
        </h2>
        <p>Are you sure you want to {actionType} this timesheet?</p>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="modal-buttons">
          <Button label="Yes" onClick={handleAction} />
          <Button
            label="No"
            onClick={() => setModalOpen(false)}
            variant="secondary"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ManagerDashboard;
