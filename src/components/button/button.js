import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Button = ({ 
  text, 
  onClick,
  timer,
  navigate,
  className,
  type,
}) => {
  const [disabled, setDisabled] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault(); 
    if (timer === 'true') {
      await onClick(); 
      setDisabled(false);
    } else {
      if (disabled) return;

      setDisabled(true); 
      try {
        await onClick(); 
      } finally {
        setTimeout(() => {
          setDisabled(false); 
        }, 1000);
      }
    }
    if (navigate) {
      window.location.href = navigate;
    }
  };
  return (
    <Link
      className={className != null ? className : "btn"}
      onClick={handleClick}>
      {disabled ? 'Entrando...' : text}
    </Link>
  );
};
