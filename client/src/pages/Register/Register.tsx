// src/pages/Register/Register.tsx

import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import {
  RegisterRequestDto,
} from "../../dto/register.dto";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { Role } from "../../types/user";
import "./Register.css";
import { RegistrationErrors } from "../../types/registrationErrors";
import axios from "axios";
import "./Register.css"
interface RegisterFormValues extends RegisterRequestDto {
  [key: string]: unknown;
}

const Register: React.FC = () => {
  const { values, handleChange, errors, validate } =
    useForm<RegisterFormValues>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: Role.EMPLOYEE,
      manager: "",
    });
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const validateForm = (data: RegisterRequestDto) => {
    const errors: Partial<RegistrationErrors> = {};
    if (!data.firstName) {
      errors.firstName = "First name is required";
    }
    if (!data.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.role) {
      errors.role = "Role is required";
    }
    if (data.role === Role.EMPLOYEE && !data.manager) {
      errors.manager = "Manager ID is required for employees";
    }
    return errors;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate(validateForm);
    if (!isValid) return;

    try {
      await register(values);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setModalMessage(error.response?.data?.message);
      } else {
        setModalMessage("Registration failed");
      }
      setModalOpen(true);
    }
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Enter your first name"
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
          placeholder="Enter your last name"
        />
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
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={values.role}
            onChange={handleChange}
            className="select"
          >
            <option value={Role.EMPLOYEE}>Employee</option>
            <option value={Role.MANAGER}>Manager</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        {values.role === Role.EMPLOYEE && (
          <Input
            label="Manager ID"
            type="text"
            name="manager"
            value={values.manager || ""}
            onChange={handleChange}
            error={errors.manager}
            placeholder="Enter your manager's ID"
          />
        )}
        <Button label="Register" type="submit" />
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{modalMessage}</p>
        <Button label="Close" onClick={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Register;
