import React, { useState } from 'react';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function TaxCalendarFlow({ onBack }) {
  const [nitDigit, setNitDigit] = useState('');
  
  // Simulated data for tax deadlines based on last digit
  const getDeadlines = (digit) => {
    if (!digit && digit !== '0') return [];
    
    // Simulate some logic: base dates depending on the digit
    const baseDay = parseInt(digit) * 2 + 10; // Simple formula to stagger dates
    
    return [
      { 
        id: 1, 
        tax: 'Impuesto de Renta (Persona Natural)', 
        date: `2026-08-${baseDay > 31 ? 31 : baseDay < 10 ? '0'+baseDay : baseDay}`, 
        type: 'renta', 
        desc: 'Declaración y pago del impuesto sobre la renta del año gravable 2025.',
        daysLeft: 80 + parseInt(digit)
      },
      { 
        id: 2, 
        tax: 'IVA (Bimestral)', 
        date: `2026-07-${baseDay > 28 ? 28 : baseDay < 10 ? '0'+baseDay : baseDay}`, 
        type: 'iva', 
        desc: 'Declaración y pago del impuesto a las ventas del periodo Mayo-Junio.',
        daysLeft: 45 + parseInt(digit)
      },
      { 
        id: 3, 
        tax: 'Retención en la Fuente', 
        date: `2026-06-${(baseDay/2) + 5 > 20 ? 20 : Math.floor((baseDay/2) + 5)}`, 
        type: 'retencion', 
        desc: 'Declaración mensual de retenciones practicadas en Mayo.',
        daysLeft: 12 + parseInt(digit)
      }
    ].sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const deadlines = getDeadlines(nitDigit);

  const getUrgencyStyle = (days) => {
    if (days <= 15) return { color: '#cc2200', bg: '#fef0f0', border: '#f5c6c6' };
    if (days <= 45) return { color: '#cc7700', bg: '#fff8e6', border: '#fae4b3' };
    return { color: '#007a4d', bg: '#f0faf5', border: '#b8e6d0' };
  };

  const getTaxIcon = (type) => {
    switch (type) {
      case 'renta': return 'fa-file-invoice-dollar';
      case 'iva': return 'fa-tags';
      case 'retencion': return 'fa-file-contract';
      default: return 'fa-calendar-day';
    }
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-calendar-alt"></i> Calendario Tributario Personalizado
        </div>
      </div>

      <h3 className="wizard-title">Conoce tus próximas fechas de vencimiento</h3>
      <p className="wizard-subtitle">
        Ingresa el último dígito de tu NIT o Cédula (sin contar el dígito de verificación) para ver cuándo te corresponde declarar.
      </p>

      <div className="form-grid" style={{ marginBottom: '24px' }}>
        <div>
          <label className="form-label">
            Último dígito del NIT o Cédula
            <Tooltip text="Por ejemplo, si tu número es 1.098.765.432, el último dígito es 2." />
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0,1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => setNitDigit(num.toString())}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: `2px solid ${nitDigit === num.toString() ? 'var(--secondary)' : '#d0d8e4'}`,
                  background: nitDigit === num.toString() ? 'var(--secondary)' : 'var(--surface)',
                  color: nitDigit === num.toString() ? 'white' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {nitDigit !== '' && (
        <div className="animate-fade-in">
          <h4 style={{ color: 'var(--primary-dark)', fontSize: '1rem', marginBottom: '16px', borderBottom: '1.5px solid #e8edf5', paddingBottom: '8px' }}>
            Vencimientos para el dígito {nitDigit}:
          </h4>

          <div style={{ display: 'grid', gap: '16px' }}>
            {deadlines.map((item) => {
              const urgency = getUrgencyStyle(item.daysLeft);
              return (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '16px',
                  background: 'var(--surface)', 
                  border: '1px solid #e8edf5', 
                  borderRadius: '12px', 
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '10px', 
                    background: urgency.bg, 
                    border: `1px solid ${urgency.border}`,
                    color: urgency.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>
                      {new Date(item.date).getDate()}
                    </div>
                    <div style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {new Date(item.date).toLocaleString('es-CO', { month: 'short' })}
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <i className={`fas ${getTaxIcon(item.type)}`} style={{ color: 'var(--primary-light)' }}></i>
                      <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.tax}</h4>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                      <span style={{ 
                        fontSize: '0.6875rem', 
                        fontWeight: 700, 
                        background: urgency.bg,
                        color: urgency.color,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: `1px solid ${urgency.border}`
                      }}>
                        <i className="fas fa-clock"></i> Vence en {item.daysLeft} días
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }} onClick={() => alert(`Iniciando formulario de ${item.tax}...`)}>
                      Declarar Ahora
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ marginTop: '20px', padding: '12px', background: '#eef2f8', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <i className="fas fa-circle-info" style={{ color: 'var(--primary-light)' }}></i> Te recordamos que presentar tus declaraciones después de la fecha límite genera sanciones por extemporaneidad e intereses moratorios.
          </div>
        </div>
      )}

      <div className="wizard-actions" style={{ marginTop: nitDigit !== '' ? '24px' : '0' }}>
        <Button variant="secondary" onClick={onBack}>Volver a Impuestos</Button>
      </div>
    </div>
  );
}
