import React from 'react';

export function Contactanos() {
  return (
    <main>
      <div className="section-label">
        <i className="fas fa-headset"></i> Contáctenos
      </div>
      
      <div className="hero" style={{ background: 'var(--surface)', border: '1px solid #e8edf5', borderRadius: '12px', padding: '32px', marginBottom: '24px', color: 'var(--text-main)' }}>
        <h1 style={{ color: 'var(--primary-dark)', fontSize: '24px', marginTop: 0 }}>¿Cómo podemos ayudarle?</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Estamos aquí para guiarle. Elija el canal de atención que mejor se adapte a su necesidad.
        </p>
      </div>

      <div className="info-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="info-card">
          <h4><i className="fas fa-comments" style={{ color: 'var(--secondary)' }}></i> Chat Virtual</h4>
          <p>Hable con uno de nuestros asesores en línea o consulte con nuestro asistente virtual disponible 24/7.</p>
          <button className="btn-primary" style={{ marginTop: '10px' }}>Iniciar Chat</button>
        </div>
        <div className="info-card">
          <h4><i className="fas fa-calendar-check" style={{ color: 'var(--primary)' }}></i> Agendamiento de Citas</h4>
          <p>Programe una cita presencial o por videollamada para trámites específicos y asistencia personalizada.</p>
          <button className="btn-secondary" style={{ marginTop: '10px' }}>Agendar Cita</button>
        </div>
        <div className="info-card">
          <h4><i className="fas fa-phone-alt" style={{ color: 'var(--primary)' }}></i> Líneas de Atención</h4>
          <p>Línea Nacional: 01 900 555 0993<br/>Bogotá: (601) 307 8064<br/>Horario: Lun - Vie, 8:00 a.m. a 5:00 p.m.</p>
        </div>
      </div>
    </main>
  );
}
