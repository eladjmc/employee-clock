import axios from "axios";
import React, { useEffect, useState } from "react";
import { getClockInStatus } from "../../../services/timesheetService";
import Button from "../../Button/Button";
import ClockModal from "../ClockModal/ClockModal";

const ClockButtons: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    setError("");
    setModalOpen(true);
  };

  const [actionType, setActionType] = useState<"clockin" | "clockout">(
    "clockin"
  );
  return (
    <>
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
      {modalOpen && <ClockModal
        setModalOpen={setModalOpen}
        actionType={actionType}
        modalOpen={modalOpen}
        onFailedMessage={setError}
        onSuccessMessage={setSuccessMessage}
        fetchClockInStatus={fetchClockInStatus}
      />
      }
    </>
  );
};

export default ClockButtons;
