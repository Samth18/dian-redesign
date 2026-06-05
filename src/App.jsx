import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AccessibilityMenu } from './components/AccessibilityMenu/AccessibilityMenu';

// Pages
import { Home } from './pages/Home';
import { Impuestos } from './pages/Impuestos';
import { Aduanas } from './pages/Aduanas';
import { Tramites } from './pages/Tramites';
import { FacturaElectronica } from './pages/FacturaElectronica';
import { RUT } from './pages/RUT';
import { Contactanos } from './pages/Contactanos';
import { GrandesContribuyentes } from './pages/GrandesContribuyentes';

import './index.css';

function App() {
  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AccessibilityMenu />
      <Header />
      
      <div className="page-content" style={{ flex: 1, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impuestos" element={<Impuestos />} />
          <Route path="/aduanas" element={<Aduanas />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/factura-electronica" element={<FacturaElectronica />} />
          <Route path="/rut" element={<RUT />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/grandes-contribuyentes" element={<GrandesContribuyentes />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
