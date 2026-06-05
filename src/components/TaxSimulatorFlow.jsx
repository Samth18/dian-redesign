import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function TaxSimulatorFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [incomeData, setIncomeData] = useState({
    salaries: '',
    freelance: '',
    rentals: '',
    others: ''
  });
  const [deductionsData, setDeductionsData] = useState({
    prepaidHealth: '',
    housingInterest: '',
    hasDependents: 'no',
    pensionSavings: ''
  });
  const [errors, setErrors] = useState({});

  // Calculations
  const parseNum = (val) => parseFloat(val.replace(/[^0-9]/g, '')) || 0;

  const totalIncome = parseNum(incomeData.salaries) + 
                      parseNum(incomeData.freelance) + 
                      parseNum(incomeData.rentals) + 
                      parseNum(incomeData.others);

  // Compute deductions simply
  let totalDeductions = parseNum(deductionsData.prepaidHealth) + 
                        parseNum(deductionsData.housingInterest) + 
                        parseNum(deductionsData.pensionSavings);

  // Dependents deduction: 10% of total income up to a reasonable cap
  if (deductionsData.hasDependents === 'si') {
    totalDeductions += totalIncome * 0.1;
  }

  // 40% cap rule for Colombia tax
  const maxAllowedDeductions = totalIncome * 0.4;
  const finalDeductions = Math.min(totalDeductions, maxAllowedDeductions);
  const taxableBase = Math.max(0, totalIncome - finalDeductions);

  // Tax brackets estimation
  let estimatedTax = 0;
  // Let's assume income tax starts above 47,000,000 COP (approx 1090 UVT)
  const taxThreshold = 47000000;
  if (taxableBase > taxThreshold) {
    // 19% rate on the excess
    estimatedTax = (taxableBase - taxThreshold) * 0.19;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleNext = () => {
    if (step === 1) {
      if (totalIncome === 0) {
        setErrors({ general: 'Por favor, ingresa al menos un tipo de ingreso. Si no tuviste ingresos, escribe 0 en Otros ingresos.' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleInputChange = (field, value, isIncome = true) => {
    // Format numbers as they type
    const digitsOnly = value.replace(/[^0-9]/g, '');
    const formatted = digitsOnly ? parseInt(digitsOnly).toLocaleString('es-CO') : '';
    
    if (isIncome) {
      setIncomeData({ ...incomeData, [field]: formatted });
    } else {
      setDeductionsData({ ...deductionsData, [field]: formatted });
    }
    setErrors({});
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-calculator"></i> Simulador de Impuesto de Renta
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 3`}>
          <div className={`stepper-step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}></div>
        </div>
      </div>

      {errors.general && (
        <div className="error-message" role="alert" style={{ marginBottom: '16px' }}>
          <i className="fas fa-exclamation-circle"></i> {errors.general}
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Tus ingresos durante el año pasado</h3>
          <p className="wizard-subtitle">
            Ingresa los valores aproximados de dinero que recibiste. No te preocupes por los centavos.
          </p>

          <div className="form-grid">
            <div>
              <label className="form-label">
                Ingresos por salarios (Trabajo fijo)
                <Tooltip text="Suma los salarios mensuales que te pagó tu empleador, incluyendo primas o cesantías." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $30.000.000"
                value={incomeData.salaries}
                onChange={(e) => handleInputChange('salaries', e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">
                Ingresos independientes (Honorarios)
                <Tooltip text="Dinero recibido por contratos de prestación de servicios, asesorías o trabajos independientes." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $15.000.000"
                value={incomeData.freelance}
                onChange={(e) => handleInputChange('freelance', e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">
                Ingresos por arriendos de inmuebles
                <Tooltip text="Dinero recibido en el año por alquilar locales, apartamentos, lotes o casas." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $8.000.000"
                value={incomeData.rentals}
                onChange={(e) => handleInputChange('rentals', e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">
                Otros ingresos (Ventas, pensiones, rifas)
                <Tooltip text="Cualquier otra ganancia de dinero como pensiones recibidas, venta de algún carro, etc." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $2.000.000"
                value={incomeData.others}
                onChange={(e) => handleInputChange('others', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', background: '#f0f4f8', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Suma total de tus ingresos:</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{formatCurrency(totalIncome)}</strong>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Impuestos</Button>
            <Button onClick={handleNext}>Continuar <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Deducciones (Gastos que restan tus impuestos)</h3>
          <p className="wizard-subtitle">
            La ley colombiana te permite restar ciertos gastos a tus ingresos para que tu base gravable sea menor.
          </p>

          <div className="form-grid">
            <div>
              <label className="form-label">
                Aportes a salud privada (Prepagada)
                <Tooltip text="Pagos de salud medicina prepagada o pólizas de salud durante el año." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $2.400.000"
                value={deductionsData.prepaidHealth}
                onChange={(e) => handleInputChange('prepaidHealth', e.target.value, false)}
              />
            </div>

            <div>
              <label className="form-label">
                Intereses de crédito hipotecario (Vivienda)
                <Tooltip text="Suma de intereses pagados por tu crédito de compra de casa o leasing habitacional." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $4.500.000"
                value={deductionsData.housingInterest}
                onChange={(e) => handleInputChange('housingInterest', e.target.value, false)}
              />
            </div>

            <div>
              <label className="form-label">
                Ahorros voluntarios en pensiones o AFC
                <Tooltip text="Dinero que hayas guardado voluntariamente en fondos de pensiones o cuentas de ahorro AFC." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: $3.000.000"
                value={deductionsData.pensionSavings}
                onChange={(e) => handleInputChange('pensionSavings', e.target.value, false)}
              />
            </div>

            <div>
              <label className="form-label">
                ¿Tienes personas que dependan de ti?
                <Tooltip text="Aplica si tienes hijos menores de 18 años, cónyuge o padres sin ingresos económicos que dependan de ti." />
              </label>
              <select
                className="form-select"
                value={deductionsData.hasDependents}
                onChange={(e) => setDeductionsData({ ...deductionsData, hasDependents: e.target.value })}
                style={{ height: '43px' }}
              >
                <option value="no">No tengo dependientes a cargo</option>
                <option value="si">Sí, tengo personas a cargo (Ahorra 10% de renta)</option>
              </select>
            </div>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Calcular mi Impuesto <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Estimación de tu Declaración de Renta</h3>
          <p className="wizard-subtitle">
            Basado en la información ingresada, este es el resultado estimado para tu declaración.
          </p>

          <div className="tax-result-panel">
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Impuesto de Renta Estimado a Pagar:</div>
            <div className="tax-result-value">
              {estimatedTax > 0 ? formatCurrency(estimatedTax) : '$0 (No debes pagar impuesto)'}
            </div>
            {estimatedTax > 0 ? (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '5px 0 0 0' }}>
                Tu base de ingresos gravables supera el tope mínimo. Puedes reducir esto aplicando más deducciones formales.
              </p>
            ) : (
              <p style={{ fontSize: '0.75rem', color: '#007a4d', fontWeight: 600, margin: '5px 0 0 0' }}>
                ¡Excelente! Tus deducciones y nivel de ingresos te ubican por debajo del límite de cobro.
              </p>
            )}

            <div className="tax-meter">
              <div 
                className="tax-meter-fill" 
                style={{ width: `${Math.min(100, (taxableBase / (taxThreshold * 2)) * 100)}%` }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>Límite libre de impuesto: {formatCurrency(taxThreshold)}</span>
              <span>Tu Base Gravable: {formatCurrency(taxableBase)}</span>
            </div>
          </div>

          <h4 style={{ marginTop: '24px', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>Detalle del Cálculo Simplificado:</h4>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e8edf5', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>(+) Ingresos Totales Recibidos:</span>
              <strong>{formatCurrency(totalIncome)}</strong>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>(-) Deducciones Aplicadas:</span>
              <span style={{ color: '#ef4444' }}>- {formatCurrency(finalDeductions)}</span>
            </div>
            {totalDeductions > maxAllowedDeductions && (
              <div style={{ fontSize: '11px', color: '#b25e00', background: '#fff9e6', padding: '6px 10px', borderRadius: '4px', marginBottom: '10px' }}>
                <i className="fas fa-circle-exclamation"></i> <strong>Aviso legal:</strong> Tus deducciones ({formatCurrency(totalDeductions)}) superaban el límite del 40% permitido por ley. El sistema las ajustó a {formatCurrency(finalDeductions)}.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e8edf5', paddingTop: '8px', marginBottom: '8px' }}>
              <span>(=) Base Gravable (Monto sobre el que se calculan impuestos):</span>
              <strong>{formatCurrency(taxableBase)}</strong>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Impuesto estimado:</span>
              <strong style={{ color: estimatedTax > 0 ? 'var(--text-main)' : 'var(--secondary)' }}>
                {estimatedTax > 0 ? formatCurrency(estimatedTax) : '$0'}
              </strong>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: '#eef2f8', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <i className="fas fa-circle-info"></i> Recuerda que esta simulación es puramente educativa. La DIAN pondrá a tu disposición un borrador de <strong>Declaración Sugerida</strong> con datos reales reportados por tus bancos y empleadores para facilitarte el trámite real.
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" onClick={() => alert('Descargando PDF del simulador... (Simulado)')}>
                <i className="fas fa-download"></i> Descargar Simulación
              </button>
              <button className="btn-primary" onClick={() => alert('Redirigiendo al borrador oficial de declaración... (Simulado)')}>
                Ir a Declarar Renta <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
