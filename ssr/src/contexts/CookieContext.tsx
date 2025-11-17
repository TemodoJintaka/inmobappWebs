// ============================================
// COOKIE CONTEXT
// Maneja la aceptación de cookies y el uso de localStorage
// ============================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookieContextType {
  cookiesAccepted: boolean;
  acceptCookies: () => void;
  canUseStorage: boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'inmobapp_cookie_consent';
const COOKIE_CONSENT_EXPIRY_DAYS = 365;

export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(false);
  const [canUseStorage, setCanUseStorage] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies
    const checkCookieConsent = () => {
      try {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (consent) {
          const consentData = JSON.parse(consent);
          const expiryDate = new Date(consentData.expiry);
          
          // Verificar si el consentimiento aún es válido
          if (expiryDate > new Date()) {
            setCookiesAccepted(true);
            setCanUseStorage(true);
            return;
          } else {
            // El consentimiento expiró, eliminarlo
            localStorage.removeItem(COOKIE_CONSENT_KEY);
          }
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
      }
      
      setCookiesAccepted(false);
      setCanUseStorage(false);
    };

    checkCookieConsent();
  }, []);

  const acceptCookies = () => {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);
      
      const consentData = {
        accepted: true,
        date: new Date().toISOString(),
        expiry: expiryDate.toISOString(),
      };
      
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentData));
      setCookiesAccepted(true);
      setCanUseStorage(true);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  return (
    <CookieContext.Provider value={{ cookiesAccepted, acceptCookies, canUseStorage }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};

