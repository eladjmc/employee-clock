import React, {  useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import "./Dashboard.css";
import UserDetails from "../../components/Dashboard/UserDetails/UserDetails";
import ClockButtons from "../../components/Dashboard/ClockButtons/ClockButtons";
import TimesheetList from "../../components/Dashboard/TimesheetList/TimesheetList";

const Dashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="Dashboard">
      <header>
        <UserDetails/>
        <Button label="Logout" onClick={logout} variant="secondary" />
      </header>
        <ClockButtons/>
        <TimesheetList/>
    </div>
  );
};

export default Dashboard;
