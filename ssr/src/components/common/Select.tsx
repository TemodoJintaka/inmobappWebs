// ============================================
// SELECT COMPONENT
// ============================================

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: Array<{ value: string | number; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  fullWidth = false,
  options,
  className = '',
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`
          px-4 py-2 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-[#7367F0] focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${widthClass}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

