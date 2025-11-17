// ============================================
// USE FILTERS STORAGE HOOK
// Hook para guardar y cargar filtros en localStorage
// ============================================

import { useCallback } from 'react';
import { useCookies } from '../contexts/CookieContext';
import { PropertyFilters } from '../types';

const FILTERS_STORAGE_KEY = 'inmobapp_property_filters';

export const useFiltersStorage = () => {
  const { canUseStorage } = useCookies();

  // Guardar filtros en localStorage
  const saveFilters = useCallback((filters: PropertyFilters) => {
    if (!canUseStorage) {
      return;
    }

    try {
      // Limpiar filtros vacíos antes de guardar
      const cleanedFilters: PropertyFilters = {};
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          cleanedFilters[key as keyof PropertyFilters] = value;
        }
      });

      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(cleanedFilters));
    } catch (error) {
      console.error('Error saving filters:', error);
    }
  }, [canUseStorage]);

  // Cargar filtros desde localStorage
  const loadFilters = useCallback((): PropertyFilters | null => {
    if (!canUseStorage) {
      return null;
    }

    try {
      const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as PropertyFilters;
      }
    } catch (error) {
      console.error('Error loading filters:', error);
    }

    return null;
  }, [canUseStorage]);

  // Limpiar filtros guardados
  const clearFilters = useCallback(() => {
    if (!canUseStorage) {
      return;
    }

    try {
      localStorage.removeItem(FILTERS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  }, [canUseStorage]);

  return {
    saveFilters,
    loadFilters,
    clearFilters,
    canUseStorage,
  };
};

