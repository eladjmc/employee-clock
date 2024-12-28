// src/pages/Dashboard/Dashboard.tsx

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getClockInStatus,
  clockIn,
  clockOut,
} from "../../services/timesheetService";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./Dashboard.css";
import axios from "axios";

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"clockin" | "clockout">(
    "clockin"
  );
  const [reportText, setReportText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);

  const fetchClockInStatus = async () => {
    try {
      const status = await getClockInStatus();
      setIsClockedIn(!!status.activeTimesheet);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response?.data?.message);
      } else {
        setError("Failed to fetch status");
      }
    }
  };

  useEffect(() => {
    fetchClockInStatus();
  }, []);

  const openModal = (type: "clockin" | "clockout") => {
    setActionType(type);
    setReportText("");
    setError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (actionType === "clockin") {
        await clockIn({ reportText });
        setSuccessMessage("Successfully clocked in.");
      } else {
        await clockOut({ reportText });
        setSuccessMessage("Successfully clocked out.");
      }
      setModalOpen(false);
      fetchClockInStatus();
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response?.data?.message);
          } else {
            setError("Operation failed");
          }
    }
  };

  return (
    <div className="Dashboard">
      <header>
        <h1>Welcome, {user?.role}</h1>
        <Button label="Logout" onClick={logout} variant="secondary" />
      </header>
      <main>
        <div className="action-buttons">
          {!isClockedIn ? (
            <Button label="Clock In" onClick={() => openModal("clockin")} />
          ) : (
            <Button label="Clock Out" onClick={() => openModal("clockout")} />
          )}
        </div>
        {successMessage && <p className="success">{successMessage}</p>}
        {error && <p className="error">{error}</p>}
      </main>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{actionType === "clockin" ? "Clock In" : "Clock Out"}</h2>
        <Input
          label="Report Text"
          type="text"
          name="reportText"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          placeholder="Enter your report"
        />
        {error && <p className="error">{error}</p>}
        <div className="modal-buttons">
          <Button label="Save" onClick={handleSave} />
          <Button
            label="Cancel"
            onClick={() => setModalOpen(false)}
            variant="secondary"
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
