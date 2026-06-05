import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function AppointmentBookingFlow({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    idType: 'CC',
    idNumber: '',
    email: '',
    phone: '',
    topic: 'rut-inscripcion',
    channel: 'virtual',
    office: 'cali',
    selectedDay: null,
    selectedTime: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Por favor, ingresa tu nombre completo.';
    if (!formData.idNumber) {
      newErrors.idNumber = 'Por favor, ingresa tu número de documento.';
    } else if (!/^[0-9]{5,12}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'El documento debe contener solo números.';
    }
    if (!formData.email) {
      newErrors.email = 'Por favor, ingresa tu correo.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo no válido.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Por favor, ingresa tu teléfono celular.';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Celular de 10 dígitos.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!formData.selectedDay || !formData.selectedTime) {
        setErrors({ dateTime: 'Por favor, selecciona una fecha y una hora para tu cita.' });
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
      }, 1500);
    }
  };

  // Mock Calendar days
  const calendarDays = [
    { num: 8, label: 'Lun', available: true },
    { num: 9, label: 'Mar', available: true },
    { num: 10, label: 'Mié', available: false }, // Ocupado
    { num: 11, label: 'Jue', available: true },
    { num: 12, label: 'Vie', available: true },
    { num: 13, label: 'Sáb', available: false }, // Fin de semana
    { num: 14, label: 'Dom', available: false }
  ];

  const timeSlots = [
    { time: '08:30 a.m.', available: true },
    { time: '10:00 a.m.', available: true },
    { time: '11:30 a.m.', available: false },
    { time: '02:00 p.m.', available: true },
    { time: '03:30 p.m.', available: true }
  ];

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-calendar-check"></i> Agendar Cita
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
          <h3 className="wizard-title">Tus datos personales</h3>
          <p className="wizard-subtitle">
            Ingresa la información básica de la persona que asistirá a la cita.
          </p>

          <Input
            label="Nombre completo"
            placeholder="Ej: María Camila Restrepo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            required
          />

          <div className="form-grid" style={{ marginTop: '16px' }}>
            <div>
              <label className="form-label">Tipo de documento</label>
              <select 
                className="form-select"
                value={formData.idType}
                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="NIT">NIT</option>
              </select>
            </div>
            
            <Input
              label="Número de documento"
              placeholder="Ej: 1087654321"
              value={formData.idNumber}
              onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              error={errors.idNumber}
              required
            />
          </div>

          <div className="form-grid" style={{ marginTop: '16px' }}>
            <Input
              label="Correo electrónico"
              placeholder="Ej: maria@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              helperText="Aquí enviaremos el enlace de videollamada o confirmación."
              required
            />

            <Input
              label="Teléfono celular"
              placeholder="Ej: 3156789012"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              required
            />
          </div>

          <div className="wizard-actions">
            <Button variant="secondary" onClick={onBack}>Cancelar</Button>
            <Button onClick={handleNext}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Selecciona el trámite y cómo deseas ser atendido</h3>
          <p className="wizard-subtitle">
            Elige el canal virtual para evitar viajes innecesarios. Un asesor te atenderá en videollamada.
          </p>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">
              Trámite a realizar
              <Tooltip text="Indica el trámite que necesitas hacer para asignarte al asesor idóneo." />
            </label>
            <select
              className="form-select"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            >
              <option value="rut-inscripcion">Inscripción al RUT por primera vez (Personas naturales)</option>
              <option value="rut-actualizacion">Actualización de RUT (Cambios especiales de firmas o responsabilidades)</option>
              <option value="firma-electronica">Emisión de Firma Electrónica (Para declarar renta en línea)</option>
              <option value="orientacion">Asesoría u Orientación Tributaria general</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              ¿Cómo quieres recibir la cita?
              <Tooltip text="Virtual: Recibes un enlace de videollamada en tu correo. Presencial: Te presentas en nuestras sedes físicas." />
            </label>
            <div className="option-select-grid">
              <div 
                className={`option-select-card ${formData.channel === 'virtual' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, channel: 'virtual' })}
              >
                <h4><i className="fas fa-video" style={{ color: 'var(--secondary)' }}></i> Cita Virtual (Recomendada)</h4>
                <p>Por videollamada desde tu celular o computador. Más rápida, cómoda y sin costo de transporte.</p>
              </div>

              <div 
                className={`option-select-card ${formData.channel === 'presencial' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, channel: 'presencial' })}
              >
                <h4><i className="fas fa-building"></i> Cita Presencial</h4>
                <p>Debes asistir a las oficinas físicas de la DIAN en tu ciudad en la fecha acordada.</p>
              </div>
            </div>
          </div>

          {formData.channel === 'presencial' && (
            <div className="form-group animate-fade-in">
              <label className="form-label">Oficina de atención (Seccional)</label>
              <select
                className="form-select"
                value={formData.office}
                onChange={(e) => setFormData({ ...formData, office: e.target.value })}
              >
                <option value="cali">Cali - Seccional Edificio San Francisco</option>
                <option value="bogota">Bogotá - Seccional Calle 75 (Punto Norte)</option>
                <option value="medellin">Medellín - Seccional Centro (Alpujarra)</option>
                <option value="barranquilla">Barranquilla - Seccional Aduanas de la Costa</option>
              </select>
            </div>
          )}

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(1)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext}>Siguiente paso <i className="fas fa-arrow-right"></i></Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-in">
          <h3 className="wizard-title">Fecha y hora de atención</h3>
          <p className="wizard-subtitle">
            Selecciona un día marcado como disponible en el calendario, luego elije la hora que prefieras.
          </p>

          {errors.dateTime && (
            <div className="error-message" role="alert" style={{ marginBottom: '16px' }}>
              <i className="fas fa-exclamation-circle"></i> {errors.dateTime}
            </div>
          )}

          <div style={{ fontWeight: 'bold', fontSize: '0.8125rem', marginBottom: '8px' }}>
            Junio 2026
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, idx) => (
              <div key={idx} className="calendar-day-header">{day.label}</div>
            ))}
            
            {calendarDays.map((day, idx) => (
              <button
                key={idx}
                type="button"
                className={`calendar-day-cell ${!day.available ? 'disabled' : ''} ${formData.selectedDay === day.num ? 'selected' : ''}`}
                disabled={!day.available}
                onClick={() => {
                  setFormData({ ...formData, selectedDay: day.num, selectedTime: null });
                  setErrors({});
                }}
              >
                <strong>{day.num}</strong>
                <span style={{ fontSize: '9px', display: 'block' }}>
                  {day.available ? 'Libre' : 'Lleno'}
                </span>
              </button>
            ))}
          </div>

          {formData.selectedDay && (
            <div className="animate-fade-in" style={{ marginTop: '20px' }}>
              <label className="form-label">Horas disponibles para el día {formData.selectedDay} de Junio</label>
              <div className="time-slots-grid">
                {timeSlots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`time-slot-btn ${!slot.available ? 'disabled' : ''} ${formData.selectedTime === slot.time ? 'selected' : ''}`}
                    disabled={!slot.available}
                    onClick={() => {
                      setFormData({ ...formData, selectedTime: slot.time });
                      setErrors({});
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="wizard-actions">
            <Button variant="secondary" onClick={() => setStep(2)}><i className="fas fa-arrow-left"></i> Anterior</Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '3.5rem', color: 'var(--secondary)', marginBottom: '16px' }}>
            <i className="fas fa-calendar-check"></i>
          </div>
          <h3 className="wizard-title" style={{ color: 'var(--secondary)' }}>¡Tu cita ha sido agendada con éxito!</h3>
          <p className="wizard-subtitle" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
            Hemos guardado el cupo y enviado la información de preparación a tu correo electrónico: <strong>{formData.email}</strong>.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', maxWidth: '420px', margin: '0 auto 24px auto', textAlign: 'left', fontSize: '0.8125rem' }}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--primary-dark)', fontSize: '0.875rem', borderBottom: '1px solid #e8edf5', paddingBottom: '8px' }}>
              Resumen de la cita:
            </h4>
            <div style={{ marginBottom: '8px' }}><strong>Trámite:</strong> {formData.topic === 'rut-inscripcion' ? 'Inscripción RUT' : formData.topic === 'firma-electronica' ? 'Firma Electrónica' : 'Consulta/Asesoría'}</div>
            <div style={{ marginBottom: '8px' }}><strong>Modalidad:</strong> {formData.channel === 'virtual' ? 'Videollamada Virtual (Online)' : 'Presencial (En Oficina)'}</div>
            {formData.channel === 'presencial' && (
              <div style={{ marginBottom: '8px' }}><strong>Lugar:</strong> {formData.office === 'cali' ? 'Cali - Sede San Francisco' : 'Bogotá - Sede Calle 75'}</div>
            )}
            <div style={{ marginBottom: '8px' }}><strong>Fecha y Hora:</strong> {formData.selectedDay} de Junio de 2026 a las {formData.selectedTime}</div>
            <div style={{ marginTop: '12px', color: '#b25e00', background: '#fff9e6', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>
              <i className="fas fa-circle-exclamation"></i> <strong>Requisito:</strong> Ten a la mano tu cédula física original y asegúrate de tener una conexión a internet estable.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => alert('Descargando archivo .ICS para calendario...')}>
              <i className="fas fa-file-arrow-down"></i> Descargar Recordatorio
            </button>
            <button className="btn-secondary" onClick={onBack}>
              Terminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
