import React from "react";
import Input from "../Input/Input";

interface ManagerSelectorProps {
  hasManager: boolean;
  setHasManager: React.Dispatch<React.SetStateAction<boolean>>;
  managerValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  managerError: string | undefined;
  role: string;
}

const ManagerSelector: React.FC<ManagerSelectorProps> = ({
  hasManager,
  setHasManager,
  managerValue,
  handleChange,
  managerError,
  role,
}) => {
  return (
    <>
      {role === "MANAGER" && (
        <div className="form-group">
          <label htmlFor="hasManager">
            <input
              id="hasManager"
              type="checkbox"
              checked={hasManager}
              onChange={() => setHasManager(!hasManager)}
            />
            I have a manager
          </label>
        </div>
      )}
      {(hasManager || role === "EMPLOYEE") && (
        <Input
          label="Manager ID"
          type="text"
          name="manager"
          value={managerValue || ""}
          onChange={handleChange}
          error={managerError}
          placeholder="Enter your manager's ID"
        />
      )}
    </>
  );
};

export default ManagerSelector;
