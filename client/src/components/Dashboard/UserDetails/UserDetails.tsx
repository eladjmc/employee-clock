import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const UserDetails: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="user-details">
      <h3>EMPLOYEE DETAILS</h3>
      <div className="details-row">
        <p>
          First Name:<span>{user?.firstName}</span>
        </p>
        <p>
          Last Name:<span>{user?.lastName}</span>
        </p>
      </div>
      <div className="details-row">
        <p>
          Role:<span>{user?.role}</span>
        </p>
        <p>
          Manager:
          {user?.manager ? (
            <span>{`${user?.manager?.firstName} ${user?.manager?.lastName}`}</span>
          ) : (
            <span>No Manager assigned</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserDetails;
