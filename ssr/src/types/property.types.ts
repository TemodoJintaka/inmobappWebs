// ============================================
// TYPES BASED ON DJANGO REALPROPERTY MODEL
// ============================================

export interface Location {
  id: number;
  name: string;
}

export interface Country extends Location {}
export interface State extends Location {}
export interface Municipality extends Location {}
export interface Parish extends Location {}
export interface City extends Location {}

export interface Category {
  id: number;
  name: string;
}

export interface TypeNegotiation extends Category {}
export interface TypeProperty extends Category {}
export interface Catalog extends Category {}

export interface Franchise {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar?: string;
}

export interface Membership {
  id: number;
  user: User;
  franchise: Franchise;
  role?: string;
}

export interface Client {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
}

export interface Characteristic {
  id: number;
  name: string;
  code: string;
  type_value: 'text' | 'decimal' | 'integer' | 'boolean';
  is_required: boolean;
}

export interface PropertyCharacteristic {
  id: number;
  characteristic: Characteristic;
  value: string;
  display_value?: string | number | boolean;
  get_value_display?: string | number | boolean;
}

export interface PropertyImage {
  id: number;
  image: string;
  order: number;
}

export interface RealProperty {
  id: number;
  name: string;
  code: string;
  description: string;
  franchise: Franchise;
  assigned_to: Membership | null;
  status: Catalog | null;
  type_negotiation: TypeNegotiation;
  type_property: TypeProperty;
  price: string;
  initial_price?: string;
  rent_price: string;
  country: Country;
  state: State;
  municipality?: Municipality;
  parish?: Parish;
  city?: City;
  address: string;
  owner?: Client;
  characteristics: PropertyCharacteristic[];
  images: PropertyImage[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by?: User;
  updated_by?: User;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PropertyListResponse extends PaginatedResponse<RealProperty> {}

// ============================================
// FILTER TYPES
// ============================================

export interface PropertyFilters {
  search?: string;
  type_property?: number;
  type_negotiation?: number;
  state?: number;
  municipality?: number;
  parish?: number; // Inmobap uses parish instead of city
  city?: number; // Deprecated - kept for backward compatibility
  min_price?: number;
  max_price?: number;
  min_total_area?: number; // Área total mínima
  max_total_area?: number; // Área total máxima
  bedrooms?: number; // Número mínimo de habitaciones
  bathrooms?: number; // Número mínimo de baños
  characteristics?: Record<string, string | number | boolean>;
  assigned_to?: number;
  page?: number;
  page_size?: number;
  ordering?: string;
}

// ============================================
// UI SPECIFIC TYPES
// ============================================

export interface PropertyCardProps {
  property: RealProperty;
  onClick?: (property: RealProperty) => void;
}

export interface PropertyFilterFormData {
  search: string;
  type_property: string;
  type_negotiation: string;
  state: string;
  municipality: string;
  city: string;
  min_price: string;
  max_price: string;
}

