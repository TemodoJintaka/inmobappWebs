// ============================================
// USE FAVORITES HOOK
// Hook para manejar favoritos en localStorage
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useCookies } from '../contexts/CookieContext';

const FAVORITES_KEY = 'inmobapp_favorites';

export const useFavorites = () => {
  const { canUseStorage } = useCookies();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    if (!canUseStorage) {
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favoriteIds = JSON.parse(stored);
        setFavorites(Array.isArray(favoriteIds) ? favoriteIds : []);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, [canUseStorage]);

  // Guardar favoritos en localStorage
  const saveFavorites = useCallback((favoriteIds: number[]) => {
    if (!canUseStorage) {
      return;
    }

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [canUseStorage]);

  // Agregar a favoritos
  const addFavorite = useCallback((propertyId: number) => {
    if (!canUseStorage) {
      alert('Por favor, acepte las cookies para usar la función de favoritos.');
      return;
    }

    if (!favorites.includes(propertyId)) {
      const newFavorites = [...favorites, propertyId];
      saveFavorites(newFavorites);
    }
  }, [favorites, canUseStorage, saveFavorites]);

  // Eliminar de favoritos
  const removeFavorite = useCallback((propertyId: number) => {
    if (!canUseStorage) {
      return;
    }

    const newFavorites = favorites.filter(id => id !== propertyId);
    saveFavorites(newFavorites);
  }, [favorites, canUseStorage, saveFavorites]);

  // Toggle favorito
  const toggleFavorite = useCallback((propertyId: number) => {
    if (!canUseStorage) {
      alert('Por favor, acepte las cookies para usar la función de favoritos.');
      return;
    }

    if (favorites.includes(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  }, [favorites, canUseStorage, addFavorite, removeFavorite]);

  // Verificar si es favorito
  const isFavorite = useCallback((propertyId: number): boolean => {
    return favorites.includes(propertyId);
  }, [favorites]);

  // Obtener cantidad de favoritos
  const favoritesCount = favorites.length;

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    favoritesCount,
  };
};

