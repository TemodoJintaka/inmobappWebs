// ============================================
// PROPERTY DETAIL PAGE
// ============================================

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { AgentInfo } from '../components/property/AgentInfo';
import { Button, Loading } from '../components/common';
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
  const [property, setProperty] = useState<RealProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

    characteristics.forEach(char => {
      const code = char.characteristic.code.toLowerCase();
      if (code.includes('area') || code.includes('dimension') || code.includes('metros')) {
        groups.dimensions.push(char);
      } else if (
        code.includes('habitacion') || 
        code.includes('bano') || 
        code.includes('bedroom') || 
        code.includes('bathroom') ||
        code.includes('parqueadero') ||
        code.includes('parking')
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
              <button onClick={() => navigate('/')} className="hover:text-blue-600">
                Inicio
              </button>
            </li>
            <li>/</li>
            <li>
              <button onClick={() => navigate('/propiedades')} className="hover:text-blue-600">
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
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
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
                  {property.city?.name && `${property.city.name}, `}
                  {property.municipality?.name && `${property.municipality.name}, `}
                  {property.state.name}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatPrice(property.price)}
                </div>
                {property.type_negotiation.name.toLowerCase().includes('venta') && parseFloat(property.rent_price) > 0 && (
                  <div className="text-gray-600">
                    También disponible en alquiler: {formatPrice(property.rent_price)}/mes
                  </div>
                )}
              </div>

              {/* General Characteristics */}
              {characteristicGroups.general.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b">
                  {characteristicGroups.general.map(char => (
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
                  <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                </div>
              )}

              {/* Dimensions */}
              {characteristicGroups.dimensions.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Dimensiones</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {characteristicGroups.dimensions.map(char => (
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
              {characteristicGroups.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Características</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {characteristicGroups.features.map(char => {
                      const value = char.get_value_display !== undefined ? char.get_value_display : char.value;
                      const isBool = typeof value === 'boolean';
                      
                      return (
                        <div key={char.id} className="flex items-center">
                          {isBool ? (
                            <>
                              {value ? (
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              )}
                              <span className="text-gray-700">{char.characteristic.name}</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
                    onClick={() => window.print()}
                    variant="outline"
                  >
                    Imprimir
                  </Button>
                  <Button 
                    fullWidth
                    onClick={() => {
                      navigator.share?.({
                        title: property.name,
                        text: property.description,
                        url: window.location.href,
                      });
                    }}
                    variant="outline"
                  >
                    Compartir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

