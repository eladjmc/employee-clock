import React from 'react';
import Button from '../Button/Button';
import './PaginationControls.css';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="PaginationControls">
      <Button
        label="Previous"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        variant="secondary"
      />
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        label="Next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        variant="secondary"
      />
    </div>
  );
};

export default PaginationControls;
