import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InvoiceEnablementFlow } from '../components/InvoiceEnablementFlow';
import { InvoiceQueryFlow } from '../components/InvoiceQueryFlow';
import { Tooltip } from '../components/Form/Tooltip';

export function FacturaElectronica() {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');

  useEffect(() => {
    // SEO & Title Tag Best Practice
    document.title = "DIAN - Factura Electrónica: Habilitación y Consultas";
  }, []);

  const handleSetAction = (newAction) => {
    if (newAction) {
      setSearchParams({ action: newAction });
    } else {
      setSearchParams({});
    }
  };

  if (action === 'enablement') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-plus-circle"></i> Habilitación
        </div>
        <InvoiceEnablementFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'query') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-search"></i> Consulta de Documentos
        </div>
        <InvoiceQueryFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-file-invoice"></i> Factura Electrónica
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Gestión de Factura Electrónica</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Habilítese como facturador electrónico, consulte sus documentos emitidos y recibidos, y gestione su certificado digital. Todo en un solo lugar.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured" onClick={() => handleSetAction('enablement')}>
          <div className="action-icon"><i className="fas fa-plus-circle"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Inicia el proceso para convertirte en facturador electrónico autorizado por la DIAN de manera sencilla." />
          </div>
          <h3>Habilitación</h3>
          <p>Comienza a facturar electrónicamente de forma rápida.</p>
        </button>

        <button className="action-card" onClick={() => handleSetAction('query')}>
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-search"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Busca, visualiza y descarga las facturas que has emitido a tus clientes o las que has recibido." />
          </div>
          <h3>Consulta de Documentos</h3>
          <p>Busque y descargue sus facturas emitidas y recibidas.</p>
        </button>

        <button className="action-card" onClick={() => alert('Emisión de facturas... (Simulado)')}>
          <div className="action-icon" style={{ background: '#f0faf5', color: '#007a4d' }}><i className="fas fa-paper-plane"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Utiliza nuestra herramienta gratuita para generar y enviar facturas electrónicas válidas." />
          </div>
          <h3>Emitir Factura (Gratuito)</h3>
          <p>Genera facturas electrónicas sin costo desde nuestro portal.</p>
        </button>

        <button className="action-card" onClick={() => alert('Gestión de Certificado Digital... (Simulado)')}>
          <div className="action-icon" style={{ background: '#fef0f0', color: '#cc2200' }}><i className="fas fa-file-signature"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="El certificado digital es tu firma electrónica que le da validez legal a cada factura." />
          </div>
          <h3>Certificado Digital</h3>
          <p>Asocia o renueva la firma digital que autoriza tus facturas.</p>
        </button>
      </div>
    </main>
  );
}
