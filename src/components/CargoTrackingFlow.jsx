import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function CargoTrackingFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');
  const [selectedNode, setSelectedNode] = useState(2); // Current node is 2 (Inspección)

  const handleSearch = () => {
    if (!trackingCode) {
      setError('Por favor, ingresa el número de guía o contenedor para buscar.');
      return;
    }
    if (!/^[A-Z0-9]{8,12}$/i.test(trackingCode)) {
      setError('El código de seguimiento debe contener entre 8 y 12 letras y números (ejemplo: CO87654321).');
      return;
    }
    setError('');
    setStep(2);
  };

  const trackingSteps = [
    {
      title: '1. Recibido en Puerto de Origen',
      desc: 'La transportadora entregó la mercancía y la aduana de salida aprobó el embarque.',
      status: 'completed',
      detail: 'La mercancía se embarcó de forma exitosa y zarpó en tránsito internacional.'
    },
    {
      title: '2. Llegada a Territorio Nacional',
      desc: 'La carga arribó a Colombia (Puerto de Buenaventura / Aeropuerto El Dorado).',
      status: 'completed',
      detail: 'El buque o avión fue recibido y la carga se descargó en las bodegas temporales de la aduana colombiana.'
    },
    {
      title: '3. Inspección y Control de Aduanas',
      desc: 'Verificación documental y física de los productos frente a lo declarado.',
      status: 'current',
      detail: 'Nuestros agentes aduaneros están verificando de forma preventiva que el peso y la descripción física coincidan con la factura de compra. Es un proceso de control estándar de seguridad para evitar contrabando.'
    },
    {
      title: '4. Pago de Impuestos y Liberación',
      desc: 'Liquidación de aranceles e impuestos para autorizar el retiro.',
      status: 'pending',
      detail: 'Una vez aprobada la inspección, se liquidan los impuestos de importación (arancel e IVA). Al pagarlos, la carga es libre para transportarse por el país.'
    }
  ];

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-search-location"></i> Seguimiento de Carga Aduanera
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 3`}>
          <div className={`stepper-step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Rastrea el estado de tu importación</h3>
          <p className="wizard-subtitle">
            Ingresa el código identificador de carga o número de manifiesto para conocer su estado de nacionalización.
          </p>

          <Input
            label="Código de seguimiento (Guía / Contenedor)"
            placeholder="Ej: CO98765432"
            value={trackingCode}
            onChange={(e) => {
              setTrackingCode(e.target.value.toUpperCase());
              setError('');
            }}
            error={error}
            helperText="Este número te lo provee la empresa de logística o remitente internacional."
            required
          />

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Aduanas</Button>
            <Button onClick={handleSearch}>Rastrear Mercancía <i className="fas fa-search"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Estado de tu Carga: {trackingCode}</h3>
          <p className="wizard-subtitle">
            A continuación, se detalla la línea de tiempo. Haz clic en las etapas marcadas para obtener explicaciones sencillas.
          </p>

          <div className="tracking-timeline">
            {trackingSteps.map((node, idx) => (
              <div 
                key={idx} 
                className={`tracking-node ${node.status} ${selectedNode === idx ? 'selected-node' : ''}`}
                style={{ cursor: 'pointer', padding: '8px', borderRadius: '8px', background: selectedNode === idx ? '#f0f6fc' : 'transparent', border: selectedNode === idx ? '1px solid #d0e1fd' : '1px solid transparent' }}
                onClick={() => setSelectedNode(idx)}
              >
                <div className="tracking-node-icon">
                  {node.status === 'completed' && <i className="fas fa-check" style={{ fontSize: '9px' }}></i>}
                  {node.status === 'current' && <i className="fas fa-clock" style={{ fontSize: '9px' }}></i>}
                  {node.status === 'pending' && <span>{idx + 1}</span>}
                </div>
                <div className="tracking-node-content">
                  <h4 className="tracking-node-title">
                    {node.title}
                    {node.status === 'current' && (
                      <span style={{ marginLeft: '10px', fontSize: '9px', background: 'var(--secondary)', color: 'white', padding: '2px 6px', borderRadius: '10px', textTransform: 'uppercase' }}>
                        En Proceso
                      </span>
                    )}
                  </h4>
                  <p className="tracking-node-desc">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1.5px solid var(--primary-light)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: 'var(--primary-dark)' }}>
              <i className="fas fa-circle-info"></i> Detalle de la etapa seleccionada:
            </h4>
            <p style={{ margin: 0, fontSize: '0.8125rem', lineHeight: '1.4', color: 'var(--text-main)' }}>
              {trackingSteps[selectedNode].detail}
            </p>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Nueva Búsqueda</Button>
            <Button onClick={() => setStep(3)}>Ver Documentación <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Documentos y Paz y Salvo</h3>
          <p className="wizard-subtitle">
            Verificación de obligaciones arancelarias y vistos buenos de entidades de salud o comercio.
          </p>

          <div style={{ background: '#eef6f0', border: '1px solid var(--secondary)', color: '#007a4d', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <i className="fas fa-circle-check" style={{ fontSize: '1.75rem' }}></i>
            <div>
              <strong style={{ fontSize: '0.875rem', display: 'block' }}>¡Todo al día! Carga habilitada</strong>
              <span style={{ fontSize: '0.75rem' }}>Tu importación no presenta observaciones aduaneras pendientes. Una vez termine la inspección física quedará lista para entrega.</span>
            </div>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '10px', padding: '16px', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>Manifiestos y Radicados:</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Manifiesto de Importación:</span>
              <strong>MAN-2026-99283</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Declarante / Destinatario:</span>
              <strong>María José Díaz</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Vistos Buenos Sanitarios:</span>
              <span style={{ color: 'var(--secondary)', fontWeight: 600 }}><i className="fas fa-check"></i> Aprobados (INVIMA)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Impuestos de Importación:</span>
              <span style={{ color: 'var(--secondary)', fontWeight: 600 }}><i className="fas fa-check"></i> Pagados e Incorporados</span>
            </div>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Volver a Ruta</Button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" onClick={() => alert('Descargando manifiesto de aduana... (Simulado)')}>
                <i className="fas fa-download"></i> Descargar Manifiesto
              </button>
              <button className="btn-primary" onClick={onBack}>
                Terminar y Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
