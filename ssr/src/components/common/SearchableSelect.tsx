// ============================================
// SEARCHABLE SELECT COMPONENT
// Select con búsqueda integrada
// ============================================

import React, { useState, useEffect, useRef } from 'react';

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  options: Array<{ value: string | number; label: string }>;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  placeholder = 'Buscar...',
  options,
  value,
  onChange,
  error,
  fullWidth = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const widthClass = fullWidth ? 'w-full' : '';

  // Filtrar opciones según el término de búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(opt => String(opt.value) === value);

  const handleSelect = (optionValue: string | number) => {
    onChange(String(optionValue));
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${widthClass} ${className}`} ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Input de búsqueda */}
      <div className="relative">
        <input
          type="text"
          value={isOpen ? searchTerm : (selectedOption?.label || '')}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={selectedOption ? selectedOption.label : placeholder}
          className={`
            w-full px-4 py-2 border rounded-lg pr-10
            focus:outline-none focus:ring-2 focus:ring-[#ec7734] focus:border-transparent
            ${error ? 'border-[#FF4C51]' : 'border-gray-300'}
            ${isOpen ? 'rounded-b-none' : ''}
          `}
        />
        
        {/* Icono de búsqueda/chevron */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isOpen ? (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>

        {/* Dropdown de opciones */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-b-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No se encontraron resultados
              </div>
            ) : (
              <ul className="py-1">
                {filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      px-4 py-2 cursor-pointer text-sm hover:bg-[#ec7734]/10 transition-colors
                      ${String(option.value) === value ? 'bg-[#ec7734]/20 text-[#ec7734] font-medium' : 'text-gray-700'}
                    `}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Botón para limpiar selección */}
      {value && !isOpen && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange('');
            setSearchTerm('');
          }}
          className="absolute right-8 top-8 text-gray-400 hover:text-gray-600"
          title="Limpiar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {error && (
        <p className="mt-1 text-sm text-[#FF4C51]">{error}</p>
      )}
    </div>
  );
};

