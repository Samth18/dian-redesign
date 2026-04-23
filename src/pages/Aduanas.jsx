import React from 'react';

export function Aduanas() {
  return (
    <main>
      <div className="section-label">
        <i className="fas fa-ship"></i> Gestión Aduanera
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Importaciones, exportaciones y tránsito</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Consulte la normativa aduanera, realice seguimiento a sus declaraciones de importación o exportación, y gestione sus registros especiales.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured">
          <div className="action-icon"><i className="fas fa-search-location"></i></div>
          <h3>Seguimiento de Carga</h3>
          <p>Rastree el estado aduanero de sus mercancías.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#fef0f0', color: '#cc2200' }}><i className="fas fa-file-export"></i></div>
          <h3>Declaración de Exportación</h3>
          <p>Diligencie el formulario SAE en línea.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-file-import"></i></div>
          <h3>Declaración de Importación</h3>
          <p>Liquidación y pago de tributos aduaneros.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#fff8e6', color: '#cc7700' }}><i className="fas fa-scale-balanced"></i></div>
          <h3>Arancel de Aduanas</h3>
          <p>Consulte la clasificación arancelaria y normativa.</p>
        </button>
      </div>
    </main>
  );
}
