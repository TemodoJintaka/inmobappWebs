// ============================================
// BUTTON COMPONENT
// ============================================

import React from 'react';
import { primaryClasses, secondaryClasses, errorClasses } from '../../theme/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: `${primaryClasses.bg} text-white ${primaryClasses.bgHover} ${primaryClasses.ring}`,
    secondary: `${secondaryClasses.bg} text-white ${secondaryClasses.bgHover} ring-${secondaryClasses.bg}`,
    outline: `bg-white ${primaryClasses.text} border-2 ${primaryClasses.border} ${primaryClasses.bgLight} ${primaryClasses.ring}`,
    danger: `${errorClasses.bg} text-white hover:bg-[#E64449] ring-${errorClasses.bg}`,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

