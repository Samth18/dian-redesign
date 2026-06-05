import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CargoTrackingFlow } from '../components/CargoTrackingFlow';
import { ExportDeclarationFlow } from '../components/ExportDeclarationFlow';
import { ImportDeclarationFlow } from '../components/ImportDeclarationFlow';
import { TariffSearchFlow } from '../components/TariffSearchFlow';
import { Tooltip } from '../components/Form/Tooltip';

export function Aduanas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');

  useEffect(() => {
    // SEO & Title Tag Best Practice
    document.title = "DIAN - Gestión Aduanera: Carga y Exportación";
  }, []);

  const handleSetAction = (newAction) => {
    if (newAction) {
      setSearchParams({ action: newAction });
    } else {
      setSearchParams({});
    }
  };

  if (action === 'tracking') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-search-location"></i> Seguimiento de Carga
        </div>
        <CargoTrackingFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'export') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-file-export"></i> Declaración de Exportación
        </div>
        <ExportDeclarationFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'import') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-file-import"></i> Declaración de Importación
        </div>
        <ImportDeclarationFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'tariff') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-scale-balanced"></i> Arancel de Aduanas
        </div>
        <TariffSearchFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-ship"></i> Gestión Aduanera
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Importaciones, exportaciones y tránsito</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Rastrea de forma simplificada el estado de tu carga en la aduana nacional, diligencia tus pre-registros de exportación o consulta las regulaciones arancelarias colombianas de forma accesible.
        </p>
      </div>

      <div className="actions-grid">
        <button className="action-card featured" onClick={() => handleSetAction('tracking')}>
          <div className="action-icon"><i className="fas fa-search-location"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Rastrea en qué etapa de control aduanero se encuentra la mercancía que traes del exterior." />
          </div>
          <h3>Seguimiento de Carga</h3>
          <p>Rastrea de forma amigable el estado aduanero de tus mercancías importadas.</p>
        </button>

        <button className="action-card" onClick={() => handleSetAction('export')}>
          <div className="action-icon" style={{ background: '#fef0f0', color: '#cc2200' }}><i className="fas fa-file-export"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Completa el formulario de autorización de salida de productos colombianos para venta internacional." />
          </div>
          <h3>Declaración de Exportación</h3>
          <p>Diligencia el formulario de Solicitud de Embarque (SAE) en minutos de forma guiada.</p>
        </button>

        <button className="action-card" onClick={() => handleSetAction('import')}>
          <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-file-import"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Liquidación y pagos asociados a la introducción de mercancías extranjeras al país." />
          </div>
          <h3>Declaración de Importación</h3>
          <p>Liquidación sugerida de impuestos y aranceles por compras internacionales.</p>
        </button>

        <button className="action-card" onClick={() => handleSetAction('tariff')}>
          <div className="action-icon" style={{ background: '#fff8e6', color: '#cc7700' }}><i className="fas fa-scale-balanced"></i></div>
          <div className="tooltip-badge">
            <Tooltip text="Busca las categorías de productos y conoce qué porcentajes de impuestos aplican para cada una." />
          </div>
          <h3>Arancel de Aduanas</h3>
          <p>Busca los impuestos y regulaciones que le corresponden a tus mercancías.</p>
        </button>
      </div>
    </main>
  );
}
