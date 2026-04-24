import React from 'react';

export function RUT() {
  return (
    <main>
      <div className="section-label">
        <i className="fas fa-id-card"></i> Registro Único Tributario (RUT)
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Servicios del RUT</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Inscríbase, actualice su información o descargue una copia de su Registro Único Tributario.
        </p>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="info-card">
          <h4><i className="fas fa-file-signature" style={{ color: 'var(--primary)' }}></i> Inscripción</h4>
          <p>Regístrese por primera vez en el RUT como persona natural o jurídica.</p>
          <button className="btn-primary" style={{ marginTop: '10px' }}>Inscribirse al RUT</button>
        </div>
        <div className="info-card">
          <h4><i className="fas fa-sync-alt" style={{ color: 'var(--primary)' }}></i> Actualización</h4>
          <p>Modifique sus datos personales, actividad económica o responsabilidades.</p>
          <button className="btn-secondary" style={{ marginTop: '10px' }}>Actualizar RUT</button>
        </div>
        <div className="info-card">
          <h4><i className="fas fa-download" style={{ color: 'var(--primary)' }}></i> Obtener Copia</h4>
          <p>Descargue una copia actualizada de su RUT en formato PDF.</p>
          <button className="btn-secondary" style={{ marginTop: '10px' }}>Descargar Copia</button>
        </div>
      </div>
    </main>
  );
}
