import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function OnlinePaymentFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [searchData, setSearchData] = useState({
    idNumber: '',
    taxType: 'renta'
  });
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('pse');
  const [pseData, setPseData] = useState({
    bank: 'bancolombia',
    pseEmail: '',
    bankUser: '',
    bankPass: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock debts
  const mockDebts = {
    renta: {
      name: 'Impuesto sobre la Renta (Persona Natural) - Año 2025',
      amount: 320000,
      code: 'Formulario 210',
      dueDate: '15 de Julio de 2026'
    },
    iva: {
      name: 'Impuesto a las Ventas (IVA) - Bimestre 1, 2026',
      amount: 180000,
      code: 'Formulario 300',
      dueDate: '20 de Julio de 2026'
    }
  };

  const handleSearch = () => {
    if (!searchData.idNumber) {
      setErrors({ idNumber: 'Ingresa tu número de identificación para consultar deudas.' });
      return;
    }
    if (!/^[0-9]{5,12}$/.test(searchData.idNumber)) {
      setErrors({ idNumber: 'El número de identificación debe contener solo números.' });
      return;
    }
    setErrors({});
    setSelectedDebt(mockDebts[searchData.taxType]);
  };

  const handleNextToPse = () => {
    if (!selectedDebt) {
      setErrors({ general: 'Debes consultar y tener un impuesto seleccionado para pagar.' });
      return;
    }
    setStep(3); // Go to PSE Sim
  };

  const handlePseSubmit = () => {
    if (!pseData.pseEmail) {
      setErrors({ pseEmail: 'El correo electrónico registrado en PSE es obligatorio.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(pseData.pseEmail)) {
      setErrors({ pseEmail: 'Ingresa un correo electrónico de PSE válido.' });
      return;
    }
    setErrors({});
    setStep(3.5); // Show Mock Bank Login
  };

  const handleBankPayment = () => {
    if (!pseData.bankUser || !pseData.bankPass) {
      setErrors({ bankAuth: 'Por favor, ingresa tu usuario y contraseña bancaria para autorizar la transacción.' });
      return;
    }
    setErrors({});
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success Receipt
    }, 2000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-credit-card"></i> Pagos en Línea (PSE)
        </div>
        <div className="stepper-steps" aria-label={`Paso ${Math.floor(step)} de 4`}>
          <div className={`stepper-step-dot ${step >= 1 ? 'completed' : ''} ${Math.floor(step) === 1 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 2 ? 'completed' : ''} ${Math.floor(step) === 2 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 3 ? 'completed' : ''} ${Math.floor(step) === 3 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 4 ? 'completed' : ''} ${Math.floor(step) === 4 ? 'active' : ''}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Consulta tus deudas con la DIAN</h3>
          <p className="wizard-subtitle">
            Ingresa tu identificación para buscar los impuestos pendientes de pago en nuestro sistema.
          </p>

          <div className="form-grid">
            <Input
              label="Número de identificación (Cédula o NIT)"
              placeholder="Ej: 1087654321"
              value={searchData.idNumber}
              onChange={(e) => {
                setSearchData({ ...searchData, idNumber: e.target.value });
                setErrors({});
              }}
              error={errors.idNumber}
              required
            />

            <div className="form-group">
              <label className="form-label">
                Impuesto a consultar
                <Tooltip text="Selecciona la obligación específica que deseas pagar." />
              </label>
              <select
                className="form-select"
                value={searchData.taxType}
                onChange={(e) => {
                  setSearchData({ ...searchData, taxType: e.target.value });
                  setSelectedDebt(null);
                }}
                style={{ height: '43px' }}
              >
                <option value="renta">Impuesto de Renta (Anual)</option>
                <option value="iva">Impuesto al Valor Agregado (IVA)</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button onClick={handleSearch}>Consultar Obligación</Button>
          </div>

          {selectedDebt && (
            <div className="animate-fade-in" style={{ marginTop: '24px', background: '#f8fafc', border: '2px solid var(--secondary)', borderRadius: '12px', padding: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>
                <i className="fas fa-file-invoice-dollar" style={{ color: 'var(--secondary)' }}></i> Impuesto Pendiente Encontrado:
              </h4>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                <strong>Concepto:</strong> {selectedDebt.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                <strong>Formulario de origen:</strong> {selectedDebt.code}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                <strong>Fecha límite de pago:</strong> {selectedDebt.dueDate}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e8edf5', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total a transferir:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--secondary)' }}>{formatCurrency(selectedDebt.amount)}</strong>
              </div>
            </div>
          )}

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Impuestos</Button>
            <Button onClick={() => selectedDebt ? setStep(2) : handleSearch()} disabled={!selectedDebt}>
              Continuar al Pago <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Elige tu forma de pago</h3>
          <p className="wizard-subtitle">
            Todos nuestros canales cuentan con seguridad de cifrado bancario de extremo a extremo.
          </p>

          <div className="option-select-grid">
            <div 
              className={`option-select-card ${paymentMethod === 'pse' ? 'selected' : ''}`}
              onClick={() => setPaymentMethod('pse')}
            >
              <h4><i className="fas fa-building-columns"></i> PSE (Débito de tu banco)</h4>
              <p>Paga usando tu saldo de cuentas de ahorro o corriente. El dinero se descuenta de inmediato y sin comisiones.</p>
            </div>

            <div 
              className={`option-select-card ${paymentMethod === 'credit' ? 'selected' : ''}`}
              onClick={() => {
                alert('Los pagos con Tarjeta de Crédito no están disponibles en este prototipo. Por favor, selecciona PSE para ver la simulación completa.');
                setPaymentMethod('pse');
              }}
            >
              <h4><i className="fas fa-credit-card"></i> Tarjeta de Crédito</h4>
              <p>Paga con tarjetas Visa, MasterCard o American Express. Sujeto a cuotas y políticas de tu banco.</p>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e8edf5', fontSize: '0.8125rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Valor a pagar:</span>
            <strong>{formatCurrency(selectedDebt?.amount || 0)}</strong>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNextToPse}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <div style={{ background: '#0066cc', color: 'white', padding: '12px 20px', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '0.875rem' }}>PSE · Pagos Seguros en Línea</span>
            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '20px' }}>Simulador Seguro</span>
          </div>
          
          <div style={{ border: '1.5px solid #0066cc', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '20px', background: 'var(--surface)' }}>
            <h3 style={{ fontSize: '0.95rem', margin: '0 0 12px 0', color: 'var(--primary-dark)' }}>Portal del Proveedor de PSE</h3>
            
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Selecciona tu Entidad Financiera (Banco)</label>
              <select
                className="form-select"
                value={pseData.bank}
                onChange={(e) => setPseData({ ...pseData, bank: e.target.value })}
              >
                <option value="bancolombia">Bancolombia (Ahorro/Corriente)</option>
                <option value="davivienda">Davivienda</option>
                <option value="bogota">Banco de Bogotá</option>
                <option value="nequi">Nequi (Monedero digital)</option>
                <option value="daviplata">Daviplata</option>
              </select>
            </div>

            <Input
              label="Correo registrado en PSE"
              placeholder="Ej: tu_correo@pse.com.co"
              value={pseData.pseEmail}
              onChange={(e) => {
                setPseData({ ...pseData, pseEmail: e.target.value });
                setErrors({});
              }}
              error={errors.pseEmail}
              helperText="Si no tienes cuenta en PSE, puedes escribir cualquier correo para esta prueba."
              required
            />

            <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-muted)' }}>
              Al dar clic en Ir al Banco, serás dirigido temporalmente a la interfaz bancaria seleccionada para autorizar el débito.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="secondary" onClick={() => setStep(2)}>Regresar</Button>
              <Button onClick={handlePseSubmit}>Ir al Banco <i className="fas fa-arrow-right"></i></Button>
            </div>
          </div>
        </div>
      )}

      {step === 3.5 && (
        <div className="animate-fade-in">
          <div style={{ background: '#2d6a9f', color: 'white', padding: '12px 20px', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '0.875rem', textTransform: 'uppercase' }}>
              Simulador {pseData.bank.toUpperCase()}
            </span>
            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '20px' }}>Conexión Cifrada</span>
          </div>

          <div style={{ border: '1.5px solid #2d6a9f', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '24px', background: 'var(--surface)' }}>
            <h3 style={{ fontSize: '0.95rem', margin: '0 0 8px 0', color: 'var(--primary-dark)' }}>Autorizar Débito Bancario</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Estás en la simulación de cobro. Ingresa credenciales de prueba para autorizar la transferencia de <strong>{formatCurrency(selectedDebt?.amount || 0)}</strong>.
            </p>

            {errors.bankAuth && (
              <div className="error-message" role="alert" style={{ marginBottom: '16px' }}>
                <i className="fas fa-exclamation-circle"></i> {errors.bankAuth}
              </div>
            )}

            <div className="form-grid">
              <Input
                label="Usuario de la Banca Virtual"
                placeholder="Ej: user123"
                value={pseData.bankUser}
                onChange={(e) => {
                  setPseData({ ...pseData, bankUser: e.target.value });
                  setErrors({});
                }}
                required
              />

              <Input
                label="Contraseña de Internet"
                type="password"
                placeholder="••••••"
                value={pseData.bankPass}
                onChange={(e) => {
                  setPseData({ ...pseData, bankPass: e.target.value });
                  setErrors({});
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <Button variant="secondary" onClick={() => setStep(3)}>Cancelar y Volver</Button>
              <Button onClick={handleBankPayment} disabled={isProcessing}>
                {isProcessing ? 'Procesando transferencia...' : 'Autorizar y Pagar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Tu pago ha sido recibido con éxito!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
            La DIAN ha recibido y validado tu pago. La obligación tributaria ha quedado cancelada en paz y salvo.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Recibo Oficial de Pago:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Impuesto Pagado:</strong> {selectedDebt?.name}</div>
            <div style={{ marginBottom: '8px' }}><strong>Monto Transferido:</strong> {formatCurrency(selectedDebt?.amount || 0)}</div>
            <div style={{ marginBottom: '8px' }}><strong>Entidad Financiera:</strong> {pseData.bank.toUpperCase()} (vía PSE)</div>
            <div style={{ marginBottom: '8px' }}><strong>Número de Aprobación (CUS):</strong> 1092837465</div>
            <div style={{ marginBottom: '8px' }}><strong>Fecha y Hora de Operación:</strong> {new Date().toLocaleString('es-CO')}</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => alert('Descargando comprobante de pago en PDF...')}>
              <i className="fas fa-file-arrow-down"></i> Descargar Comprobante (PDF)
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Volver a Impuestos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
