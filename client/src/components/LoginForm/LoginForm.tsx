import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./LoginForm.css";

interface LoginFormProps {
  values: Record<string, string>;
  errors: Record<string, string | undefined>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    values,
    errors,
    handleChange,
    onSubmit,
  }) => {
    return (
      <form onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email || ""} // Provide a fallback for undefined
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password || ""} // Provide a fallback for undefined
          placeholder="Enter your password"
        />
        <Button label="Login" type="submit" />
        <div className="link-wrapper">
          <Link to={"/register"}>No Account Yet? Register</Link>
        </div>
      </form>
    );
  };
  

export default LoginForm;
