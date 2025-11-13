// ============================================
// PROPERTY LIST PAGE
// ============================================

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilters } from '../components/property/PropertyFilters';
import { Pagination, Loading } from '../components/common';
import { RealProperty, PropertyFilters as PropertyFiltersType } from '../types';
import { propertyAPI } from '../services/api';
import { updateMetaTags, generateListingMetaTags } from '../utils/seo';

const PAGE_SIZE = 12;

export const PropertyList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [properties, setProperties] = useState<RealProperty[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFiltersType>({});

  useEffect(() => {
    // Parse filters from URL params
    const urlFilters: PropertyFiltersType = {
      search: searchParams.get('search') || undefined,
      type_property: searchParams.get('type_property') ? parseInt(searchParams.get('type_property')!) : undefined,
      type_negotiation: searchParams.get('type_negotiation') ? parseInt(searchParams.get('type_negotiation')!) : undefined,
      state: searchParams.get('state') ? parseInt(searchParams.get('state')!) : undefined,
      municipality: searchParams.get('municipality') ? parseInt(searchParams.get('municipality')!) : undefined,
      parish: searchParams.get('parish') ? parseInt(searchParams.get('parish')!) : undefined,
      // Backward compatibility: also check 'city' param
      city: searchParams.get('city') ? parseInt(searchParams.get('city')!) : undefined,
      min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
      max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    };

    setFilters(urlFilters);
    setCurrentPage(urlFilters.page || 1);
    loadProperties(urlFilters);
  }, [searchParams]);

  const loadProperties = async (currentFilters: PropertyFiltersType) => {
    setLoading(true);
    try {
      const response = await propertyAPI.getProperties({
        ...currentFilters,
        page: currentFilters.page || 1,
        page_size: PAGE_SIZE,
        ordering: '-created_at',
      });
      
      setProperties(response.results);
      setTotalCount(response.count);

      // Update SEO meta tags
      const metaTags = generateListingMetaTags(response.count, currentFilters);
      updateMetaTags(metaTags);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: PropertyFiltersType) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 when filters change
    params.set('page', '1');
    
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertyClick = (property: RealProperty) => {
    navigate(`/propiedades/${property.id}`);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Propiedades Disponibles
          </h1>
          <p className="text-gray-600">
            {loading ? 'Cargando...' : `${totalCount} propiedades encontradas`}
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters 
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />

        {/* Results */}
        {loading ? (
          <Loading text="Cargando propiedades..." />
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron propiedades
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar los filtros de búsqueda para obtener más resultados
            </p>
          </div>
        ) : (
          <>
            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onClick={handlePropertyClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mb-8"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

