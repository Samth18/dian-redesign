import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RutUpdateFlow } from '../components/RutUpdateFlow';
import { AppointmentBookingFlow } from '../components/AppointmentBookingFlow';
import { Tooltip } from '../components/Form/Tooltip';

export function RUT() {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');

  useEffect(() => {
    // SEO & Title Tag Best Practice
    document.title = "DIAN - Registro Único Tributario (RUT) y Citas";
  }, []);

  const handleSetAction = (newAction) => {
    if (newAction) {
      setSearchParams({ action: newAction });
    } else {
      setSearchParams({});
    }
  };

  if (action === 'update') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-sync-alt"></i> Actualizar mi RUT
        </div>
        <RutUpdateFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  if (action === 'appointment') {
    return (
      <main>
        <div className="section-label">
          <i className="fas fa-calendar-check"></i> Agendar Cita
        </div>
        <AppointmentBookingFlow onBack={() => handleSetAction(null)} />
      </main>
    );
  }

  return (
    <main>
      <div className="section-label">
        <i className="fas fa-id-card"></i> Registro Único Tributario (RUT)
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>Servicios de RUT y Citas</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Gestiona tu identificación fiscal ante el Estado. Puedes inscribirte por primera vez, actualizar tus datos de contacto o actividad económica, agendar citas de atención y descargar copias de tu documento.
        </p>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="fas fa-file-signature" style={{ color: 'var(--primary)' }}></i> Inscripción</span>
              <Tooltip text="Regístrate en la DIAN por primera vez si vas a iniciar un negocio o te lo exigen en un empleo." />
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Obtén tu número de identificación fiscal (NIT) por primera vez de forma 100% virtual.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => alert('Para inscribirse por primera vez, programa una cita virtual o presencial en el siguiente módulo de Citas.')}>
            Iniciar Inscripción
          </button>
        </div>

        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '3px solid var(--secondary)' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="fas fa-sync-alt" style={{ color: 'var(--secondary)' }}></i> Actualización</span>
              <Tooltip text="Modifica datos de tu RUT como dirección, celular o código de actividad económica." />
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modifica tu dirección de correspondencia, celular o actividades laborales de manera simple.</p>
          </div>
          <button className="btn-primary" style={{ marginTop: '16px', width: '100%' }} onClick={() => handleSetAction('update')}>
            Actualizar mi RUT
          </button>
        </div>

        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="fas fa-calendar-check" style={{ color: 'var(--primary)' }}></i> Agendar Cita</span>
              <Tooltip text="Separa un espacio de atención con un asesor. Te sugerimos la opción de videollamada para ahorrar tiempo." />
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Programa una cita para atención por videollamada o asiste presencialmente a nuestras oficinas.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => handleSetAction('appointment')}>
            Programar Cita
          </button>
        </div>

        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span><i className="fas fa-download" style={{ color: 'var(--primary)' }}></i> Descargar Copia</span>
              <Tooltip text="Obtén un archivo PDF del documento oficial del RUT con fecha de generación actualizada." />
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>¿Necesitas entregar tu RUT en un trabajo? Descarga una copia en formato PDF aquí.</p>
          </div>
          <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => alert('Descargando copia de RUT en PDF... (Simulado)')}>
            Descargar RUT (PDF)
          </button>
        </div>
      </div>
    </main>
  );
}
