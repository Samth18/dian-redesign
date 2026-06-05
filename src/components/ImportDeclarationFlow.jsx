import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function ImportDeclarationFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [importerData, setImporterData] = useState({
    importerName: '',
    importerNit: '',
    customsAgent: '',
    importerType: 'directo'
  });
  const [cargoData, setCargoData] = useState({
    category: 'electronica',
    originCountry: 'CN',
    weight: '',
    cifValue: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = {
    electronica: { name: 'Equipos electrónicos (computadores, celulares)', arancel: '0901.21', arancelRate: 0, ivaRate: 0.19 },
    vehiculos: { name: 'Vehículos y autopartes', arancel: '8703.23', arancelRate: 0.35, ivaRate: 0.19 },
    textiles: { name: 'Ropa, calzado y textiles', arancel: '6109.10', arancelRate: 0.15, ivaRate: 0.19 },
    alimentos: { name: 'Alimentos procesados y bebidas', arancel: '2106.90', arancelRate: 0.20, ivaRate: 0.19 },
    maquinaria: { name: 'Maquinaria industrial y equipos', arancel: '8428.39', arancelRate: 0.05, ivaRate: 0.19 },
    quimicos: { name: 'Productos químicos y farmacéuticos', arancel: '3004.90', arancelRate: 0.10, ivaRate: 0.19 }
  };

  const countries = {
    CN: 'China', US: 'Estados Unidos', DE: 'Alemania', JP: 'Japón', KR: 'Corea del Sur',
    MX: 'México', BR: 'Brasil', IT: 'Italia', FR: 'Francia', GB: 'Reino Unido'
  };

  const parseNum = (val) => parseFloat(String(val).replace(/[^0-9]/g, '')) || 0;

  const cifValueNum = parseNum(cargoData.cifValue);
  const selectedCategory = categories[cargoData.category];
  const arancelAmount = cifValueNum * selectedCategory.arancelRate;
  const ivaBase = cifValueNum + arancelAmount;
  const ivaAmount = ivaBase * selectedCategory.ivaRate;
  const totalTributes = arancelAmount + ivaAmount;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(value);
  };

  const handleValueChange = (val) => {
    const digits = val.replace(/[^0-9]/g, '');
    const formatted = digits ? parseInt(digits).toLocaleString('es-CO') : '';
    setCargoData({ ...cargoData, cifValue: formatted });
    setErrors({});
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!importerData.importerName) newErrors.importerName = 'Ingresa el nombre del importador como aparece en su RUT.';
    if (!importerData.importerNit) newErrors.importerNit = 'Necesitamos tu NIT para asociar la declaración a tu cuenta.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!cargoData.weight || parseFloat(cargoData.weight) <= 0) {
      newErrors.weight = 'Ingresa el peso de la mercancía en kilogramos.';
    }
    if (cifValueNum <= 0) {
      newErrors.cifValue = 'Ingresa el valor CIF de la mercancía en pesos colombianos.';
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
      }, 2000);
    }
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-file-import"></i> Declaración de Importación
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 4`}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`stepper-step-dot ${step >= s ? 'completed' : ''} ${step === s ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Datos del importador</h3>
          <p className="wizard-subtitle">
            Ingresa los datos de la persona o empresa que trae mercancía del exterior al país. Si usas un agente de aduanas, puedes indicarlo aquí.
          </p>

          <div className="form-grid">
            <Input
              label="Nombre o Razón Social del importador"
              placeholder="Ej: TechStore Colombia SAS"
              value={importerData.importerName}
              onChange={(e) => { setImporterData({ ...importerData, importerName: e.target.value }); setErrors({}); }}
              error={errors.importerName}
              required
            />
            <Input
              label="NIT del importador"
              placeholder="Ej: 901234567-8"
              value={importerData.importerNit}
              onChange={(e) => { setImporterData({ ...importerData, importerNit: e.target.value }); setErrors({}); }}
              error={errors.importerNit}
              required
            />

            <div>
              <label className="form-label">
                Tipo de importación
                <Tooltip text="Importación directa: tú haces el trámite. Con agente: un intermediario autorizado gestiona todo ante la aduana." />
              </label>
              <select
                className="form-select"
                value={importerData.importerType}
                onChange={(e) => setImporterData({ ...importerData, importerType: e.target.value })}
                style={{ height: '43px' }}
              >
                <option value="directo">Importación directa (yo hago el trámite)</option>
                <option value="agente">Con agente de aduanas (un intermediario me ayuda)</option>
              </select>
            </div>

            {importerData.importerType === 'agente' && (
              <Input
                label="Nombre del agente de aduanas"
                placeholder="Ej: Aduanas Express Ltda"
                value={importerData.customsAgent}
                onChange={(e) => setImporterData({ ...importerData, customsAgent: e.target.value })}
              />
            )}
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Aduanas</Button>
            <Button onClick={handleNext}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Mercancía y país de origen</h3>
          <p className="wizard-subtitle">
            Clasifica el tipo de productos que importas y el país de donde vienen. El sistema calculará automáticamente los impuestos que aplican.
          </p>

          <div className="form-grid">
            <div>
              <label className="form-label">
                Categoría de la mercancía
                <Tooltip text="Selecciona la categoría que mejor describa tus productos. Cada una tiene un arancel diferente definido por la ley colombiana." />
              </label>
              <select
                className="form-select"
                value={cargoData.category}
                onChange={(e) => setCargoData({ ...cargoData, category: e.target.value })}
                style={{ height: '43px' }}
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">
                País de origen
                <Tooltip text="El país donde fueron fabricados o producidos los bienes que importas." />
              </label>
              <select
                className="form-select"
                value={cargoData.originCountry}
                onChange={(e) => setCargoData({ ...cargoData, originCountry: e.target.value })}
                style={{ height: '43px' }}
              >
                {Object.entries(countries).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">
                Peso neto total (Kilogramos)
                <Tooltip text="Peso real de la mercancía sin incluir empaques o pallets de transporte." />
              </label>
              <Input
                type="number"
                placeholder="Ej: 250"
                value={cargoData.weight}
                onChange={(e) => { setCargoData({ ...cargoData, weight: e.target.value }); setErrors({}); }}
                error={errors.weight}
                required
              />
            </div>

            <div>
              <label className="form-label">
                Valor CIF en Pesos Colombianos (COP)
                <Tooltip text="CIF = Costo del producto + Seguro + Flete marítimo/aéreo hasta Colombia. Es el valor total puesto en el puerto colombiano." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $45.000.000"
                value={cargoData.cifValue}
                onChange={(e) => handleValueChange(e.target.value)}
              />
              {errors.cifValue && <span style={{ color: 'red', fontSize: '11px' }}>{errors.cifValue}</span>}
            </div>
          </div>

          <div style={{ marginTop: '16px', background: '#f0f4f8', padding: '10px 14px', borderRadius: '8px', fontSize: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
            <strong>Partida arancelaria asignada:</strong> {selectedCategory.arancel} — {selectedCategory.name}
            <br />
            <span style={{ color: 'var(--text-muted)' }}>Arancel: {(selectedCategory.arancelRate * 100)}% · IVA: {(selectedCategory.ivaRate * 100)}%</span>
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
            <label className="form-label">Descripción detallada de la mercancía (opcional)</label>
            <textarea
              className="form-input"
              rows="2"
              placeholder="Ej: 50 laptops marca HP modelo Pavilion 15, con cargadores y manuales..."
              value={cargoData.description}
              onChange={(e) => setCargoData({ ...cargoData, description: e.target.value })}
              style={{ resize: 'vertical', minHeight: '60px' }}
            />
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Ver Liquidación <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Liquidación de tributos de importación</h3>
          <p className="wizard-subtitle">
            Este es el cálculo estimado de los impuestos que debes pagar para nacionalizar tu mercancía. Revisa el detalle antes de confirmar.
          </p>

          <div style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', fontSize: '0.8125rem', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Resumen de la importación:
            </h4>
            <div style={{ marginBottom: '6px' }}><strong>Importador:</strong> {importerData.importerName} (NIT {importerData.importerNit})</div>
            <div style={{ marginBottom: '6px' }}><strong>Origen:</strong> {countries[cargoData.originCountry]}</div>
            <div style={{ marginBottom: '6px' }}><strong>Mercancía:</strong> {selectedCategory.name}</div>
            <div style={{ marginBottom: '6px' }}><strong>Peso:</strong> {cargoData.weight} Kg</div>
            <div><strong>Valor CIF declarado:</strong> {formatCurrency(cifValueNum)}</div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1.5px dashed var(--primary-light)', borderRadius: '12px', padding: '20px', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 16px 0', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>
              <i className="fas fa-calculator" style={{ marginRight: '6px' }}></i> Desglose de tributos:
            </h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e8edf5' }}>
              <span>
                Valor CIF (base de cálculo)
                <Tooltip text="Costo + Seguro + Flete. Es el precio total de la mercancía puesta en puerto colombiano." />
              </span>
              <strong>{formatCurrency(cifValueNum)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e8edf5' }}>
              <span>
                Arancel de aduana ({(selectedCategory.arancelRate * 100)}%)
                <Tooltip text="Es el impuesto que cobra Colombia por permitir el ingreso de mercancías extranjeras. Varía según el producto." />
              </span>
              <strong style={{ color: selectedCategory.arancelRate > 0 ? '#cc7700' : 'var(--secondary)' }}>
                {selectedCategory.arancelRate > 0 ? formatCurrency(arancelAmount) : '$0 (Exento)'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #e8edf5' }}>
              <span>
                IVA sobre importación ({(selectedCategory.ivaRate * 100)}%)
                <Tooltip text="Se calcula sobre el Valor CIF + Arancel. Es el mismo IVA que se cobra en compras nacionales." />
              </span>
              <strong style={{ color: '#cc7700' }}>{formatCurrency(ivaAmount)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, paddingTop: '4px' }}>
              <span style={{ color: 'var(--primary-dark)' }}>Total de tributos a pagar:</span>
              <span style={{ color: 'var(--primary)' }}>{formatCurrency(totalTributes)}</span>
            </div>
          </div>

          {selectedCategory.arancelRate === 0 && (
            <div style={{ marginTop: '12px', padding: '10px 14px', background: '#f0faf5', borderRadius: '8px', fontSize: '0.75rem', color: '#007a4d', borderLeft: '4px solid #007a4d' }}>
              <i className="fas fa-circle-check"></i> <strong>Buena noticia:</strong> Esta categoría de productos tiene arancel del 0% en Colombia. Solo debes pagar el IVA de importación.
            </div>
          )}

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? 'Radicando declaración...' : 'Confirmar y Radicar Declaración'}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Declaración de Importación Radicada!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
            Tu declaración fue procesada exitosamente. La mercancía queda habilitada para levante aduanero una vez confirmes el pago de los tributos liquidados.
          </p>

          <div style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Datos de la declaración:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Número de Declaración:</strong> DIM-2026-IMP-{Math.floor(Math.random() * 90000 + 10000)}</div>
            <div style={{ marginBottom: '8px' }}><strong>Importador:</strong> {importerData.importerName}</div>
            <div style={{ marginBottom: '8px' }}><strong>Mercancía:</strong> {selectedCategory.name}</div>
            <div style={{ marginBottom: '8px' }}><strong>Total tributos liquidados:</strong> {formatCurrency(totalTributes)}</div>
            <div style={{ marginBottom: '8px' }}><strong>Estado:</strong> <span style={{ color: '#cc7700', fontWeight: 700 }}>Pendiente de pago</span></div>
            <div style={{ marginTop: '12px', color: '#0066cc', background: '#e6f7ff', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
              <i className="fas fa-circle-info"></i> Una vez realices el pago de los tributos mediante PSE o en bancos autorizados, el sistema MUISCA autorizará el levante y podrás retirar la mercancía del depósito aduanero.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => alert('Redirigiendo a pagos en línea (PSE) para pagar tributos... (Simulado)')}>
              <i className="fas fa-credit-card"></i> Pagar Tributos (PSE)
            </button>
            <button className="btn-primary" onClick={() => alert('Descargando declaración de importación en PDF... (Simulado)')}>
              <i className="fas fa-file-arrow-down"></i> Descargar Declaración
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Volver a Aduanas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
