import React, { useState } from "react";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";
import { clockIn, clockOut } from "../../../services/timesheetService";
import axios from "axios";

interface ClockModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFailedMessage: React.Dispatch<React.SetStateAction<string>>;
  onSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  fetchClockInStatus: () => Promise<void>;
  modalOpen: boolean;
  actionType: string;
}

const ClockModal: React.FC<ClockModalProps> = ({
  actionType,
  modalOpen,
  setModalOpen,
  onSuccessMessage,
  onFailedMessage,
  fetchClockInStatus
}) => {
  const [reportText, setReportText] = useState<string>("");

  const handleSave = async () => {
    try {
      if (actionType === "clockin") {
        await clockIn({ reportText });
        onSuccessMessage("Successfully clocked in.");
      } else {
        await clockOut({ reportText });
        onSuccessMessage("Successfully clocked out.");
      }
      await fetchClockInStatus();
      setModalOpen(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        onFailedMessage(err.response?.data?.message);
      } else {
        onFailedMessage("Operation failed");
      }
    }
  };

  return (
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
      <div className="modal-buttons">
        <Button label="Save" onClick={handleSave} />
        <Button
          label="Cancel"
          onClick={() => setModalOpen(false)}
          variant="secondary"
        />
      </div>
    </Modal>
  );
};

export default ClockModal;
