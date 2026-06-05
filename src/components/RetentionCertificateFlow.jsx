import React, { useState } from 'react';
import { Input } from './Form/Input';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function RetentionCertificateFlow({ onBack }) {
  const [searchData, setSearchData] = useState({
    nit: '',
    year: '2025'
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockCertificates = [
    { id: 1, type: 'Retención en la Fuente por Salarios', agent: 'TechStore Colombia SAS', nit: '901234567-8', amount: 1250000, date: '2026-03-15' },
    { id: 2, type: 'Retención por Honorarios (Independiente)', agent: 'Consultores Andinos', nit: '800987654-3', amount: 450000, date: '2026-03-20' },
    { id: 3, type: 'Rendimientos Financieros (Bancos)', agent: 'Banco de Bogotá', nit: '860002964-4', amount: 12500, date: '2026-02-28' },
    { id: 4, type: 'Retención por Compras', agent: 'Almacenes Éxito S.A.', nit: '890900608-9', amount: 35000, date: '2026-03-10' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(value);
  };

  const totalRetention = mockCertificates.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSearch = () => {
    if (searchData.nit.trim() === '') return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasSearched(true);
    }, 1200);
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-file-pdf"></i> Certificados de Retención
        </div>
      </div>

      <h3 className="wizard-title">Descarga tus soportes de impuestos pagados por anticipado</h3>
      <p className="wizard-subtitle">
        Las retenciones son adelantos del impuesto de renta que te descontaron durante el año. Aquí puedes descargar los certificados emitidos por tus empleadores, clientes o bancos para restarlos en tu declaración de renta.
      </p>

      <div className="form-grid" style={{ marginBottom: '24px' }}>
        <div>
          <label className="form-label">
            Tu NIT o Cédula
          </label>
          <Input
            placeholder="Ej: 1.098.765.432"
            value={searchData.nit}
            onChange={(e) => setSearchData({ ...searchData, nit: e.target.value })}
          />
        </div>

        <div>
          <label className="form-label">
            Año Gravable
            <Tooltip text="Elige el año del cual necesitas los certificados. Generalmente se descargan los del año anterior para la declaración actual." />
          </label>
          <select
            className="form-select"
            value={searchData.year}
            onChange={(e) => setSearchData({ ...searchData, year: e.target.value })}
            style={{ height: '43px' }}
          >
            <option value="2025">2025 (Declarable en 2026)</option>
            <option value="2024">2024 (Histórico)</option>
            <option value="2023">2023 (Histórico)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <Button onClick={handleSearch} disabled={isLoading || searchData.nit === ''}>
          {isLoading ? 'Buscando certificados...' : <><i className="fas fa-search"></i> Buscar Certificados</>}
        </Button>
      </div>

      {hasSearched && !isLoading && (
        <div className="animate-fade-in">
          <div style={{ background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--primary-dark)', fontSize: '1rem' }}>
                  Resumen de retenciones a tu favor ({searchData.year})
                </h4>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Encontramos {mockCertificates.length} certificados reportados por terceros.
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Retenido</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#007a4d' }}>{formatCurrency(totalRetention)}</div>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #e8edf5', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: '#f0f4f8' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>Concepto</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)' }}>Agente Retenedor (Quien te descontó)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--primary-dark)' }}>Valor Retenido</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: 'var(--primary-dark)' }}>Soporte</th>
                </tr>
              </thead>
              <tbody>
                {mockCertificates.map((cert) => (
                  <tr key={cert.id} style={{ borderBottom: '1px solid #f0f2f6', background: 'var(--surface)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '2px' }}>{cert.type}</strong>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Reportado el {cert.date}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ color: 'var(--text-main)' }}>{cert.agent}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>NIT: {cert.nit}</div>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: '#007a4d' }}>
                      {formatCurrency(cert.amount)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '11px', border: '1px solid #d0d8e4' }}
                        onClick={() => alert(`Descargando certificado de ${cert.agent}...`)}
                      >
                        <i className="fas fa-download"></i> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={() => alert('Generando archivo ZIP con todos los certificados...')}>
              <i className="fas fa-file-archive"></i> Descargar Todos (ZIP)
            </button>
          </div>
        </div>
      )}

      <div className="wizard-actions" style={{ marginTop: hasSearched ? '24px' : '0' }}>
        <Button variant="secondary" onClick={onBack}>Volver a Impuestos</Button>
      </div>
    </div>
  );
}
