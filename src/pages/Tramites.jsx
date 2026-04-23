import React, { useState } from 'react';
import { DeclarationFlow } from '../components/DeclarationFlow';

export function Tramites() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-folder-open"></i> Mis Trámites
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Gestione sus trámites en progreso</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Aquí encontrará el historial de sus trámites, borradores guardados, y notificaciones de acciones requeridas.
        </p>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="info-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <h4><i className="fas fa-exclamation-circle" style={{ color: '#ef4444' }}></i> Acción Requerida</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Declaración de Renta Persona Natural - 2025</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Vence en 5 días (Abril 28, 2026)</p>
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Continuar Declaración
            </button>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '30px', color: 'var(--primary-dark)', fontSize: '16px' }}>Historial Reciente</h3>
      
      <div className="info-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="info-card">
          <div className="info-item">
            <i className="fas fa-check-circle" style={{ color: 'var(--secondary)' }}></i>
            <div className="info-item-text" style={{ flex: 1 }}>
              <strong>Actualización de RUT (Actividad Económica)</strong>
              <span>Radicado: 1092837465 • Aprobado el 15 Mar 2026</span>
            </div>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>Descargar PDF</button>
          </div>
          
          <div className="info-item">
            <i className="fas fa-check-circle" style={{ color: 'var(--secondary)' }}></i>
            <div className="info-item-text" style={{ flex: 1 }}>
              <strong>Habilitación Facturador Electrónico</strong>
              <span>Radicado: 9982736451 • Aprobado el 10 Ene 2026</span>
            </div>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>Ver Detalles</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') setShowModal(false);
        }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 id="modal-title" style={{ margin: 0, color: 'var(--primary-dark)' }}>Portal Transaccional</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
                aria-label="Cerrar ventana"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <DeclarationFlow />
          </div>
        </div>
      )}
    </main>
  );
}
