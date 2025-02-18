import React, { useState } from "react";
import "./style.css";

function AnimatedButton({ onComplete }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        if (onComplete) {
          onComplete(); // Llama la función callback cuando la animación termina
        }
      }, 10000); // Duración de la animación (10 segundos)
    }
  };

  return (
    <div className="px-0">
      <button
        className={`order ${isAnimating ? "animate" : ""}`}
        onClick={handleClick}
      >
        <span className="default">Completar orden</span>
        <span className="success">
          Orden completada
          <svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <div className="lines"></div>
        <div className="truck">
          <div className="back"></div>
          <div className="front">
            <div className="window"></div>
          </div>
          <div className="light top"></div>
          <div className="light bottom"></div>
        </div>
        <div className="box"></div>
      </button>
    </div>
  );
}

export default AnimatedButton;