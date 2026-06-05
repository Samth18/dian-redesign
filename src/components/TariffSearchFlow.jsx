import React, { useState } from 'react';
import { Button } from './Form/Button';
import { Tooltip } from './Form/Tooltip';

export function TariffSearchFlow({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const mockTariffs = [
    { id: '0901.21.00.00', desc: 'Café tostado, no descafeinado', arancel: 0, iva: 19, notes: 'Requiere visto bueno del ICA' },
    { id: '8517.12.00.00', desc: 'Teléfonos móviles (Celulares)', arancel: 0, iva: 19, notes: 'Requiere homologación CRC' },
    { id: '8471.30.00.00', desc: 'Máquinas automáticas para tratamiento de datos (Laptops/Tablets)', arancel: 0, iva: 19, notes: 'Exento de IVA si el valor es menor a 50 UVT' },
    { id: '8703.23.90.00', desc: 'Vehículos automóviles de cilindrada > 1500cm3 y <= 3000cm3', arancel: 35, iva: 19, notes: 'Sujeto a impuesto al consumo (Impoconsumo)' },
    { id: '6109.10.00.00', desc: 'T-shirts y camisetas, de punto, de algodón', arancel: 15, iva: 19, notes: 'Sujeto a umbrales mínimos aduaneros' },
    { id: '3004.90.29.00', desc: 'Medicamentos constituidos por productos mezclados o sin mezclar', arancel: 5, iva: 0, notes: 'Requiere registro sanitario INVIMA' }
  ];

  const filteredTariffs = mockTariffs.filter(t => 
    t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.includes(searchTerm)
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setHasSearched(true);
      setSelectedTariff(null);
    }
  };

  return (
    <div className="wizard-container animate-fade-in">
      <div className="stepper-header">
        <div className="stepper-title">
          <i className="fas fa-scale-balanced"></i> Buscador de Arancel de Aduanas
        </div>
      </div>

      <h3 className="wizard-title">Encuentra la clasificación de tus productos</h3>
      <p className="wizard-subtitle">
        Busca por palabra clave o código para conocer los impuestos, aranceles y requisitos de importación o exportación que aplican en Colombia.
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <label className="form-label">Palabra clave o código arancelario</label>
          <div className="search-box" style={{ width: '100%', background: 'var(--surface)' }}>
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Ej: Computador, Zapatos o 8517.12" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.875rem' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button type="submit"><i className="fas fa-search"></i> Buscar Partida</Button>
        </div>
      </form>

      {hasSearched && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '16px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
            {filteredTariffs.length} resultados encontrados para "{searchTerm}"
          </div>

          {filteredTariffs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredTariffs.map(tariff => (
                <div 
                  key={tariff.id}
                  style={{ 
                    border: '1.5px solid',
                    borderColor: selectedTariff === tariff.id ? 'var(--secondary)' : '#e8edf5',
                    borderRadius: '10px',
                    padding: '16px',
                    background: 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedTariff(selectedTariff === tariff.id ? null : tariff.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                        Partida {tariff.id}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {tariff.desc}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', background: 'var(--surface)', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e8edf5' }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Arancel</div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: tariff.arancel > 0 ? '#cc7700' : '#007a4d' }}>{tariff.arancel}%</div>
                      </div>
                      <div style={{ width: '1px', background: '#d0d8e4' }}></div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>IVA</div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{tariff.iva}%</div>
                      </div>
                    </div>
                  </div>

                  {selectedTariff === tariff.id && (
                    <div className="animate-fade-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #d0d8e4', fontSize: '0.8125rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                            <i className="fas fa-triangle-exclamation"></i> Requisitos y Restricciones
                          </div>
                          <div>{tariff.notes}</div>
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                            <i className="fas fa-file-contract"></i> Acuerdos Comerciales (TLC)
                          </div>
                          <div>Consulta beneficios si importas desde EE.UU., Unión Europea, Alianza del Pacífico, etc.</div>
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={(e) => { e.stopPropagation(); alert('Iniciando simulación de importación...'); }}>
                          <i className="fas fa-calculator"></i> Simular Importación
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '32px', textAlign: 'center', background: 'var(--surface)', borderRadius: '10px', border: '1px dashed #d0d8e4' }}>
              <i className="fas fa-box-open" style={{ fontSize: '2rem', color: '#cbd5e1', marginBottom: '12px' }}></i>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-main)' }}>No encontramos productos con esa búsqueda</h4>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Intenta usar términos más generales o el código numérico parcial.</p>
            </div>
          )}
        </div>
      )}

      <div className="wizard-actions" style={{ marginTop: hasSearched ? '24px' : '0' }}>
        <Button variant="secondary" onClick={onBack}>Volver a Aduanas</Button>
      </div>
    </div>
  );
}
