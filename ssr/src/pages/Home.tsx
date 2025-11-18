// ============================================
// HOME PAGE - LANDING PAGE
// ============================================

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from '../components/common';
import { PropertyCard } from '../components/property';
import { RealProperty } from '../types';
import { propertyAPI } from '../services/api';
import { updateMetaTags } from '../utils/seo';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<RealProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update SEO meta tags
    updateMetaTags({
      title: 'InmobApp - Encuentra tu propiedad ideal',
      description: 'Descubre las mejores propiedades en venta y alquiler. Casas, apartamentos, locales comerciales y más. Sistema MLS con búsqueda avanzada.',
      keywords: 'propiedades, inmuebles, bienes raíces, venta, alquiler, casas, apartamentos, InmobApp',
      ogTitle: 'InmobApp - Tu hogar ideal te espera',
      ogDescription: 'Explora miles de propiedades con nuestro sistema. Encuentra, compara y elige tu próximo hogar.',
      ogType: 'website',
      canonical: '/',
    });

    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const response = await propertyAPI.getProperties({ 
        page_size: 6,
        ordering: '-created_at'
      });
      setFeaturedProperties(response.results);
    } catch (error) {
      console.error('Error loading featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyClick = (property: RealProperty) => {
    navigate(`/propiedades/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7367F0] to-[#675DD8] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Encuentra tu Propiedad Ideal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Miles de propiedades disponibles para venta y alquiler. 
              Búsqueda inteligente con filtros avanzados.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/propiedades')}
                className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-[#7367F0] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Comenzar Búsqueda
              </button>
              <button
                onClick={() => navigate('/propiedades?type_negotiation=1')}
                className="px-6 py-3 text-lg font-semibold rounded-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#7367F0] transition-all duration-200"
              >
                Propiedades en Venta
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7367F0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7367F0]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Asesores Expertos</h3>
              <p className="text-gray-600">
                Equipo profesional con años de experiencia para guiarte en cada paso
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7367F0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7367F0]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sistema MLS Avanzado</h3>
              <p className="text-gray-600">
                Búsqueda inteligente con filtros avanzados para encontrar exactamente lo que buscas
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#7367F0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#7367F0]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Propiedades Verificadas</h3>
              <p className="text-gray-600">
                Todas las propiedades verificadas con información detallada y fotografías reales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Propiedades Destacadas
            </h2>
            <Link 
              to="/propiedades" 
              className="text-[#7367F0] hover:text-[#675DD8] font-semibold flex items-center"
            >
              Ver todas
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <Loading text="Cargando propiedades destacadas..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onClick={handlePropertyClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7367F0] to-[#675DD8] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para encontrar tu próximo hogar?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Explora nuestra amplia selección de propiedades y encuentra la perfecta para ti
          </p>
          <button
            onClick={() => navigate('/propiedades')}
            className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-[#7367F0] hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ver Todas las Propiedades
          </button>
        </div>
      </section>
    </div>
  );
};

