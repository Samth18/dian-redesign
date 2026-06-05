import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--surface)', 
      padding: '24px 32px', 
      marginTop: 'auto',
      borderTop: '1px solid #e8edf5',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0, fontWeight: '600' }}>© 2026 Dirección de Impuestos y Aduanas Nacionales</p>
        <p style={{ fontSize: '12px', margin: 0 }}>
          Este es un proyecto académico de rediseño enfocado en la usabilidad y accesibilidad (WCAG).
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
          <a href="#" style={{ color: 'var(--primary-dark)', fontSize: '18px' }} aria-label="Facebook DIAN"><i className="fab fa-facebook"></i></a>
          <a href="#" style={{ color: 'var(--primary-dark)', fontSize: '18px' }} aria-label="X (Twitter) DIAN"><i className="fab fa-x-twitter"></i></a>
          <a href="#" style={{ color: 'var(--primary-dark)', fontSize: '18px' }} aria-label="YouTube DIAN"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
}
