/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  getManagerReports,
  approveRejectTimesheet,
} from "../services/timesheetService";
import { Timesheet, TimesheetStatus } from "../types/timesheet";
import { transformToTimesheet } from "../utils/transformTimeSheet";

export const useTimesheets = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10); // Fixed page size
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(
    null
  );
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");

  // Fetch timesheets
  const fetchTimesheets = async (page: number) => {
    setLoading(true);
    try {
      const response = await getManagerReports(page, pageSize);
      const transformedTimesheets = response.items.map(transformToTimesheet);
      setTimesheets(transformedTimesheets);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.error("Failed to fetch timesheets:", error);
      setModalMessage("Failed to fetch timesheets.");
      setModalOpen(true);
    } finally {
      setLoading(false);
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
      fetchTimesheets(currentPage);
    } catch (error) {
      console.error(`Failed to ${actionType} timesheet:`, error);
      setModalMessage(`Failed to ${actionType} timesheet.`);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const cancelAction = () => {
    setModalOpen(false);
    setSelectedTimesheet(null);
  };

  return {
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
  };
};
