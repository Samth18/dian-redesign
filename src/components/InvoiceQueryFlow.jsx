import React, { useState } from 'react';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function InvoiceQueryFlow({ onBack }) {
  const [searchData, setSearchData] = useState({
    nit: '',
    dateFrom: '',
    dateTo: '',
    docType: 'all'
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const mockInvoices = [
    { id: 'SETT-001', type: 'Emitida', date: '2026-05-28', client: 'Distribuidora El Sol SAS', amount: 2350000, status: 'Validada', cufe: 'a1b2c3d4e5f6' },
    { id: 'SETT-002', type: 'Emitida', date: '2026-05-25', client: 'Restaurante La Brasa', amount: 890000, status: 'Validada', cufe: 'g7h8i9j0k1l2' },
    { id: 'SETT-003', type: 'Emitida', date: '2026-05-20', client: 'Comercial Andina Ltda', amount: 5670000, status: 'Validada', cufe: 'm3n4o5p6q7r8' },
    { id: 'REC-2026-411', type: 'Recibida', date: '2026-05-22', client: 'Papelería Nacional', amount: 345000, status: 'Aceptada', cufe: 's9t0u1v2w3x4' },
    { id: 'REC-2026-412', type: 'Recibida', date: '2026-05-18', client: 'Servicios Cloud Colombia', amount: 1200000, status: 'Aceptada', cufe: 'y5z6a7b8c9d0' },
    { id: 'SETT-004', type: 'Emitida', date: '2026-05-15', client: 'Ferretería El Martillo', amount: 4100000, status: 'Rechazada', cufe: 'e1f2g3h4i5j6' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredInvoices = mockInvoices.filter(inv => {
    if (searchData.docType === 'emitidas' && inv.type !== 'Emitida') return false;
    if (searchData.docType === 'recibidas' && inv.type !== 'Recibida') return false;
    return true;
  });

  const handleSearch = () => {
    setHasSearched(true);
    setSelectedInvoice(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Validada': return { color: '#007a4d', background: '#f0faf5', border: '1px solid #b8e6d0' };
      case 'Aceptada': return { color: '#0066cc', background: '#e6f7ff', border: '1px solid #b3d9ff' };
      case 'Rechazada': return { color: '#cc2200', background: '#fef0f0', border: '1px solid #f5c6c6' };
      default: return { color: '#666', background: '#f5f5f5', border: '1px solid #ddd' };
    }
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-search"></i> Consulta de Documentos Electrónicos
        </div>
      </div>

      <h3 className="wizard-title">Busca tus facturas emitidas y recibidas</h3>
      <p className="wizard-subtitle">
        Consulta el historial completo de tus documentos electrónicos validados por la DIAN. Puedes filtrar por fecha, tipo y descargar copias.
      </p>

      <div className="form-grid" style={{ marginBottom: '16px' }}>
        <div>
          <label className="form-label">
            NIT o Cédula del emisor/receptor
            <Tooltip text="Ingresa tu NIT para ver las facturas que has emitido, o el NIT de un tercero para buscar facturas que te han enviado." />
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: 900123456-7"
            value={searchData.nit}
            onChange={(e) => setSearchData({ ...searchData, nit: e.target.value })}
          />
        </div>

        <div>
          <label className="form-label">Tipo de documento</label>
          <select
            className="form-select"
            value={searchData.docType}
            onChange={(e) => setSearchData({ ...searchData, docType: e.target.value })}
            style={{ height: '43px' }}
          >
            <option value="all">Todos los documentos</option>
            <option value="emitidas">Solo facturas emitidas</option>
            <option value="recibidas">Solo facturas recibidas</option>
          </select>
        </div>

        <div>
          <label className="form-label">Desde</label>
          <input
            type="date"
            className="form-input"
            value={searchData.dateFrom}
            onChange={(e) => setSearchData({ ...searchData, dateFrom: e.target.value })}
          />
        </div>

        <div>
          <label className="form-label">Hasta</label>
          <input
            type="date"
            className="form-input"
            value={searchData.dateTo}
            onChange={(e) => setSearchData({ ...searchData, dateTo: e.target.value })}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <Button onClick={handleSearch}><i className="fas fa-search"></i> Buscar Documentos</Button>
      </div>

      {hasSearched && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
              {filteredInvoices.length} documentos encontrados
            </span>
            <button
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '11px' }}
              onClick={() => alert('Descargando todos los documentos en ZIP... (Simulado)')}
            >
              <i className="fas fa-download"></i> Descargar todos (ZIP)
            </button>
          </div>

          <div style={{ border: '1px solid #e8edf5', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: '#f0f4f8' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Número</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Tipo</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Fecha</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Cliente/Proveedor</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Valor</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Estado</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.75rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, idx) => (
                  <tr
                    key={inv.id}
                    style={{
                      borderBottom: '1px solid #f0f2f6',
                      background: selectedInvoice === inv.id ? '#f0faf5' : (idx % 2 === 0 ? 'var(--surface)' : '#fafbfc'),
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onClick={() => setSelectedInvoice(selectedInvoice === inv.id ? null : inv.id)}
                  >
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{inv.id}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: inv.type === 'Emitida' ? '#0066cc' : '#cc7700' }}>
                        <i className={`fas ${inv.type === 'Emitida' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {inv.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{inv.date}</td>
                    <td style={{ padding: '10px 14px' }}>{inv.client}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <span style={{
                        ...getStatusStyle(inv.status),
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        display: 'inline-block'
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                      <button
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '10px', border: '1px solid #d0d8e4' }}
                        onClick={(e) => { e.stopPropagation(); alert(`Descargando factura ${inv.id} en PDF... (Simulado)`); }}
                      >
                        <i className="fas fa-file-pdf"></i> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedInvoice && (
            <div className="animate-fade-in" style={{ marginTop: '16px', background: '#f8fafc', border: '1px solid #e8edf5', borderRadius: '10px', padding: '16px', fontSize: '0.8125rem' }}>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--primary-dark)', fontSize: '0.875rem' }}>
                <i className="fas fa-circle-info" style={{ marginRight: '6px' }}></i>
                Detalle de la factura {selectedInvoice}
              </h4>
              <div style={{ marginBottom: '6px' }}><strong>CUFE (Código Único de Factura):</strong> {mockInvoices.find(i => i.id === selectedInvoice)?.cufe}...</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                El CUFE es un código único generado por la DIAN que identifica cada factura electrónica de forma inequívoca. Puedes usarlo para verificar la autenticidad de cualquier factura en el portal de validación de la DIAN.
              </div>
            </div>
          )}
        </div>
      )}

      <div className="wizard-actions" style={{ marginTop: hasSearched ? '24px' : '0' }}>
        <Button variant="secondary" onClick={onBack}>Volver a Facturación</Button>
      </div>
    </div>
  );
}
