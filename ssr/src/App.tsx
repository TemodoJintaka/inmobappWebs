// ============================================
// MAIN APP COMPONENT
// ============================================

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Home, PropertyList, PropertyDetail } from './pages';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<PropertyList />} />
            <Route path="/propiedades/:id" element={<PropertyDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

