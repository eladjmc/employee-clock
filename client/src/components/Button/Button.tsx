import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', ...rest }) => {
  return (
    <button className={`Button Button--${variant}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
