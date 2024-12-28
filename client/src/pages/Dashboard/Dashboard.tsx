import React, {  useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import "./Dashboard.css";
import UserDetails from "../../components/Dashboard/UserDetails/UserDetails";
import ClockButtons from "../../components/Dashboard/ClockButtons/ClockButtons";
import TimesheetList from "../../components/Dashboard/TimesheetList/TimesheetList";
import { Role } from "../../types/user";

const Dashboard: React.FC = () => {
  const { user,logout } = useContext(AuthContext);
  console.log(user?.manager);
  
  return (
    <div className="Dashboard">
      <header>
        <UserDetails/>
        <Button label="Logout" onClick={logout} variant="secondary" />
      </header>
        {user?.manager && <ClockButtons/>}
        {user?.role === Role.MANAGER && <TimesheetList/>}
    </div>
  );
};

export default Dashboard;
