// ============================================
// API SERVICE - DJANGO REST FRAMEWORK
// ============================================

import axios, { AxiosInstance } from 'axios';
import {
  RealProperty,
  PropertyListResponse,
  PropertyFilters,
  TypeProperty,
  TypeNegotiation,
  State,
  Municipality,
  City,
  Parish,
  Characteristic,
} from '../types';

// Configure base URL - Django backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
// X-Company header: nombre del tenant (Company.name) - requerido por django-tenants
// IMPORTANTE: Crea un archivo .env en la raíz de ssr/ con: REACT_APP_COMPANY_NAME=nombre_del_tenant
// const X_COMPANY_HEADER = process.env.REACT_APP_COMPANY_NAME || 'default';
const API_KEY = process.env.REACT_APP_API_KEY || '';

// Log para debug (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    baseURL: API_BASE_URL,
  //  'X-Company': X_COMPANY_HEADER,
    warning: '⚠️ Si ves "default", crea un archivo .env con REACT_APP_COMPANY_NAME=nombre_del_tenant'
  });
}

class PropertyAPIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        //'X-Company': X_COMPANY_HEADER, // Requerido por el middleware de django-tenants
        'Authorization': `Api-Key ${API_KEY}`,
      },
      timeout: 10000,
    });

    // Interceptor para manejar errores y mostrar mensajes útiles
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 400) {
          const detail = error.response.data?.detail || error.response.data?.message;
          if (detail) {
            console.error('❌ Error 400:', detail);
            if (detail.includes('X-Company') || detail.includes('Tenant')) {
              console.error('💡 Solución: Crea un archivo .env en ssr/ con:');
              console.error('   REACT_APP_COMPANY_NAME=nombre_del_tenant');
              console.error('   Luego reinicia el servidor con: npm run build && npm run ssr');
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // ============================================
  // PROPERTIES ENDPOINTS
  // ============================================

  /**
   * Get paginated list of properties with filters
   */
  async getProperties(filters?: PropertyFilters): Promise<PropertyListResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          // Mapear nombres de campos del frontend a los del backend de inmobap
          let backendKey = key;
          
          // El backend de inmobap usa estos nombres directamente
          if (key === 'city') {
            // Inmobap usa 'parish' en lugar de 'city'
            backendKey = 'parish';
          }
          // search, type_property, type_negotiation, state, municipality se usan directamente
          
          if (key === 'characteristics' && typeof value === 'object') {
            Object.entries(value).forEach(([charKey, charValue]) => {
              params.append(`characteristics__${charKey}`, String(charValue));
            });
          } else {
            params.append(backendKey, String(value));
          }
        }
      });
    }

    const response = await this.client.get<PropertyListResponse>(
      `/web-properties/?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Get single property by ID
   */
  async getProperty(id: number): Promise<RealProperty> {
    const response = await this.client.get<RealProperty>(`/properties/${id}/`);
    return response.data;
  }

  // ============================================
  // CATALOG ENDPOINTS
  // ============================================

  /**
   * Get types of properties (Casa, Apartamento, etc.)
   */
  async getPropertyTypes(): Promise<TypeProperty[]> {
    const response = await this.client.get<any>('/property-types/');
    const data = response.data;
    // El endpoint puede devolver un objeto paginado o un array directo
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    }
    return [];
  }

  /**
   * Get types of negotiations (Venta, Alquiler)
   */
  async getNegotiationTypes(): Promise<TypeNegotiation[]> {
    const response = await this.client.get<any>('/type-negotiations/');
    const data = response.data;
    // El endpoint puede devolver un objeto paginado o un array directo
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    }
    return [];
  }

  /**
   * Get characteristics for filters
   */
  async getCharacteristics(): Promise<Characteristic[]> {
    const response = await this.client.get<Characteristic[]>('/characteristics/');
    return response.data;
  }

  // ============================================
  // LOCATION ENDPOINTS
  // ============================================

  /**
   * Get states
   */
  async getStates(countryId?: number): Promise<State[]> {
    const params = countryId ? `?country=${countryId}` : '';
    const url = params ? `/states/${params}` : '/states/';
    const response = await this.client.get<any>(url);
    // El endpoint puede devolver un objeto paginado o un array directo
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      // Es un objeto paginado
      return data.results;
    }
    return [];
  }

  /**
   * Get municipalities by state
   */
  async getMunicipalities(stateId: number): Promise<Municipality[]> {
    const response = await this.client.get<any>(
      `/municipalities/?state=${stateId}`
    );
    // El endpoint devuelve un objeto paginado
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    }
    return [];
  }

  /**
   * Get parishes by municipality (inmobap uses parishes instead of cities)
   */
  async getParishes(municipalityId: number): Promise<Parish[]> {
    const response = await this.client.get<any>(
      `/parishes/?municipality=${municipalityId}`
    );
    // El endpoint devuelve un objeto paginado
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    }
    return [];
  }

  /**
   * Get cities by municipality (deprecated - inmobap uses parishes)
   * @deprecated Use getParishes instead
   */
  async getCities(_municipalityId: number): Promise<City[]> {
    // Inmobap doesn't have a cities endpoint, return empty array
    // or use parishes as alternative
    return [];
  }
}

// Export singleton instance
export const propertyAPI = new PropertyAPIService();

// Export class for testing
export default PropertyAPIService;

