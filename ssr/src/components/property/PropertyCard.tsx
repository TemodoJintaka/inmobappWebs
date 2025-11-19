// ============================================
// PROPERTY CARD COMPONENT
// ============================================

import React from 'react';
import { RealProperty } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { primaryClasses } from '../../theme/colors';

interface PropertyCardProps {
  property: RealProperty;
  onClick?: (property: RealProperty) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const mainImage = property.images[0]?.image || '/placeholder-property.jpg';

  // Get key characteristics
  const bedrooms = property.characteristics.find(c => 
    c.characteristic.code === 'bedrooms' || c.characteristic.code === 'habitaciones'
  );
  const bathrooms = property.characteristics.find(c => 
    c.characteristic.code === 'bathrooms' || c.characteristic.code === 'banos'
  );
  const area = property.characteristics.find(c => 
    c.characteristic.code === 'area' || c.characteristic.code === 'area_total'
  );

  const handleClick = () => {
    if (onClick) {
      onClick(property);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={mainImage} 
          alt={property.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className={`absolute top-2 left-2 ${primaryClasses.bg} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          {property.type_negotiation.name}
        </div>
        <div className="absolute top-2 right-12 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.type_property.name}
        </div>
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-200 z-10 ${
            favorite 
              ? 'bg-[#FF4C51] text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg 
            className="w-5 h-5" 
            fill={favorite ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className={`text-2xl font-bold ${primaryClasses.text} mb-2`}>
          {formatPrice(property.price)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {property.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="line-clamp-1">
            {property.parish?.name}, {property.state.name}
          </span>
        </div>

        {/* Characteristics */}
        <div className="flex items-center space-x-4 text-gray-700 text-sm border-t pt-3">
          {bedrooms && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>{bedrooms.value} hab.</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span>{bathrooms.value} baños</span>
            </div>
          )}
          {area && (
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" />
              </svg>
              <span>{area.value} m²</span>
            </div>
          )}
        </div>

        {/* Agent */}
        {property.assigned_to && property.assigned_to.user && (
          <div className="flex items-center mt-3 pt-3 border-t text-sm text-gray-600">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center">
              {property.assigned_to.user.avatar ? (
                <img 
                  src={property.assigned_to.user.avatar} 
                  alt={property.assigned_to.user.first_name || 'Agente'}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-gray-600">
                  {property.assigned_to.user.first_name?.[0] || ''}{property.assigned_to.user.last_name?.[0] || ''}
                </span>
              )}
            </div>
            <span>
              {property.assigned_to.user.first_name || ''} {property.assigned_to.user.last_name || ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

