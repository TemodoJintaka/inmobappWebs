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

// Funciones helper para manejar cookies reales
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  
  return null;
};

const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') {
    return;
  }
  
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  
  // Configurar cookie con SameSite=Lax para cumplir con políticas de privacidad
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
};

const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') {
    return;
  }
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Función helper para migrar consentimiento de localStorage a cookies (una sola vez)
const migrateFromLocalStorage = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const oldConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (oldConsent) {
      const consentData = JSON.parse(oldConsent);
      const expiryDate = new Date(consentData.expiry);
      
      // Verificar si el consentimiento aún es válido
      if (expiryDate > new Date()) {
        // Migrar a cookie
        setCookie(COOKIE_CONSENT_KEY, oldConsent, COOKIE_CONSENT_EXPIRY_DAYS);
        // Eliminar de localStorage
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        return true;
      } else {
        // El consentimiento expiró, eliminarlo
        localStorage.removeItem(COOKIE_CONSENT_KEY);
      }
    }
  } catch (error) {
    console.error('Error migrating cookie consent:', error);
  }
  
  return false;
};

// Función helper para verificar el consentimiento de cookies de forma sincrónica
const checkCookieConsentSync = (): boolean => {
  // Solo ejecutar en el cliente (navegador)
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // Primero verificar si existe en cookies
    const consentCookie = getCookie(COOKIE_CONSENT_KEY);
    if (consentCookie) {
      const consentData = JSON.parse(consentCookie);
      const expiryDate = new Date(consentData.expiry);
      
      // Verificar si el consentimiento aún es válido
      if (expiryDate > new Date()) {
        return true;
      } else {
        // El consentimiento expiró, eliminarlo
        deleteCookie(COOKIE_CONSENT_KEY);
      }
    } else {
      // Si no existe en cookies, intentar migrar desde localStorage (solo una vez)
      return migrateFromLocalStorage();
    }
  } catch (error) {
    console.error('Error checking cookie consent:', error);
  }
  
  return false;
};

export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializar el estado leyendo directamente de cookies (sincrónicamente)
  // Esto evita el flash del banner cuando el usuario ya aceptó las cookies
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(() => checkCookieConsentSync());
  const [canUseStorage, setCanUseStorage] = useState<boolean>(() => checkCookieConsentSync());

  useEffect(() => {
    // Verificar si el usuario ya aceptó las cookies (verificación adicional)
    const checkCookieConsent = () => {
      const hasConsent = checkCookieConsentSync();
      setCookiesAccepted(hasConsent);
      setCanUseStorage(hasConsent);
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
      
      // Guardar el consentimiento en una cookie real (no en localStorage)
      setCookie(COOKIE_CONSENT_KEY, JSON.stringify(consentData), COOKIE_CONSENT_EXPIRY_DAYS);
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

