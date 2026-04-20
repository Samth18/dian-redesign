import React, { useId } from 'react';

export function Input({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder,
  required = false
}) {
  const inputId = useId();
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const ariaDescribedBy = [
    helperText ? helperId : null,
    error ? errorId : null
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-group animate-fade-in">
      <label htmlFor={inputId} className="form-label">
        {label} {required && <span aria-hidden="true" style={{ color: 'var(--error)' }}>*</span>}
        {required && <span className="sr-only">Este campo es obligatorio</span>}
      </label>
      
      {helperText && !error && (
        <p id={helperId} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
          {helperText}
        </p>
      )}

      <input
        id={inputId}
        type={type}
        className={`form-input ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        required={required}
      />
      
      {error && (
        <div id={errorId} className="error-message" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <strong>Revisemos esto: </strong>
            {error}
          </div>
        </div>
      )}
    </div>
  );
}
