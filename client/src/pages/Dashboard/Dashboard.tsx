import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import "./Dashboard.css";
import UserDetails from "../../components/Dashboard/UserDetails/UserDetails";
import ClockButtons from "../../components/Dashboard/ClockButtons/ClockButtons";
import TimesheetList from "../../components/Dashboard/TimesheetList/TimesheetList";
import { Role } from "../../types/user";

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user?.manager);

  return (
    <div className="Dashboard">
      <header>
        <div className="logout-btn-wrapper">
          <Button label="Logout" onClick={logout} variant="secondary" />
        </div>
        <h3>EMPLOYEE DETAILS</h3>
        <UserDetails />
      </header>
      {user?.manager && <ClockButtons />}
      {user?.role === Role.MANAGER && <TimesheetList />}
    </div>
  );
};

export default Dashboard;
