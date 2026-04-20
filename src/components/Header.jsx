import React from 'react';

export function Header() {
  return (
    <>
      <div className="govbar">
        <i className="fas fa-shield-halved"></i> GOV.CO &nbsp;·&nbsp; Sitio oficial del Estado colombiano
      </div>

      <header className="header">
        <a href="/" className="logo-area">
          <div>
            <div className="logo-text">DIAN</div>
            <div className="logo-tagline">Por una Colombia más honesta</div>
          </div>
        </a>
        
        <div className="header-right">
          <div className="access-panel">
            <span><i className="fas fa-universal-access"></i> Accesibilidad</span>
            <button className="access-btn" aria-label="Aumentar tamaño de letra">A+</button>
            <button className="access-btn outline" aria-label="Disminuir tamaño de letra">A-</button>
            <button className="access-btn outline" aria-label="Cambiar contraste"><i className="fas fa-circle-half-stroke"></i></button>
          </div>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="¿Qué trámite necesita?" aria-label="Buscar trámite" />
          </div>
        </div>
      </header>

      <nav aria-label="Navegación principal">
        <a href="#" className="active">Inicio</a>
        <a href="#">Mis Trámites</a>
        <a href="#">Impuestos</a>
        <a href="#">Aduanas</a>
        <a href="#">Factura Electrónica</a>
        <a href="#">RUT</a>
        <a href="#">Contáctenos</a>
      </nav>

      <div className="breadcrumb" aria-label="Ruta de navegación">
        <i className="fas fa-house" style={{ fontSize: '11px', color: 'var(--primary-dark)' }}></i>
        <a href="#">Inicio</a>
        <span className="sep">›</span>
        <a href="#">Mis Trámites</a>
        <span className="sep">›</span>
        <span className="current">Actualización RUT</span>
        <span className="wcag-badge"><i className="fas fa-check"></i> WCAG AA</span>
      </div>
    </>
  );
}
