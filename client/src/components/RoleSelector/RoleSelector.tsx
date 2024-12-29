import React from "react";
import { roles } from "../../constants/inputConfig";

interface RoleSelectorProps {
  role: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setHasManager: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  role,
  handleChange,
  setHasManager,
}) => {
  return (
    <div className="form-group">
      <label htmlFor="role">Role</label>
      <select
        id="role"
        name="role"
        value={role}
        onChange={(e) => {
          handleChange(e);
          if (e.target.value === "EMPLOYEE") {
            setHasManager(true);
          }
        }}
        className="select"
      >
        {roles.map((roleOption) => (
          <option key={roleOption.value} value={roleOption.value}>
            {roleOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;
