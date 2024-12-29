import React from "react";
import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <p>{message}</p>
      <div className="modal-buttons">
        <Button label="Yes" onClick={onConfirm} />
        <Button label="No" onClick={onCancel} variant="secondary" />
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
