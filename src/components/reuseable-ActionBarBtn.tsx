import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string; // Make className optional
  icon: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className = '', icon }) => {
  return (
    <button
      className={`button is-small ${className}`} // Always include "button is-small"
      onClick={onClick}
    >
      <span className="icon">
        <i className={`fas ${icon}`} />
      </span>
    </button>
  );
};

export default Button;