import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function RutUpdateFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: 'CC',
    idNumber: '',
    email: '',
    updateType: '',
    address: '',
    city: 'Cali',
    phone: '',
    economicActivity: '8510',
    verificationCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.idNumber) {
      newErrors.idNumber = 'Por favor, ingresa tu número de documento.';
    } else if (!/^[0-9]{5,12}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'El número de documento debe contener solo dígitos (de 5 a 12).';
    }
    
    if (!formData.email) {
      newErrors.email = 'Por favor, ingresa tu correo electrónico.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato de correo no es válido (ejemplo: nombre@correo.com).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.updateType === 'contacto') {
      if (!formData.address) newErrors.address = 'La dirección de residencia es obligatoria.';
      if (!formData.phone) {
        newErrors.phone = 'El número de teléfono es obligatorio.';
      } else if (!/^[0-9]{10}$/.test(formData.phone)) {
        newErrors.phone = 'Ingresa un número celular válido de 10 dígitos.';
      }
    } else if (formData.updateType === 'actividad') {
      if (!formData.economicActivity) newErrors.economicActivity = 'Selecciona tu actividad económica principal.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (!formData.updateType) {
        setErrors({ updateType: 'Debes seleccionar qué tipo de información deseas actualizar.' });
        return;
      }
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      if (validateStep3()) {
        // Enviar un código de verificación simulado al correo
        setStep(4);
      }
    }
  };

  const handleSign = () => {
    if (!formData.verificationCode) {
      setErrors({ verificationCode: 'Por favor, ingresa el código de 6 dígitos que te enviamos.' });
      return;
    }
    if (formData.verificationCode !== '123456') {
      setErrors({ verificationCode: 'El código ingresado es incorrecto. Para este prototipo, usa el código de ejemplo: 123456.' });
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 1500);
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-id-card"></i> Actualización del RUT
        </div>
        <div className="stepper-steps" aria-label={`Paso ${step} de 5`}>
          <div className={`stepper-step-dot ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 4 ? 'completed' : ''} ${step === 4 ? 'active' : ''}`}></div>
          <div className={`stepper-step-dot ${step >= 5 ? 'completed' : ''} ${step === 5 ? 'active' : ''}`}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Identifícate para actualizar tus datos</h3>
          <p className="wizard-subtitle">
            Necesitamos confirmar quién eres antes de realizar cualquier cambio en tu Registro Único Tributario (RUT).
          </p>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">
              Tipo de documento
              <Tooltip text="Selecciona el tipo de documento con el que te registraste en la DIAN." />
            </label>
            <select 
              className="form-select"
              value={formData.idType}
              onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="NIT">NIT (Empresas o Personas con negocios)</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <Input
            label="Número de identificación"
            placeholder="Ej: 1087654321"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
            error={errors.idNumber}
            helperText="Escribe tu número de cédula o NIT sin puntos ni guiones."
            required
          />

          <div style={{ marginTop: '16px' }}>
            <label className="form-label" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Correo electrónico registrado
              <Tooltip text="Usa el correo electrónico donde recibes las notificaciones de la DIAN. Te enviaremos un código de seguridad." />
            </label>
            <Input
              placeholder="Ej: ciudadano@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Volver a RUT</Button>
            <Button onClick={handleNext}>
              Siguiente paso <i className="fas fa-arrow-right"></i>
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">¿Qué información deseas cambiar?</h3>
          <p className="wizard-subtitle">
            Selecciona la opción que mejor se adapte al cambio que necesitas realizar.
          </p>

          {errors.updateType && (
            <div className="error-message" role="alert" style={{ marginBottom: '16px' }}>
              <i className="fas fa-exclamation-circle"></i> {errors.updateType}
            </div>
          )}

          <div className="option-select-grid">
            <div 
              className={`option-select-card ${formData.updateType === 'contacto' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, updateType: 'contacto' })}
            >
              <h4><i className="fas fa-map-marker-alt"></i> Datos de contacto</h4>
              <p>Dirección de tu casa o local, número de celular, teléfono fijo o dirección de correspondencia.</p>
            </div>

            <div 
              className={`option-select-card ${formData.updateType === 'actividad' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, updateType: 'actividad' })}
            >
              <h4><i className="fas fa-briefcase"></i> Actividad económica</h4>
              <p>Cambia el código que indica de dónde provienen tus ingresos principales (ej. docente, comerciante, etc.).</p>
            </div>

            <div 
              className={`option-select-card ${formData.updateType === 'responsabilidades' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, updateType: 'responsabilidades' })}
            >
              <h4><i className="fas fa-gavel"></i> Responsabilidades de impuestos</h4>
              <p>Si pasas a ser declarante de IVA, régimen simplificado o requieres inscribir obligaciones.</p>
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
          <h3 className="wizard-title">Ingresa la nueva información</h3>
          <p className="wizard-subtitle">
            Llena únicamente los campos que vas a modificar. Los demás permanecerán igual en el sistema de la DIAN.
          </p>

          {formData.updateType === 'contacto' && (
            <div className="form-grid">
              <div>
                <label className="form-label">
                  Nueva dirección de residencia/negocio
                  <Tooltip text="Escribe la dirección física completa actual de tu domicilio principal." />
                </label>
                <Input
                  placeholder="Ej: Calle 5 # 12-34 Apto 402"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  error={errors.address}
                  required
                />
              </div>

              <div>
                <label className="form-label">
                  Ciudad o municipio
                  <Tooltip text="Ciudad donde reside o tiene ubicado su establecimiento principal." />
                </label>
                <select 
                  className="form-select"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="Cali">Cali</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Medellín">Medellín</option>
                  <option value="Barranquilla">Barranquilla</option>
                  <option value="Bucaramanga">Bucaramanga</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">
                  Nuevo número celular
                  <Tooltip text="Número de 10 dígitos donde te contactará la DIAN en caso de trámites." />
                </label>
                <Input
                  placeholder="Ej: 3123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                  required
                />
              </div>
            </div>
          )}

          {formData.updateType === 'actividad' && (
            <div>
              <label className="form-label">
                Nueva actividad económica principal
                <Tooltip text="Clasifica tu actividad según el trabajo que realizas. La DIAN usa estos códigos para saber cómo tributas." />
              </label>
              <select 
                className="form-select"
                value={formData.economicActivity}
                onChange={(e) => setFormData({ ...formData, economicActivity: e.target.value })}
                style={{ marginBottom: '16px' }}
              >
                <option value="8510">Educación (Profesores, docentes independientes)</option>
                <option value="4711">Comercio al por menor (Tiendas, supermercados, locales)</option>
                <option value="6201">Desarrollo de software y sistemas informáticos</option>
                <option value="6910">Servicios jurídicos (Abogados, consultores legales)</option>
                <option value="9000">Actividades artísticas y creativas (Artistas, músicos)</option>
                <option value="0010">Pensionado o jubilado</option>
              </select>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Si eres asalariado común sin negocio o profesión independiente, tu código habitual es Actividad de Asalariado.
              </p>
            </div>
          )}

          {formData.updateType === 'responsabilidades' && (
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>
                Para el prototipo transaccional simplificado, tus responsabilidades tributarias sugeridas se configuran automáticamente según tus ingresos del simulador.
              </p>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e8edf5', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <i className="fas fa-circle-info" style={{ color: 'var(--primary)', fontSize: '1.25rem' }}></i>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-main)' }}>
                  Actualmente tienes registrada la responsabilidad: <strong>Régimen Simplificado (No responsable de IVA)</strong>.
                </span>
              </div>
            </div>
          )}

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Continuar con la firma <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Firmar digitalmente tu actualización</h3>
          <p className="wizard-subtitle">
            Para validar que eres tú quien hace el cambio, enviamos un código de seguridad al correo <strong>{formData.email}</strong>.
          </p>

          <div style={{ background: '#eef6f0', border: '1px solid var(--secondary)', color: '#007a4d', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.8125rem', fontWeight: 600 }}>
            <i className="fas fa-envelope-open-text"></i> CÓDIGO DE PRUEBA SIMULADO: <strong>123456</strong>
          </div>

          <label className="form-label">
            Código de seguridad recibido
            <Tooltip text="Ingresa el código de 6 números que recibiste. Esto equivale a tu firma manuscrita." />
          </label>
          <Input
            placeholder="Ej: 123456"
            value={formData.verificationCode}
            onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
            error={errors.verificationCode}
            required
          />

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(3)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleSign} disabled={isSubmitting}>
              {isSubmitting ? 'Verificando firma...' : 'Firmar y Guardar Cambios'}
            </Button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Tu RUT ha sido actualizado con éxito!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '450px', margin: '0 auto 24px auto' }}>
            Hemos registrado los cambios en nuestro sistema nacional de la DIAN de inmediato. No tienes que hacer nada más.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '10px', padding: '16px', maxWidth: '400px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <div style={{ marginBottom: '8px' }}><strong>Número de radicado:</strong> 109384756382</div>
            <div style={{ marginBottom: '8px' }}><strong>Fecha del trámite:</strong> {new Date().toLocaleDateString('es-CO')}</div>
            <div><strong>Detalle:</strong> Actualización voluntaria de {formData.updateType === 'contacto' ? 'Información de Contacto' : 'Actividad Económica'}.</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => alert('Simulando descarga de PDF de RUT...')}>
              <i className="fas fa-file-pdf"></i> Descargar Copia del RUT
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
