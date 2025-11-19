// ============================================
// PROPERTY DETAIL PAGE
// ============================================

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { AgentInfo } from '../components/property/AgentInfo';
import { Button, Loading } from '../components/common';
import { useFavorites } from '../hooks/useFavorites';
import { RealProperty, PropertyCharacteristic } from '../types';
import { propertyAPI } from '../services/api';
import { 
  updateMetaTags, 
  generatePropertyMetaTags, 
  generatePropertyStructuredData,
  insertStructuredData 
} from '../utils/seo';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [property, setProperty] = useState<RealProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Cerrar menú de compartir al hacer click fuera
  useEffect(() => {
    if (!showShareMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const shareMenu = document.getElementById('share-menu-container');
      if (shareMenu && !shareMenu.contains(target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  useEffect(() => {
    if (id) {
      loadProperty(parseInt(id));
    }
  }, [id]);

  const loadProperty = async (propertyId: number) => {
    setLoading(true);
    setError(false);
    try {
      const data = await propertyAPI.getProperty(propertyId);
      setProperty(data);

      // Update SEO meta tags
      const metaTags = generatePropertyMetaTags(data);
      updateMetaTags(metaTags);

      // Insert structured data
      const structuredData = generatePropertyStructuredData(data);
      insertStructuredData(structuredData);
    } catch (err) {
      console.error('Error loading property:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const groupCharacteristics = (characteristics: PropertyCharacteristic[]) => {
    const groups: Record<string, PropertyCharacteristic[]> = {
      general: [],
      dimensions: [],
      features: [],
    };

    // Códigos a excluir (honorarios)
    const excludedCodes = ['honor_porcentage', 'month_honor'].map(c => c.toLowerCase());

    characteristics.forEach(char => {
      const code = char.characteristic.code.toLowerCase();
      
      // Excluir características de honorarios
      if (excludedCodes.includes(code)) {
        return;
      }

      if (code.includes('area') || code.includes('dimension') || code.includes('metros')) {
        groups.dimensions.push(char);
      } else if (
        code.includes('habitacion') || 
        code.includes('bano') || 
        code.includes('bedroom') || 
        code.includes('bathroom') ||
        code.includes('parqueadero') ||
        code.includes('parking') ||
        code === 'garages'
      ) {
        groups.general.push(char);
      } else {
        groups.features.push(char);
      }
    });

    return groups;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="Cargando propiedad..." />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-6">La propiedad que buscas no existe o ha sido eliminada</p>
          <Button onClick={() => navigate('/propiedades')}>
            Ver todas las propiedades
          </Button>
        </div>
      </div>
    );
  }

  const characteristicGroups = groupCharacteristics(property.characteristics);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-[#ec7734]">
                Inicio
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => navigate('/propiedades')} className="hover:text-[#ec7734]">
                Propiedades
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{property.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <PropertyGallery images={property.images} propertyName={property.name} />

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Header */}
              <div className="border-b pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-[#ec7734]/10 text-[#ec7734] px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type_negotiation.name}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type_property.name}
                  </span>
                  {property.code && property.code !== 'NaH' && (
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      Código: {property.code}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.name}</h1>
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{property.address}</span>
                </div>
                <div className="text-gray-600 text-sm">
                  {property.parish?.name && `${property.parish.name}, `}
                  {property.municipality?.name && `${property.municipality.name}, `}
                  {property.state.name}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#ec7734] mb-2">
                  {formatPrice(property.price)}
                </div>
                {property.type_negotiation.name.toLowerCase().includes('venta') && parseFloat(property.rent_price) > 0 && (
                  <div className="text-gray-600">
                    También disponible en alquiler: {formatPrice(property.rent_price)}/mes
                  </div>
                )}
              </div>

              {/* General Characteristics */}
              {characteristicGroups.general.filter(char => {
                const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                return value !== null && value !== undefined && value !== '';
              }).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                  {characteristicGroups.general.filter(char => {
                    const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                    return value !== null && value !== undefined && value !== '';
                  }).map(char => (
                    <div key={char.id} className="text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {char.get_value_display || char.value}
                      </div>
                      <div className="text-sm text-gray-600">{char.characteristic.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {property.description && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Descripción</h2>
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: property.description }}
                  />
                </div>
              )}

              {/* Dimensions */}
              {characteristicGroups.dimensions.filter(char => {
                const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                return value !== null && value !== undefined && value !== '';
              }).length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Dimensiones</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {characteristicGroups.dimensions.filter(char => {
                      const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                      return value !== null && value !== undefined && value !== '';
                    }).map(char => (
                      <div key={char.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700">{char.characteristic.name}</span>
                        <span className="font-semibold text-gray-800">
                          {char.get_value_display || char.value} m²
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {characteristicGroups.features.filter(char => {
                const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                const isBool = typeof value === 'boolean';
                // Si es booleano, solo mostrar si es true
                if (isBool) {
                  return value === true;
                }
                // Si no es booleano, mostrar solo si tiene valor (no null, undefined, o vacío)
                return value !== null && value !== undefined && value !== '';
              }).length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Características</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {characteristicGroups.features.filter(char => {
                      const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                      const isBool = typeof value === 'boolean';
                      // Si es booleano, solo mostrar si es true
                      if (isBool) {
                        return value === true;
                      }
                      // Si no es booleano, mostrar solo si tiene valor (no null, undefined, o vacío)
                      return value !== null && value !== undefined && value !== '';
                    }).map(char => {
                      const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                      const isBool = typeof value === 'boolean';
                      
                      return (
                        <div key={char.id} className="flex items-center">
                          {isBool ? (
                            <>
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{char.characteristic.name}</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 text-[#ec7734] mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{char.characteristic.name}: </span>
                              <span className="ml-1 font-semibold text-gray-800">{value}</span>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="text-sm text-gray-500 pt-4 border-t">
                <p>Publicado: {new Date(property.created_at).toLocaleDateString('es-VE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                {property.updated_at !== property.created_at && (
                  <p>Actualizado: {new Date(property.updated_at).toLocaleDateString('es-VE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Agent Info */}
              <AgentInfo agent={property.assigned_to} franchise={property.franchise} />

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones</h3>
                <div className="space-y-3">
                  <Button 
                    fullWidth
                    onClick={() => property && toggleFavorite(property.id)}
                    variant={isFavorite(property?.id || 0) ? 'primary' : 'outline'}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg 
                        className="w-5 h-5" 
                        fill={isFavorite(property?.id || 0) ? 'currentColor' : 'none'} 
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
                      <span>
                        {isFavorite(property?.id || 0) ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                      </span>
                    </div>
                  </Button>
                  <div id="share-menu-container" className="relative">
                    <Button 
                      fullWidth
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      variant="outline"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>Compartir</span>
                        <svg className={`w-4 h-4 transition-transform ${showShareMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </Button>
                    {showShareMenu && (
                      <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(window.location.href);
                              alert('Link copiado al portapapeles');
                            } catch (err) {
                              const textArea = document.createElement('textarea');
                              textArea.value = window.location.href;
                              textArea.style.position = 'fixed';
                              textArea.style.opacity = '0';
                              document.body.appendChild(textArea);
                              textArea.select();
                              document.execCommand('copy');
                              document.body.removeChild(textArea);
                              alert('Link copiado al portapapeles');
                            }
                            setShowShareMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-5 h-5 text-[#ec7734]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-gray-700">Con contacto</span>
                        </button>
                        <button
                          onClick={() => {
                            if (property) {
                              navigate(`/propiedades/${property.id}/sincontacto/`);
                            }
                            setShowShareMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 border-t border-gray-200"
                        >
                          <svg className="w-5 h-5 text-[#ec7734]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-gray-700">Sin contacto</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

