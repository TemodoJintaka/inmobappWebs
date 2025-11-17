// ============================================
// COOKIE BANNER COMPONENT
// Banner para aceptar cookies
// ============================================

import React from 'react';
import { useCookies } from '../../contexts/CookieContext';
import { Button } from './Button';

export const CookieBanner: React.FC = () => {
  const { cookiesAccepted, acceptCookies } = useCookies();
  const [isVisible, setIsVisible] = React.useState(!cookiesAccepted);

  const handleAccept = () => {
    acceptCookies();
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
    // Si rechaza, no guardamos nada y el banner no aparecerá hasta que limpie localStorage
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🍪 Uso de Cookies
            </h3>
            <p className="text-sm text-gray-600">
              Utilizamos cookies y almacenamiento local para mejorar su experiencia, 
              guardar sus filtros de búsqueda y permitirle agregar propiedades a favoritos. 
              Al hacer clic en "Aceptar", usted consiente el uso de estas tecnologías.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="whitespace-nowrap"
            >
              Rechazar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="whitespace-nowrap"
            >
              Aceptar Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

