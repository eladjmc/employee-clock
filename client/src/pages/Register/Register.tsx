import React from "react";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import InputGroup from "../../components/InputGroup/InputGroup";
import RoleSelector from "../../components/RoleSelector/RoleSelector";
import ManagerSelector from "../../components/ManagerSelector/ManagerSelector";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./Register.css";

const Register: React.FC = () => {
  const {
    values,
    handleChange,
    errors,
    hasManager,
    setHasManager,
    modalOpen,
    modalMessage,
    onSubmit,
    closeModal,
  } = useRegisterForm();

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <InputGroup
          inputs={values}
          handleChange={handleChange}
          errors={errors}
        />
        <RoleSelector
          role={values.role}
          handleChange={handleChange}
          setHasManager={setHasManager}
        />
        <ManagerSelector
          hasManager={hasManager}
          setHasManager={setHasManager}
          managerValue={values.manager}
          handleChange={handleChange}
          managerError={errors.manager}
          role={values.role}
        />
        <Button label="Register" type="submit" />
        <div className="link-wrapper">
          <Link to={"/login"}>Already Registered? Login</Link>
        </div>
      </form>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <p>{modalMessage}</p>
        <Button label="Close" onClick={closeModal} />
      </Modal>
    </div>
  );
};

export default Register;
