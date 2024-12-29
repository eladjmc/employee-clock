import React from "react";
import "./Login.css";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useLoginForm } from "../../hooks/useLoginForm";

const Login: React.FC = () => {
  const {
    modalOpen,
    modalMessage,
    handleLogin,
    handleCloseModal,
    formProps,
  } = useLoginForm();

  return (
    <div className="Login">
      <h2>Login</h2>
      <LoginForm {...formProps} onSubmit={handleLogin} />
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <p>{modalMessage}</p>
        <Button label="Close" onClick={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Login;
