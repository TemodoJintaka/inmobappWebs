// ============================================
// BUTTON COMPONENT
// ============================================

import React from 'react';

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
    primary: 'bg-[#7367F0] text-white hover:bg-[#675DD8] focus:ring-[#7367F0]',
    secondary: 'bg-[#808390] text-white hover:bg-[#737682] focus:ring-[#808390]',
    outline: 'bg-white text-[#7367F0] border-2 border-[#7367F0] hover:bg-[#7367F0]/10 focus:ring-[#7367F0]',
    danger: 'bg-[#FF4C51] text-white hover:bg-[#E64449] focus:ring-[#FF4C51]',
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

