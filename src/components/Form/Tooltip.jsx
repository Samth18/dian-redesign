import React, { useState } from 'react';

export function Tooltip({ text, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <button
        type="button"
        className="tooltip-trigger"
        aria-label={`Explicación: ${text}`}
        aria-expanded={visible}
        onClick={(e) => {
          e.preventDefault();
          setVisible(!visible);
        }}
      >
        <i className="fas fa-circle-question" aria-hidden="true"></i>
      </button>
      {visible && (
        <span className={`tooltip-bubble tooltip-${position}`} role="tooltip">
          {text}
        </span>
      )}
    </span>
  );
}
