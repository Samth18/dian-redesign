import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TaxSimulatorFlow } from '../components/TaxSimulatorFlow';
import { OnlinePaymentFlow } from '../components/OnlinePaymentFlow';
import { Tooltip } from '../components/Form/Tooltip';

export function Impuestos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');

  useEffect(() => {
    // SEO & Title Tag Best Practice
    document.title = "DIAN - Declarar, Simular Renta y Pagos en Línea";
  }, []);

  const handleSetAction = (newAction) => {
    if (newAction) {
      setSearchParams({ action: newAction });
    } else {
      setSearchParams({});
    }
  };

  if (action === 'simulator') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-calculator"></i> Simulador de Renta
        </div>
        <TaxSimulatorFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'payment') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-credit-card"></i> Pagos en Línea
        </div>
        <OnlinePaymentFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-file-invoice-dollar"></i> Portal de Impuestos
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Todo sobre tus impuestos en un solo lugar</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Calcula lo que debes declarar con nuestro simulador, paga en línea mediante PSE o consulta el calendario tributario para estar al día. Hacemos más fácil el cumplimiento de tus deberes tributarios.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured" onClick={() => handleSetAction('simulator')}>
          <div className="action-icon"><i className="fas fa-calculator"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Ingresa tus ingresos y deducciones del año pasado para estimar tu impuesto de renta de forma amigable." />
          </div>
          <h3>Simulador de Renta</h3>
          <p>Calcula un estimado amigable de lo que debes declarar este año.</p>
        </button>

        <button className="action-card" onClick={() => handleSetAction('payment')}>
          <div className="action-icon" style={{ background: '#f0faf5', color: '#007a4d' }}><i className="fas fa-credit-card"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Transfiere en línea de forma segura el valor de tus impuestos mediante el sistema PSE de tu banco." />
          </div>
          <h3>Pagos en Línea (PSE)</h3>
          <p>Realiza el pago de tus impuestos con débito directo desde tu banco de forma segura.</p>
        </button>

        <button className="action-card" onClick={() => alert('Calendario Tributario 2026: (Simulado)')}>
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-calendar-alt"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Revisa las fechas límite y plazos que tienes para declarar según los últimos números de tu NIT." />
          </div>
          <h3>Calendario Tributario</h3>
          <p>Vencimientos y fechas límite organizadas para evitar sanciones.</p>
        </button>

        <button className="action-card" onClick={() => alert('Descargando Certificados de Retención históricos... (Simulado)')}>
          <div className="action-icon" style={{ background: '#f5f0ff', color: '#6600cc' }}><i className="fas fa-file-pdf"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Obtén soportes históricos de retenciones en la fuente aplicadas." />
          </div>
          <h3>Certificados de Retención</h3>
          <p>Descarga tus soportes acumulados de retenciones.</p>
        </button>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="info-card">
          <h4><i className="fas fa-lightbulb"></i> ¿Sabías qué?</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
            La DIAN ofrece una <strong>declaración sugerida de renta</strong>. Esto significa que pre-cargamos los datos reportados por tus bancos, compras con factura electrónica y empleadores. Tú solo debes revisar si coincide con tu realidad, completar los datos faltantes y aceptar. ¡Hacemos el trámite más sencillo para ti!
          </p>
        </div>
      </div>
    </main>
  );
}
