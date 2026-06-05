import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeclarationFlow } from '../components/DeclarationFlow';
import { Tooltip } from '../components/Form/Tooltip';

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1>¿Qué trámite necesita realizar hoy?</h1>
          <p>Acceda a sus obligaciones tributarias, actualice su RUT o declare renta en minutos. Sin intermediarios, sin complicaciones.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <i className="fas fa-user"></i> Ingresar con mi usuario
            </button>
            <button className="btn-secondary" onClick={() => navigate('/tramites')}>Continuar sin cuenta</button>
          </div>
        </div>
        
        {/* FLUJO DE 3 PASOS */}
        <div className="hero-steps">
          <h3><i className="fas fa-map-signs"></i> &nbsp;Su flujo hoy</h3>
          <div className="step" onClick={() => setShowModal(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}>
            <div className="step-num"><i className="fas fa-check" style={{ fontSize: '9px' }}></i></div>
            <div className="step-text">Ingrese a su cuenta</div>
          </div>
          <div className="step-connector"></div>
          <div className="step" onClick={() => navigate('/tramites')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/tramites')}>
            <div className="step-num">2</div>
            <div className="step-text">Seleccione su trámite</div>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-num pending">3</div>
            <div className="step-text" style={{ color: 'rgba(255,255,255,0.5)' }}>Complete y envíe</div>
          </div>
        </div>
      </div>

      <main>
        <div className="section-label"><i className="fas fa-th-large"></i> 8 acciones principales</div>

        <div className="actions-grid">
          <button className="action-card featured" onClick={() => setShowModal(true)}>
            <div className="action-icon"><i className="fas fa-file-invoice-dollar"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Reporta tus ingresos del año anterior ante el Estado. La DIAN te pre-carga los datos para ayudarte." />
            </div>
            <h3>Declarar Renta</h3>
            <p>Personas naturales y jurídicas. Plazo: 15 de abril.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/rut?action=update')}>
            <div className="action-icon"><i className="fas fa-id-card"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Modifica tus datos personales, de residencia, teléfono o actividad económica en tu Registro Fiscal." />
            </div>
            <h3>Actualizar RUT</h3>
            <p>Actualice sus datos en 3 pasos simples.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/factura-electronica')}>
            <div className="action-icon" style={{ background: '#fff8e6', color: '#cc7700' }}><i className="fas fa-receipt"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Factura electrónica: el registro digital obligatorio de tus ventas comerciales." />
            </div>
            <h3>Factura Electrónica</h3>
            <p>Habilite o consulte su facturación.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/rut?action=appointment')}>
            <div className="action-icon" style={{ background: '#f0faf5', color: '#007a4d' }}><i className="fas fa-calendar-check"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Programa un espacio de videollamada (online) o presencial con nuestros asesores en minutos." />
            </div>
            <h3>Agendar Cita</h3>
            <p>Reserve en la seccional más cercana o virtual.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/aduanas')}>
            <div className="action-icon" style={{ background: '#fef0f0', color: '#cc2200' }}><i className="fas fa-ship"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Realiza el seguimiento documental de tu mercancía importada o diligencia solicitudes de exportación." />
            </div>
            <h3>Trámites Aduaneros</h3>
            <p>Importaciones y exportaciones.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/contactanos')}>
            <div className="action-icon" style={{ background: '#f5f0ff', color: '#6600cc' }}><i className="fas fa-pen-to-square"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Envía peticiones, quejas, reclamos o sugerencias a la DIAN si tienes dudas con tus trámites." />
            </div>
            <h3>PQSR y Denuncias</h3>
            <p>Peticiones, quejas o sugerencias.</p>
          </button>
          
          <button className="action-card" onClick={() => navigate('/contactanos')}>
            <div className="action-icon" style={{ background: '#e6f7ff', color: '#0066cc' }}><i className="fas fa-envelope-circle-check"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Verifica si un correo electrónico que dice ser de la DIAN es real o se trata de una estafa virtual." />
            </div>
            <h3>Verificar Correos</h3>
            <p>Confirme si un correo es oficial DIAN.</p>
          </button>
          
          <button className="action-card" onClick={() => alert('Sección exclusiva para Grandes Contribuyentes tributarios (Empresas de gran patrimonio del Estado).')}>
            <div className="action-icon" style={{ background: '#fff5e6', color: '#cc5500' }}><i className="fas fa-landmark"></i></div>
            <div className="tooltip-badge">
              <Tooltip text="Portal de transacciones exclusivo para personas jurídicas catalogadas de gran envergadura fiscal." />
            </div>
            <h3>Grandes Contribuyentes</h3>
            <p>Portal exclusivo de alta categoría.</p>
          </button>
        </div>

        <div className="info-row">
          <div className="info-card">
            <h4><i className="fas fa-circle-info"></i> Guía rápida de trámites</h4>
            <div className="info-item">
              <i className="fas fa-check-circle"></i>
              <div className="info-item-text">
                <strong>¿Qué es el RUT?</strong>
                <span>Registro Único Tributario — su identificación fiscal. Gratis y obligatorio.</span>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-check-circle"></i>
              <div className="info-item-text">
                <strong>¿Cuándo debo declarar renta?</strong>
                <span>Si sus ingresos superan los topes anuales definidos por la DIAN.</span>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-check-circle"></i>
              <div className="info-item-text">
                <strong>¿Qué es la Factura Electrónica?</strong>
                <span>Documento fiscal digital equivalente a la factura en papel.</span>
              </div>
            </div>
          </div>
          <div className="info-card">
            <h4><i className="fas fa-bell"></i> Canales de atención</h4>
            <div className="info-item">
              <i className="fas fa-robot"></i>
              <div className="info-item-text">
                <strong>Asistente virtual DIAN</strong>
                <span>Disponible 24/7 para preguntas frecuentes.</span>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div className="info-item-text">
                <strong>Línea tributaria nacional</strong>
                <span>Lunes a viernes, 8am – 5pm.</span>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-hands"></i>
              <div className="info-item-text">
                <strong>Lengua de señas colombiana</strong>
                <span>Videollamada para personas con discapacidad auditiva.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL PARA EL FLUJO INTERACTIVO DE REACT */}
      {showModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') setShowModal(false);
        }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-content animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 id="modal-title" style={{ margin: 0, color: 'var(--primary-dark)' }}>Portal Transaccional</h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
                aria-label="Cerrar ventana"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <DeclarationFlow />
          </div>
        </div>
      )}
    </>
  );
}
