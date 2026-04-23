import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './AccessibilityMenu.css';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const {
    fontSize, increaseFontSize, decreaseFontSize, resetFontSize,
    isHighContrast, toggleHighContrast,
    isDarkMode, toggleDarkMode,
    isDyslexia, toggleDyslexia,
    isHighSpacing, toggleHighSpacing,
    isHighlightLinks, toggleHighlightLinks,
    resetAll
  } = useAccessibility();

  // Cerrar panel con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Manejar el focus para accesibilidad por teclado
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusableElement = menuRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      <button 
        className={`a11y-toggle-btn ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú de accesibilidad"
        aria-expanded={isOpen}
      >
        <i className="fas fa-universal-access"></i>
      </button>

      <div 
        className={`a11y-side-panel ${isOpen ? 'open' : ''}`} 
        ref={menuRef}
        role="dialog"
        aria-label="Menú de herramientas de accesibilidad"
        aria-hidden={!isOpen}
      >
        <div className="a11y-header">
          <h2 id="a11y-title"><i className="fas fa-universal-access"></i> Accesibilidad</h2>
          <button 
            className="a11y-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú de accesibilidad"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="a11y-content">
          <div className="a11y-section">
            <h3>Tamaño del Texto ({fontSize}px)</h3>
            <div className="a11y-button-group">
              <button onClick={decreaseFontSize} aria-label="Disminuir texto" className="a11y-action-btn">A-</button>
              <button onClick={resetFontSize} aria-label="Restaurar texto" className="a11y-action-btn">A</button>
              <button onClick={increaseFontSize} aria-label="Aumentar texto" className="a11y-action-btn">A+</button>
            </div>
          </div>

          <div className="a11y-section">
            <h3>Contrastes y Colores</h3>
            <button 
              className={`a11y-toggle-action ${isHighContrast ? 'active' : ''}`}
              onClick={toggleHighContrast}
              aria-pressed={isHighContrast}
            >
              <i className="fas fa-adjust"></i> Alto Contraste (WCAG AAA)
            </button>
            <button 
              className={`a11y-toggle-action ${isDarkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
              aria-pressed={isDarkMode}
              disabled={isHighContrast}
            >
              <i className="fas fa-moon"></i> Modo Oscuro
            </button>
          </div>

          <div className="a11y-section">
            <h3>Facilidad de Lectura</h3>
            <button 
              className={`a11y-toggle-action ${isDyslexia ? 'active' : ''}`}
              onClick={toggleDyslexia}
              aria-pressed={isDyslexia}
            >
              <i className="fas fa-font"></i> Fuente para Dislexia
            </button>
            <button 
              className={`a11y-toggle-action ${isHighSpacing ? 'active' : ''}`}
              onClick={toggleHighSpacing}
              aria-pressed={isHighSpacing}
            >
              <i className="fas fa-text-width"></i> Espaciado de Texto
            </button>
            <button 
              className={`a11y-toggle-action ${isHighlightLinks ? 'active' : ''}`}
              onClick={toggleHighlightLinks}
              aria-pressed={isHighlightLinks}
            >
              <i className="fas fa-link"></i> Resaltar Enlaces
            </button>
          </div>

          <div className="a11y-section" style={{ borderBottom: 'none', marginTop: '20px' }}>
            <button className="a11y-reset-btn" onClick={resetAll}>
              <i className="fas fa-undo"></i> Restablecer Configuración
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay para cerrar haciendo clic fuera */}
      {isOpen && <div className="a11y-overlay" onClick={() => setIsOpen(false)} aria-hidden="true"></div>}
    </>
  );
}
