import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useForm from "./useForm";
import { LoginRequestDto } from "../dto/login.dto";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLoginForm = () => {
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { values, handleChange, errors, validate } = useForm<LoginRequestDto>({
    email: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate(validateForm);
    if (!isValid) return;

    try {
      await loginUser(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : "Login failed";
      setModalMessage(message);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => setModalOpen(false);

  return {
    modalOpen,
    modalMessage,
    handleLogin,
    handleCloseModal,
    formProps: {
      values,
      errors,
      handleChange,
    },
  };
};
