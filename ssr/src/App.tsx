// ============================================
// MAIN APP COMPONENT
// ============================================

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { CookieBanner } from './components/common/CookieBanner';
import { CookieProvider } from './contexts/CookieContext';
import { Home, PropertyList, PropertyDetail, PropertyDetailView, Favorites, TermsAndConditions } from './pages';

const App: React.FC = () => {
  return (
    <CookieProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/propiedades" element={<PropertyList />} />
              <Route path="/propiedades/:id" element={<PropertyDetail />} />
              <Route path="/propiedades/:id/sincontacto/" element={<PropertyDetailView />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </CookieProvider>
  );
};

export default App;

