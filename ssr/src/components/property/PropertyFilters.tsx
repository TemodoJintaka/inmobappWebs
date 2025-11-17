// ============================================
// PROPERTY FILTERS COMPONENT
// ============================================

import React, { useState, useEffect } from 'react';
import { Input, Select, SearchableSelect, Button } from '../common';
import { useFiltersStorage } from '../../hooks/useFiltersStorage';
import { 
  TypeProperty, 
  TypeNegotiation, 
  State, 
  Municipality, 
  Parish,
  PropertyFilters as PropertyFiltersType 
} from '../../types';
import { propertyAPI } from '../../services/api';

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFiltersType) => void;
  initialFilters?: PropertyFiltersType;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ 
  onFilterChange,
  initialFilters 
}) => {
  const { saveFilters, clearFilters } = useFiltersStorage();
  const [search, setSearch] = useState(initialFilters?.search || '');
  const [typeProperty, setTypeProperty] = useState(initialFilters?.type_property?.toString() || '');
  const [typeNegotiation, setTypeNegotiation] = useState(initialFilters?.type_negotiation?.toString() || '');
  const [state, setState] = useState(initialFilters?.state?.toString() || '');
  const [municipality, setMunicipality] = useState(initialFilters?.municipality?.toString() || '');
  const [parish, setParish] = useState(initialFilters?.parish?.toString() || '');
  const [minPrice, setMinPrice] = useState(initialFilters?.min_price?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters?.max_price?.toString() || '');
  const [minTotalArea, setMinTotalArea] = useState(initialFilters?.min_total_area?.toString() || '');
  const [maxTotalArea, setMaxTotalArea] = useState(initialFilters?.max_total_area?.toString() || '');
  const [bedrooms, setBedrooms] = useState(initialFilters?.bedrooms?.toString() || '');
  const [bathrooms, setBathrooms] = useState(initialFilters?.bathrooms?.toString() || '');

  // Catalogs
  const [propertyTypes, setPropertyTypes] = useState<TypeProperty[]>([]);
  const [negotiationTypes, setNegotiationTypes] = useState<TypeNegotiation[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [parishes, setParishes] = useState<Parish[]>([]);

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadCatalogs();
  }, []);

  useEffect(() => {
    if (state) {
      loadMunicipalities(parseInt(state));
    } else {
      setMunicipalities([]);
      setMunicipality('');
    }
  }, [state]);

  useEffect(() => {
    if (municipality) {
      loadParishes(parseInt(municipality));
    } else {
      setParishes([]);
      setParish('');
    }
  }, [municipality]);

  const loadCatalogs = async () => {
    try {
      const [propTypes, negTypes, statesList] = await Promise.all([
        propertyAPI.getPropertyTypes(),
        propertyAPI.getNegotiationTypes(),
        propertyAPI.getStates(),
      ]);
      // Asegurar que siempre sean arrays
      setPropertyTypes(Array.isArray(propTypes) ? propTypes : []);
      setNegotiationTypes(Array.isArray(negTypes) ? negTypes : []);
      setStates(Array.isArray(statesList) ? statesList : []);
    } catch (error) {
      console.error('Error loading catalogs:', error);
      // En caso de error, establecer arrays vacíos
      setPropertyTypes([]);
      setNegotiationTypes([]);
      setStates([]);
    }
  };

  const loadMunicipalities = async (stateId: number) => {
    try {
      const data = await propertyAPI.getMunicipalities(stateId);
      setMunicipalities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading municipalities:', error);
      setMunicipalities([]);
    }
  };

  const loadParishes = async (municipalityId: number) => {
    try {
      const data = await propertyAPI.getParishes(municipalityId);
      setParishes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading parishes:', error);
      setParishes([]);
    }
  };

  const handleApplyFilters = () => {
    const filters: PropertyFiltersType = {
      search: search || undefined,
      type_property: typeProperty ? parseInt(typeProperty) : undefined,
      type_negotiation: typeNegotiation ? parseInt(typeNegotiation) : undefined,
      state: state ? parseInt(state) : undefined,
      municipality: municipality ? parseInt(municipality) : undefined,
      parish: parish ? parseInt(parish) : undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      min_total_area: minTotalArea ? parseFloat(minTotalArea) : undefined,
      max_total_area: maxTotalArea ? parseFloat(maxTotalArea) : undefined,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
    };
    
    // Guardar filtros en localStorage
    saveFilters(filters);
    
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    setSearch('');
    setTypeProperty('');
    setTypeNegotiation('');
    setState('');
    setMunicipality('');
    setParish('');
    setMinPrice('');
    setMaxPrice('');
    setMinTotalArea('');
    setMaxTotalArea('');
    setBedrooms('');
    setBathrooms('');
    
    // Limpiar filtros guardados
    clearFilters();
    
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filtros de Búsqueda</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#7367F0] hover:text-[#675DD8] md:hidden"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar'} filtros
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <Input
            label="Buscar"
            placeholder="Nombre, dirección, código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          {/* Type of Negotiation */}
          <Select
            label="Tipo de Negociación"
            value={typeNegotiation}
            onChange={(e) => setTypeNegotiation(e.target.value)}
            options={[
              { value: '', label: 'Todos' },
              ...(Array.isArray(negotiationTypes) ? negotiationTypes.map(t => ({ value: t.id, label: t.name })) : [])
            ]}
            fullWidth
          />

          {/* Type of Property */}
          <Select
            label="Tipo de Propiedad"
            value={typeProperty}
            onChange={(e) => setTypeProperty(e.target.value)}
            options={[
              { value: '', label: 'Todos' },
              ...(Array.isArray(propertyTypes) ? propertyTypes.map(t => ({ value: t.id, label: t.name })) : [])
            ]}
            fullWidth
          />

          {/* State */}
          <SearchableSelect
            label="Estado"
            placeholder="Buscar estado..."
            value={state}
            onChange={(value) => setState(value)}
            options={Array.isArray(states) ? states.map(s => ({ value: s.id, label: s.name })) : []}
            fullWidth
          />

          {/* Municipality */}
          <SearchableSelect
            label="Municipio"
            placeholder="Buscar municipio..."
            value={municipality}
            onChange={(value) => setMunicipality(value)}
            options={Array.isArray(municipalities) ? municipalities.map(m => ({ value: m.id, label: m.name })) : []}
            fullWidth
            className={!state ? 'opacity-50 pointer-events-none' : ''}
          />

          {/* Parish */}
          <SearchableSelect
            label="Parroquia"
            placeholder="Buscar parroquia..."
            value={parish}
            onChange={(value) => setParish(value)}
            options={Array.isArray(parishes) ? parishes.map(p => ({ value: p.id, label: p.name })) : []}
            fullWidth
            className={!municipality ? 'opacity-50 pointer-events-none' : ''}
          />

          {/* Min Price */}
          <Input
            label="Precio Mínimo"
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            fullWidth
          />

          {/* Max Price */}
          <Input
            label="Precio Máximo"
            type="number"
            placeholder="$0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            fullWidth
          />

          {/* Min Total Area */}
          <Input
            label="Área Total Mínima (m²)"
            type="number"
            placeholder="0"
            value={minTotalArea}
            onChange={(e) => setMinTotalArea(e.target.value)}
            fullWidth
          />

          {/* Max Total Area */}
          <Input
            label="Área Total Máxima (m²)"
            type="number"
            placeholder="0"
            value={maxTotalArea}
            onChange={(e) => setMaxTotalArea(e.target.value)}
            fullWidth
          />

          {/* Bedrooms */}
          <Input
            label="Habitaciones"
            type="number"
            placeholder="0"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            fullWidth
            min="0"
          />

          {/* Bathrooms */}
          <Input
            label="Baños"
            type="number"
            placeholder="0"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            fullWidth
            min="0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button onClick={handleApplyFilters} variant="primary">
            Aplicar Filtros
          </Button>
          <Button onClick={handleResetFilters} variant="outline">
            Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

