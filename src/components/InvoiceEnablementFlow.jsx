import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function InvoiceEnablementFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [identityData, setIdentityData] = useState({
    nit: '',
    businessName: '',
    businessType: 'persona_juridica',
    email: ''
  });
  const [setupData, setSetupData] = useState({
    softwareProvider: 'gratuito_dian',
    prefixRequest: 'SETT',
    rangeFrom: '1',
    rangeTo: '5000',
    testMode: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!identityData.nit) newErrors.nit = 'Ingresa tu número de NIT para verificar tu identidad tributaria.';
    if (!identityData.businessName) newErrors.businessName = 'Escribe el nombre como aparece en tu RUT.';
    if (!identityData.email) newErrors.email = 'Necesitamos un correo para enviarte la resolución de habilitación.';
    else if (!/\S+@\S+\.\S+/.test(identityData.email)) newErrors.email = 'Verifica el formato del correo. Ejemplo: tucorreo@empresa.com';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
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
          <i className="fas fa-file-invoice"></i> Habilitación como Facturador Electrónico
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 4`}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`stepper-step-dot ${step >= s ? 'completed' : ''} ${step === s ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Verificación de tu identidad tributaria</h3>
          <p className="wizard-subtitle">
            Antes de habilitarte, necesitamos confirmar tus datos ante la DIAN. Esto garantiza que las facturas que emitas tengan respaldo legal.
          </p>

          <div className="form-grid">
            <div>
              <label className="form-label">
                NIT o Cédula de Ciudadanía
                <Tooltip text="Si eres persona natural, usa tu cédula. Si eres empresa, ingresa el NIT completo con dígito de verificación." />
              </label>
              <Input
                placeholder="Ej: 900123456-7 o 1.098.765.432"
                value={identityData.nit}
                onChange={(e) => { setIdentityData({ ...identityData, nit: e.target.value }); setErrors({}); }}
                error={errors.nit}
                required
              />
            </div>

            <div>
              <label className="form-label">
                Tipo de contribuyente
                <Tooltip text="Selecciona cómo estás inscrito en el RUT: como persona natural o como empresa." />
              </label>
              <select
                className="form-select"
                value={identityData.businessType}
                onChange={(e) => setIdentityData({ ...identityData, businessType: e.target.value })}
                style={{ height: '43px' }}
              >
                <option value="persona_natural">Persona Natural (Cédula)</option>
                <option value="persona_juridica">Persona Jurídica (Empresa/NIT)</option>
              </select>
            </div>

            <Input
              label="Nombre o Razón Social (como aparece en tu RUT)"
              placeholder="Ej: Panadería El Trigo Dorado SAS"
              value={identityData.businessName}
              onChange={(e) => { setIdentityData({ ...identityData, businessName: e.target.value }); setErrors({}); }}
              error={errors.businessName}
              required
            />

            <Input
              label="Correo electrónico principal"
              type="email"
              placeholder="Ej: contacto@miempresa.com"
              value={identityData.email}
              onChange={(e) => { setIdentityData({ ...identityData, email: e.target.value }); setErrors({}); }}
              error={errors.email}
              required
            />
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a Facturación</Button>
            <Button onClick={handleNext}>Continuar <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Configuración de tu facturación</h3>
          <p className="wizard-subtitle">
            Elige cómo quieres emitir tus facturas electrónicas. Si no tienes un software propio, la DIAN te ofrece una herramienta gratuita.
          </p>

          <div className="option-select-grid">
            <button
              className={`option-select-card ${setupData.softwareProvider === 'gratuito_dian' ? 'selected' : ''}`}
              onClick={() => setSetupData({ ...setupData, softwareProvider: 'gratuito_dian' })}
            >
              <h4><i className="fas fa-gift" style={{ color: 'var(--secondary)', marginRight: '8px' }}></i>Herramienta Gratuita DIAN</h4>
              <p>Ideal para pequeños negocios. No necesitas instalar nada, funciona desde el navegador.</p>
            </button>

            <button
              className={`option-select-card ${setupData.softwareProvider === 'propio' ? 'selected' : ''}`}
              onClick={() => setSetupData({ ...setupData, softwareProvider: 'propio' })}
            >
              <h4><i className="fas fa-laptop-code" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>Software Propio o de Terceros</h4>
              <p>Para empresas que ya usan sistemas contables como Siigo, Alegra, World Office, etc.</p>
            </button>
          </div>

          <div className="form-grid" style={{ marginTop: '16px' }}>
            <div>
              <label className="form-label">
                Prefijo de numeración solicitado
                <Tooltip text="El prefijo aparece antes del número en cada factura (ej: SETT001). Te ayuda a organizar grupos de facturas." />
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej: SETT"
                value={setupData.prefixRequest}
                onChange={(e) => setSetupData({ ...setupData, prefixRequest: e.target.value.toUpperCase() })}
              />
            </div>

            <div>
              <label className="form-label">
                Rango de numeración autorizado
                <Tooltip text="Cantidad de facturas que puedes emitir con este prefijo. Puedes solicitar más rangos después." />
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Desde"
                  value={setupData.rangeFrom}
                  onChange={(e) => setSetupData({ ...setupData, rangeFrom: e.target.value })}
                  style={{ width: '50%' }}
                />
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>a</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Hasta"
                  value={setupData.rangeTo}
                  onChange={(e) => setSetupData({ ...setupData, rangeTo: e.target.value })}
                  style={{ width: '50%' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#f0f4f8', borderRadius: '8px' }}>
            <input
              type="checkbox"
              id="testMode"
              checked={setupData.testMode}
              onChange={(e) => setSetupData({ ...setupData, testMode: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--secondary)' }}
            />
            <label htmlFor="testMode" style={{ fontSize: '0.8125rem', color: 'var(--text-main)', cursor: 'pointer' }}>
              <strong>Iniciar en modo de pruebas</strong> — Te permite emitir facturas de prueba sin valor legal para verificar que todo funcione correctamente.
            </label>
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Revisar y Confirmar <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Confirmación de habilitación</h3>
          <p className="wizard-subtitle">
            Revisa el resumen de tu solicitud antes de enviarla. Una vez aprobada, podrás emitir facturas electrónicas válidas ante la DIAN.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Resumen de solicitud:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Solicitante:</strong> {identityData.businessName}</div>
            <div style={{ marginBottom: '8px' }}><strong>NIT/CC:</strong> {identityData.nit}</div>
            <div style={{ marginBottom: '8px' }}><strong>Tipo:</strong> {identityData.businessType === 'persona_juridica' ? 'Persona Jurídica' : 'Persona Natural'}</div>
            <div style={{ marginBottom: '8px' }}><strong>Correo:</strong> {identityData.email}</div>
            <div style={{ marginBottom: '8px' }}><strong>Software:</strong> {setupData.softwareProvider === 'gratuito_dian' ? 'Herramienta Gratuita DIAN' : 'Software Propio'}</div>
            <div style={{ marginBottom: '8px' }}><strong>Prefijo:</strong> {setupData.prefixRequest}</div>
            <div><strong>Rango:</strong> {setupData.rangeFrom} a {setupData.rangeTo}</div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px', background: '#e6f7ff', borderRadius: '8px', fontSize: '0.75rem', color: '#0066cc', borderLeft: '4px solid #0066cc' }}>
            <i className="fas fa-circle-info"></i> Al enviar esta solicitud, la DIAN verificará tu estado tributario y habilitará tu cuenta para emitir facturas electrónicas en un plazo máximo de 48 horas.
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? 'Procesando solicitud...' : 'Enviar Solicitud de Habilitación'}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Habilitación Aprobada Exitosamente!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
            Ya estás autorizado para emitir facturas electrónicas válidas ante la DIAN. Hemos enviado la resolución de habilitación a tu correo electrónico.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Datos de tu habilitación:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Resolución DIAN:</strong> DIAN-FE-2026-{Math.floor(Math.random() * 90000 + 10000)}</div>
            <div style={{ marginBottom: '8px' }}><strong>Facturador:</strong> {identityData.businessName}</div>
            <div style={{ marginBottom: '8px' }}><strong>Prefijo autorizado:</strong> {setupData.prefixRequest}</div>
            <div style={{ marginBottom: '8px' }}><strong>Rango de numeración:</strong> {setupData.prefixRequest}{setupData.rangeFrom} a {setupData.prefixRequest}{setupData.rangeTo}</div>
            <div style={{ marginBottom: '8px' }}><strong>Modo:</strong> {setupData.testMode ? 'Pruebas (puedes pasar a producción cuando desees)' : 'Producción'}</div>
            <div style={{ marginTop: '12px', color: '#007a4d', background: '#f0faf5', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
              <i className="fas fa-envelope"></i> Enviamos la resolución completa a: <strong>{identityData.email}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => alert('Descargando resolución de habilitación en PDF... (Simulado)')}>
              <i className="fas fa-file-arrow-down"></i> Descargar Resolución
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Volver a Facturación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
