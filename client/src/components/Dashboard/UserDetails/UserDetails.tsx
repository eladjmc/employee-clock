import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserDetails.css";

const UserDetails: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="user-details">
      <div className="user-details__row">
        <span className="user-details__label">First Name</span>
        <span className="user-details__value">{user?.firstName}</span>
      </div>
      <div className="user-details__row">
        <span className="user-details__label">Last Name</span>
        <span className="user-details__value">{user?.lastName}</span>
      </div>
      <div className="user-details__row">
        <span className="user-details__label">Role</span>
        <span className="user-details__value">{user?.role}</span>
      </div>
      {user?.manager && (
        <div className="user-details__row">
          <span className="user-details__label">Manager</span>
          <span className="user-details__value">
            {user.manager.firstName} {user.manager.lastName}
          </span>
        </div>
      )}
    </section>
  );
};

export default UserDetails;
