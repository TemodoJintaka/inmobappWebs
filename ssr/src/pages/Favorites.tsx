// ============================================
// FAVORITES PAGE
// ============================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyCard } from '../components/property/PropertyCard';
import { Loading } from '../components/common';
import { useFavorites } from '../hooks/useFavorites';
import { RealProperty } from '../types';
import { propertyAPI } from '../services/api';
import { updateMetaTags } from '../utils/seo';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const [properties, setProperties] = useState<RealProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateMetaTags({
      title: 'Mis Favoritos - InmobApp',
      description: 'Propiedades guardadas en favoritos',
      keywords: 'favoritos, propiedades guardadas, InmobApp',
      ogTitle: 'Mis Favoritos - InmobApp',
      ogDescription: 'Propiedades guardadas en favoritos',
      ogType: 'website',
      canonical: '/favoritos',
    });
  }, []);

  useEffect(() => {
    if (!favoritesLoading) {
      loadFavoriteProperties();
    }
  }, [favorites, favoritesLoading]);

  const loadFavoriteProperties = async () => {
    if (favorites.length === 0) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Cargar todas las propiedades favoritas
      const propertyPromises = favorites.map(id => propertyAPI.getProperty(id));
      const loadedProperties = await Promise.allSettled(propertyPromises);
      
      // Filtrar solo las propiedades cargadas exitosamente
      const validProperties = loadedProperties
        .filter((result): result is PromiseFulfilledResult<RealProperty> => result.status === 'fulfilled')
        .map(result => result.value);
      
      setProperties(validProperties);
    } catch (error) {
      console.error('Error loading favorite properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyClick = (property: RealProperty) => {
    navigate(`/propiedades/${property.id}`);
  };

  if (loading || favoritesLoading) {
    return <Loading text="Cargando favoritos..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mis Favoritos
          </h1>
          <p className="text-gray-600">
            {properties.length === 0 
              ? 'No tienes propiedades guardadas en favoritos'
              : `${properties.length} ${properties.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}`
            }
          </p>
        </div>

        {/* Empty State */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg 
              className="w-24 h-24 mx-auto mb-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No tienes favoritos aún
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora nuestras propiedades y guarda tus favoritas haciendo clic en el icono de corazón. 
              Así podrás acceder fácilmente a ellas cuando quieras.
            </p>
            <button
              onClick={() => navigate('/propiedades')}
              className="px-6 py-3 bg-[#ec7734] text-white font-semibold rounded-lg hover:bg-[#d66a2e] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explorar Propiedades
            </button>
          </div>
        ) : (
          /* Properties Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={handlePropertyClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

