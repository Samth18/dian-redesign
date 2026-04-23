import React from 'react';

export function Impuestos() {
  return (
    <main>
      <div className="section-label">
        <i className="fas fa-file-invoice-dollar"></i> Portal de Impuestos
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Todo sobre sus impuestos en un solo lugar</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Consulte su calendario tributario, declare, pague y descargue certificados. La DIAN le facilita el cumplimiento de sus obligaciones para construir una mejor Colombia.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured">
          <div className="action-icon"><i className="fas fa-calculator"></i></div>
          <h3>Simulador de Renta</h3>
          <p>Calcule un estimado de lo que debe declarar este año.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#f0faf5', color: '#007a4d' }}><i className="fas fa-credit-card"></i></div>
          <h3>Pagos en Línea (PSE)</h3>
          <p>Realice sus pagos de impuestos de forma rápida y segura.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-calendar-alt"></i></div>
          <h3>Calendario Tributario</h3>
          <p>Vencimientos y fechas límite para declarar.</p>
        </button>
        <button className="action-card">
          <div className="action-icon" style={{ background: '#f5f0ff', color: '#6600cc' }}><i className="fas fa-file-pdf"></i></div>
          <h3>Certificados de Retención</h3>
          <p>Descargue sus certificados históricos.</p>
        </button>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="info-card">
          <h4><i className="fas fa-lightbulb"></i> ¿Sabía qué?</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
            Ahora la DIAN le ofrece una declaración sugerida de renta. Al ingresar a su portal transaccional, 
            nuestro sistema pre-cargará los datos que hemos recibido de terceros (bancos, empresas, notariado). 
            Usted solo debe revisarlos, completarlos si es necesario, y aceptar.
          </p>
        </div>
      </div>
    </main>
  );
}
