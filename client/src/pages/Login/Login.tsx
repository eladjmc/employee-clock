import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import { LoginRequestDto } from "../../dto/login.dto";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import "./Login.css";
import axios from "axios";
import "./Login.css"
interface LoginFormValues extends LoginRequestDto {
  [key: string]: unknown;
}

const Login: React.FC = () => {
  const { values, handleChange, errors, validate } = useForm<LoginFormValues>({
    email: "",
    password: "",
  });
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const validateForm = (data: LoginRequestDto) => {
    const errors: Partial<LoginRequestDto> = {};
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate(validateForm);
    if (!isValid) return;

    try {
      await loginUser(values.email, values.password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setModalMessage(error.response?.data?.message);
      } else {
        setModalMessage("'Login failed'");
      }
      setModalOpen(true);
    }
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />
        <Button label="Login" type="submit" />
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
        <Button label="Close" onClick={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Login;
