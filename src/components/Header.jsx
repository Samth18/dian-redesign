import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <div className="govbar">
        <i className="fas fa-shield-halved"></i> GOV.CO &nbsp;·&nbsp; Sitio oficial del Estado colombiano
      </div>

      <header className="header">
        <Link to="/" className="logo-area" aria-label="Ir a la página de inicio de la DIAN">
          <div>
            <div className="logo-text">DIAN</div>
            <div className="logo-tagline">Por una Colombia más honesta</div>
          </div>
        </Link>
        
        <div className="header-right">
          <div className="search-box">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="¿Qué trámite necesita?" aria-label="Buscar trámite" />
          </div>
        </div>
      </header>

      <nav aria-label="Navegación principal">
        <Link to="/" className={isActive('/')}>Inicio</Link>
        <Link to="/tramites" className={isActive('/tramites')}>Mis Trámites</Link>
        <Link to="/impuestos" className={isActive('/impuestos')}>Impuestos</Link>
        <Link to="/aduanas" className={isActive('/aduanas')}>Aduanas</Link>
        <a href="#">Factura Electrónica</a>
        <a href="#">RUT</a>
        <a href="#">Contáctenos</a>
      </nav>

      {location.pathname !== '/' && (
        <div className="breadcrumb" aria-label="Ruta de navegación">
          <i className="fas fa-house" style={{ fontSize: '11px', color: 'var(--primary-dark)' }}></i>
          <Link to="/">Inicio</Link>
          <span className="sep">›</span>
          <span className="current">
            {location.pathname === '/tramites' && 'Mis Trámites'}
            {location.pathname === '/impuestos' && 'Impuestos'}
            {location.pathname === '/aduanas' && 'Aduanas'}
          </span>
          <span className="wcag-badge"><i className="fas fa-check"></i> WCAG AAA</span>
        </div>
      )}
    </>
  );
}
