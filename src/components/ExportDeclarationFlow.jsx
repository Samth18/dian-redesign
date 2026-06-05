import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function ExportDeclarationFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [actorsData, setActorsData] = useState({
    exporterName: '',
    exporterNit: '',
    buyerName: '',
    buyerCountry: 'US',
    buyerAddress: ''
  });
  const [cargoData, setCargoData] = useState({
    category: 'cafe',
    weight: '',
    usdValue: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!actorsData.exporterName) newErrors.exporterName = 'Ingresa el nombre del exportador.';
    if (!actorsData.exporterNit) newErrors.exporterNit = 'Ingresa el NIT del exportador.';
    if (!actorsData.buyerName) newErrors.buyerName = 'Ingresa el nombre del comprador extranjero.';
    if (!actorsData.buyerAddress) newErrors.buyerAddress = 'Ingresa la dirección del comprador.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!cargoData.weight || parseFloat(cargoData.weight) <= 0) {
      newErrors.weight = 'Por favor, ingresa el peso neto en kilogramos.';
    }
    if (!cargoData.usdValue || parseFloat(cargoData.usdValue.replace(/[^0-9]/g, '')) <= 0) {
      newErrors.usdValue = 'Por favor, ingresa el valor en dólares FOB.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
      }, 1500);
    }
  };

  const handleValueChange = (val) => {
    const digits = val.replace(/[^0-9]/g, '');
    const formatted = digits ? parseInt(digits).toLocaleString('en-US') : '';
    setCargoData({ ...cargoData, usdValue: formatted });
    setErrors({});
  };

  const getArancelCode = (cat) => {
    switch (cat) {
      case 'cafe': return '0901.21.00.00 (Café tostado no descafeinado)';
      case 'flores': return '0603.11.00.00 (Rosas frescas para floristería)';
      case 'textiles': return '6109.10.00.00 (Camisetas de punto de algodón)';
      case 'software': return '8523.49.00.00 (Soportes lógicos/servicios web)';
      default: return '9900.00.00.00 (Otras mercancías declaradas)';
    }
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-file-export"></i> Declaración de Exportación (SAE)
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 4`}>
          <div className={`stepper-step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 4 ? 'completed' : ''} ${step === 4 ? 'active' : ''}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Datos del Exportador y Comprador</h3>
          <p className="wizard-subtitle">
            Ingresa los datos de quién vende en Colombia y quién compra en el exterior.
          </p>

          <h4 style={{ color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '6px' }}>
            Origen (Colombia):
          </h4>
          <div className="form-grid" style={{ marginBottom: '16px' }}>
            <Input
              label="Nombre o Razón Social del Exportador"
              placeholder="Ej: AgroIndustrias del Valle SAS"
              value={actorsData.exporterName}
              onChange={(e) => setActorsData({ ...actorsData, exporterName: e.target.value })}
              error={errors.exporterName}
              required
            />
            <Input
              label="NIT del Exportador"
              placeholder="Ej: 900123456-7"
              value={actorsData.exporterNit}
              onChange={(e) => setActorsData({ ...actorsData, exporterNit: e.target.value })}
              error={errors.exporterNit}
              required
            />
          </div>

          <h4 style={{ color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '6px' }}>
            Destino (Exterior):
          </h4>
          <div className="form-grid">
            <Input
              label="Nombre del Comprador Extranjero"
              placeholder="Ej: Global Trade LLC"
              value={actorsData.buyerName}
              onChange={(e) => setActorsData({ ...actorsData, buyerName: e.target.value })}
              error={errors.buyerName}
              required
            />
            
            <div className="form-group">
              <label className="form-label">País de destino</label>
              <select
                className="form-select"
                value={actorsData.buyerCountry}
                onChange={(e) => setActorsData({ ...actorsData, buyerCountry: e.target.value })}
                style={{ height: '43px' }}
              >
                <option value="US">Estados Unidos</option>
                <option value="ES">España</option>
                <option value="MX">México</option>
                <option value="DE">Alemania</option>
                <option value="JP">Japón</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">
                Dirección del destinatario extranjero
                <Tooltip text="Dirección donde se entregarán los bienes en el país de destino." />
              </label>
              <Input
                placeholder="Ej: 100 Main Street, Suite 200, Miami, FL"
                value={actorsData.buyerAddress}
                onChange={(e) => setActorsData({ ...actorsData, buyerAddress: e.target.value })}
                error={errors.buyerAddress}
                required
              />
            </div>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Aduanas</Button>
            <Button onClick={handleNext}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Detalles de la mercancía a exportar</h3>
          <p className="wizard-subtitle">
            Clasifica tus productos de forma sencilla. El sistema auto-completará los códigos técnicos de aduanas.
          </p>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">
              Categoría de producto principal
              <Tooltip text="Selecciona la categoría más cercana. Esto asocia automáticamente la partida arancelaria oficial de la DIAN." />
            </label>
            <select
              className="form-select"
              value={cargoData.category}
              onChange={(e) => setCargoData({ ...cargoData, category: e.target.value })}
            >
              <option value="cafe">Café de especialidad o tradicional (Tostado)</option>
              <option value="flores">Flores frescas cortadas (Rosas, claveles, etc.)</option>
              <option value="textiles">Confecciones de ropa o textiles</option>
              <option value="software">Servicios tecnológicos o exportación de software</option>
              <option value="otros">Otros productos generales</option>
            </select>
          </div>

          <div style={{ background: '#f0f4f8', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
            <strong>Partida Arancelaria asignada:</strong> {getArancelCode(cargoData.category)}
          </div>

          <div className="form-grid">
            <div>
              <label className="form-label">
                Peso neto total (en Kilogramos)
                <Tooltip text="Ingresa el peso neto sin incluir cajas o empaques de envío secundario." />
              </label>
              <Input
                type="number"
                placeholder="Ej: 500"
                value={cargoData.weight}
                onChange={(e) => setCargoData({ ...cargoData, weight: e.target.value })}
                error={errors.weight}
                required
              />
            </div>

            <div>
              <label className="form-label">
                Valor total en Dólares (USD FOB)
                <Tooltip text="FOB: Es el precio neto de los productos colocados listos en el puerto colombiano, sin fletes internacionales." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $10,500"
                value={cargoData.usdValue}
                onChange={(e) => handleValueChange(e.target.value)}
              />
              {errors.usdValue && <span style={{ color: 'red', fontSize: '11px' }}>{errors.usdValue}</span>}
            </div>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Revisión y Liquidación de Tributos</h3>
          <p className="wizard-subtitle">
            Verifica el resumen del pre-registro antes de enviar la Solicitud de Autorización de Embarque (SAE).
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Resumen del pre-registro:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Exportador:</strong> {actorsData.exporterName} (NIT {actorsData.exporterNit})</div>
            <div style={{ marginBottom: '8px' }}><strong>Destinatario:</strong> {actorsData.buyerName} ({actorsData.buyerCountry === 'US' ? 'Estados Unidos' : 'Otro País'})</div>
            <div style={{ marginBottom: '8px' }}><strong>Mercancía:</strong> {cargoData.category.toUpperCase()} - {cargoData.weight} Kg</div>
            <div style={{ marginBottom: '8px' }}><strong>Código de Aduana (Partida):</strong> {getArancelCode(cargoData.category).split(' ')[0]}</div>
            <div style={{ marginBottom: '8px' }}><strong>Valor declarado:</strong> ${cargoData.usdValue} USD</div>
          </div>

          <div className="tax-result-panel" style={{ borderStyle: 'solid', borderColor: 'var(--secondary)', background: '#f0faf5' }}>
            <div style={{ fontSize: '0.8125rem', color: '#007a4d', fontWeight: 600 }}>Tributos de Exportación a Pagar:</div>
            <div className="tax-result-value" style={{ color: '#007a4d' }}>$0 COP</div>
            <p style={{ fontSize: '0.75rem', color: '#007a4d', margin: '5px 0 0 0', lineHeight: 1.4 }}>
              <strong>¡Incentivo a la exportación colombiano!</strong> La salida de mercancías para comercio internacional está libre de aranceles de aduana y exenta de cobros de IVA (tasa 0%).
            </p>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? 'Radicando SAE ante Aduana...' : 'Enviar y Radicar SAE'}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Solicitud de Exportación Autorizada!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
            La DIAN ha emitido la Solicitud de Autorización de Embarque (SAE) con radicado de aprobación automática para el puerto.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Detalles del Radicado SAE:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Número de Aprobación SAE:</strong> SAE-2026-EXPORT-98725</div>
            <div style={{ marginBottom: '8px' }}><strong>Exportador Autorizado:</strong> {actorsData.exporterName}</div>
            <div style={{ marginBottom: '8px' }}><strong>Puerto de Embarque Sugerido:</strong> Puerto de Buenaventura</div>
            <div style={{ marginBottom: '8px' }}><strong>Vigencia para zarpar:</strong> 30 días calendario</div>
            <div style={{ marginTop: '12px', color: '#0066cc', background: '#e6f7ff', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
              <i className="fas fa-circle-info"></i> Entrega este código SAE a tu agente de carga o transportadora internacional para que procedan al ingreso de la zona aduanera de puerto.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => alert('Descargando formulario de aduana SAE en PDF...')}>
              <i className="fas fa-file-arrow-down"></i> Descargar Declaración SAE
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Terminar y Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
