import React, { useEffect } from 'react';
import { Tooltip } from '../components/Form/Tooltip';

export function GrandesContribuyentes() {
  useEffect(() => {
    // SEO & Title Tag Best Practice
    document.title = "DIAN - Grandes Contribuyentes";
  }, []);

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-landmark"></i> Grandes Contribuyentes
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Portal Exclusivo para Grandes Contribuyentes</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Acceso preferencial para empresas catalogadas de gran envergadura fiscal. Aquí podrá gestionar declaraciones de alto volumen, retenciones y contactar directamente a su gestor asignado.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured" onClick={() => alert('Ingresando al sistema de Declaraciones Especiales...')}>
          <div className="action-icon"><i className="fas fa-file-invoice-dollar"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Plataforma de alto rendimiento para el envío de declaraciones complejas y de gran volumen." />
          </div>
          <h3>Declaraciones Especiales</h3>
          <p>Presentación de declaraciones tributarias masivas.</p>
        </button>

        <button className="action-card" onClick={() => alert('Abriendo portal de Agente de Retención...')}>
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-file-contract"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Gestione sus obligaciones como Agente de Retención de Renta e IVA." />
          </div>
          <h3>Agente de Retención</h3>
          <p>Módulo de gestión y reporte de retenciones en la fuente.</p>
        </button>

        <button className="action-card" onClick={() => alert('Contactando con gestor asignado...')}>
          <div className="action-icon" style={{ background: '#f0faf5', color: '#007a4d' }}><i className="fas fa-user-tie"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Comuníquese directamente con el funcionario especializado asignado a su organización." />
          </div>
          <h3>Atención Preferencial</h3>
          <p>Canal directo con su gestor de cuenta asignado.</p>
        </button>

        <button className="action-card" onClick={() => alert('Ingresando a Facturación Electrónica de Grandes Volúmenes...')}>
          <div className="action-icon" style={{ background: '#fff5e6', color: '#cc5500' }}><i className="fas fa-server"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="API y herramientas de monitoreo para la emisión de millones de facturas electrónicas diarias." />
          </div>
          <h3>Facturación Alto Volumen</h3>
          <p>Gestión y monitoreo de emisión masiva de facturas.</p>
        </button>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="info-card">
          <h4><i className="fas fa-shield-halved"></i> Seguridad y Rendimiento</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
            Este portal cuenta con canales dedicados para asegurar que la transmisión de información masiva se realice sin interrupciones y con los más altos estándares de seguridad criptográfica exigidos para los Grandes Contribuyentes de Colombia.
          </p>
        </div>
      </div>
    </main>
  );
}
