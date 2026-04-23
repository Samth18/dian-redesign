import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  // Inicializamos estado desde localStorage o valores por defecto
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('a11y_fontSize')) || 16);
  const [isHighContrast, setIsHighContrast] = useState(() => localStorage.getItem('a11y_highContrast') === 'true');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('a11y_darkMode') === 'true');
  const [isDyslexia, setIsDyslexia] = useState(() => localStorage.getItem('a11y_dyslexia') === 'true');
  const [isHighSpacing, setIsHighSpacing] = useState(() => localStorage.getItem('a11y_highSpacing') === 'true');
  const [isHighlightLinks, setIsHighlightLinks] = useState(() => localStorage.getItem('a11y_highlightLinks') === 'true');

  // Efecto principal para aplicar clases y estilos al body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Tamaño de fuente: aplicamos la variable y el font-size directamente al root (HTML) para que los 'rem' escalen bien.
    root.style.setProperty('--font-size-base', `${fontSize}px`);
    root.style.fontSize = `${fontSize}px`;
    localStorage.setItem('a11y_fontSize', fontSize);

    // Alto Contraste
    if (isHighContrast) {
      body.classList.add('high-contrast');
      body.classList.remove('dark-mode'); // Priorizamos alto contraste sobre dark mode
    } else {
      body.classList.remove('high-contrast');
    }
    localStorage.setItem('a11y_highContrast', isHighContrast);

    // Modo Oscuro
    if (isDarkMode && !isHighContrast) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    localStorage.setItem('a11y_darkMode', isDarkMode);

    // Dislexia
    if (isDyslexia) {
      body.classList.add('dyslexia-font');
    } else {
      body.classList.remove('dyslexia-font');
    }
    localStorage.setItem('a11y_dyslexia', isDyslexia);

    // Espaciado
    if (isHighSpacing) {
      body.classList.add('high-spacing');
    } else {
      body.classList.remove('high-spacing');
    }
    localStorage.setItem('a11y_highSpacing', isHighSpacing);

    // Resaltar enlaces
    if (isHighlightLinks) {
      body.classList.add('highlight-links');
    } else {
      body.classList.remove('highlight-links');
    }
    localStorage.setItem('a11y_highlightLinks', isHighlightLinks);

  }, [fontSize, isHighContrast, isDarkMode, isDyslexia, isHighSpacing, isHighlightLinks]);

  // Funciones de control
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);
  
  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      if (!prev) setIsDarkMode(false); // Apagar modo oscuro si se activa alto contraste
      return !prev;
    });
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      if (!prev) setIsHighContrast(false); // Apagar alto contraste si se activa modo oscuro
      return !prev;
    });
  };

  const toggleDyslexia = () => setIsDyslexia(!isDyslexia);
  const toggleHighSpacing = () => setIsHighSpacing(!isHighSpacing);
  const toggleHighlightLinks = () => setIsHighlightLinks(!isHighlightLinks);

  const resetAll = () => {
    setFontSize(16);
    setIsHighContrast(false);
    setIsDarkMode(false);
    setIsDyslexia(false);
    setIsHighSpacing(false);
    setIsHighlightLinks(false);
  };

  return (
    <AccessibilityContext.Provider value={{
      fontSize, increaseFontSize, decreaseFontSize, resetFontSize,
      isHighContrast, toggleHighContrast,
      isDarkMode, toggleDarkMode,
      isDyslexia, toggleDyslexia,
      isHighSpacing, toggleHighSpacing,
      isHighlightLinks, toggleHighlightLinks,
      resetAll
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
