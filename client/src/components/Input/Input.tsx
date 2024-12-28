import React, { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, name, error, ...rest }) => {
  return (
    <div className="Input">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
