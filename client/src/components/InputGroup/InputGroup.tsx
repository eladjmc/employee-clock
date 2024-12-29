import React from "react";
import Input from "../Input/Input";
import { registerInputs } from "../../constants/inputConfig";

interface InputGroupProps {
  inputs: Record<string, unknown>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string | undefined>;
}

const InputGroup: React.FC<InputGroupProps> = ({ inputs, handleChange, errors }) => {
  return (
    <>
      {registerInputs.map((input) => (
        <Input
          key={input.name}
          label={input.label}
          type={input.type}
          name={input.name}
          value={(inputs[input.name] || "") as string} // Ensure a string value
          onChange={handleChange}
          error={errors[input.name]}
          placeholder={input.placeholder}
        />
      ))}
    </>
  );
};

export default InputGroup;
