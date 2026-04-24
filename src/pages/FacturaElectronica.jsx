import React from 'react';

export function FacturaElectronica() {
  return (
    <main>
      <div className="section-label">
        <i className="fas fa-file-invoice"></i> Factura Electrónica
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Gestión de Factura Electrónica</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Habilítese como facturador electrónico, consulte sus documentos emitidos y recibidos, y gestione su certificado digital.
        </p>
      </div>

      <div className="info-row">
        <div className="info-card">
          <h4><i className="fas fa-plus-circle" style={{ color: 'var(--primary)' }}></i> Habilitación</h4>
          <p>Inicie el proceso para convertirse en facturador electrónico autorizado por la DIAN.</p>
          <button className="btn-primary" style={{ marginTop: '10px' }}>Comenzar Habilitación</button>
        </div>
        <div className="info-card">
          <h4><i className="fas fa-search" style={{ color: 'var(--primary)' }}></i> Consultas</h4>
          <p>Busque y descargue las facturas electrónicas emitidas y recibidas por su empresa o persona.</p>
          <button className="btn-secondary" style={{ marginTop: '10px' }}>Consultar Documentos</button>
        </div>
      </div>
    </main>
  );
}
