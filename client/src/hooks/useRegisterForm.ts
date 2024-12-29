// src/hooks/useRegisterForm.ts
import { useState } from "react";
import useForm from "./useForm";
import { RegisterRequestDto } from "../dto/register.dto";
import { register } from "../services/authService";
import { Role } from "../types/user";
import axios from "axios";
import { registerInputs } from "../constants/inputConfig";
import { useNavigate } from "react-router-dom";

export const useRegisterForm = () => {
  const { values, handleChange, errors, validate } =
    useForm<RegisterRequestDto>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: Role.EMPLOYEE,
      manager: "",
    });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [hasManager, setHasManager] = useState(true);
  const navigate = useNavigate();
  const closeModal = () => setModalOpen(false);

  const validateForm = (data: RegisterRequestDto) => {
    const validationErrors: Record<string, string> = {};
    registerInputs.forEach(({ name }) => {
      if (!data[name as keyof RegisterRequestDto]) {
        validationErrors[name] = `${name} is required`;
      }
    });
    if (data.role === Role.EMPLOYEE && !data.manager) {
      validationErrors.manager = "Manager ID is required for employees.";
    }
    if (data.role === Role.MANAGER && hasManager && !data.manager) {
      validationErrors.manager =
        "Manager ID is required if you choose to have a manager.";
    }
    return validationErrors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate(validateForm);
    if (!isValid) return;

    try {
      await register(values);
      setModalMessage("Registration successful!");
      navigate("/login")
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response?.data?.message
          : "Registration failed";
      setModalMessage(errorMessage);
    } finally {
      setModalOpen(true);
    }
  };

  return {
    values,
    handleChange,
    errors,
    hasManager,
    setHasManager,
    modalOpen,
    modalMessage,
    onSubmit,
    closeModal,
  };
};
