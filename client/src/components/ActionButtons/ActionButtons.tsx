import React from 'react';
import Button from '../Button/Button';
import { TimesheetStatus } from '../../types/timesheet';
import './ActionButtons.css';

interface ActionButtonsProps {
  status: TimesheetStatus;
  onApprove: () => void;
  onReject: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onApprove,
  onReject,
}) => {
  if (status !== TimesheetStatus.PENDING) return null;

  return (
    <div className="ActionButtons">
      <Button label="Approve" onClick={onApprove} />
      <Button label="Reject" onClick={onReject} variant="secondary" />
    </div>
  );
};

export default ActionButtons;
