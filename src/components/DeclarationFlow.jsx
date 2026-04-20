import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';

export function DeclarationFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ id: '', income: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateStep1 = () => {
    if (!formData.id) {
      setErrors({ id: 'Necesitamos tu número de documento para poder continuar.' });
      return false;
    }
    if (!/^[0-9]{8,10}$/.test(formData.id)) {
      setErrors({ id: 'El documento debe contener entre 8 y 10 números, sin puntos ni espacios.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSimulateSubmit = () => {
    if (!formData.income) {
      setErrors({ income: 'Por favor, ingresa el valor de tus ingresos. Si no tuviste ingresos, escribe 0.' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    // Simular un retraso en la red y luego lanzar un error humanizado
    setTimeout(() => {
      // Queremos demostrar cómo se maneja un error. 
      // Si escriben 'error' en el campo, mostraremos un mensaje amigable.
      if (formData.income === 'error') {
        setErrors({ 
          general: 'Tuvimos un problema temporal al conectar con nuestro sistema central. No te preocupes, tus datos están seguros. Por favor, intenta de nuevo en unos minutos.'
        });
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        setSuccess(true);
      }
    }, 1500);
  };

  if (success) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ marginBottom: '1rem', color: 'var(--success)' }}>¡Hemos recibido tu información!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Tu declaración está en proceso de revisión. Te enviaremos un correo cuando esté lista. 
          Gracias por cumplir con el país.
        </p>
        <Button onClick={() => window.location.reload()}>Volver al inicio</Button>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      {/* Indicador de progreso visual */}
      <div className="stepper" aria-label={`Paso ${step} de 2`}>
        <div className={`step ${step >= 1 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}></div>
      </div>

      {errors.general && (
        <div className="error-message" role="alert" style={{ marginBottom: '2rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <strong>Algo salió mal: </strong>
            {errors.general}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-in">
          <h2 style={{ marginBottom: '1.5rem' }}>Empecemos por identificarte</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Para ofrecerte una experiencia personalizada y segura, necesitamos saber quién eres.
          </p>
          
          <Input
            label="Número de identificación"
            placeholder="Ej: 1012345678"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            error={errors.id}
            helperText="Ingresa tu cédula o NIT sin puntos ni guiones."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button onClick={handleNextStep}>
              Continuar con mis datos
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h2 style={{ marginBottom: '1.5rem' }}>Hola, hablemos de tus ingresos</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Queremos hacer tu declaración lo más sencilla posible. Por favor, ingresa tus ingresos totales del año pasado.
            (Escribe "error" para ver cómo manejamos las fallas).
          </p>
          
          <Input
            label="Ingresos anuales (en pesos colombianos)"
            type="text"
            placeholder="Ej: 50000000"
            value={formData.income}
            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            error={errors.income}
            helperText="No te preocupes por los puntos o comas, nosotros los añadimos."
            required
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <Button variant="secondary" onClick={() => setStep(1)}>
              Volver al paso anterior
            </Button>
            <Button onClick={handleSimulateSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Procesando tu información...' : 'Enviar mi declaración'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
