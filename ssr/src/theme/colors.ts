// ============================================
// INMOBAPP COLOR THEME
// Basado en el sistema de colores de InmobApp Frontend
// ============================================

export const inmobappColors = {
  // Primary colors - Naranja característico de InmobApp
  primary: {
    main: '#ec7734',
    light: '#f09558',
    dark: '#d66a2e',
    lighter: 'rgba(236, 119, 52, 0.08)',
    lightOpacity: 'rgba(236, 119, 52, 0.16)',
  },
  
  // Secondary colors
  secondary: {
    main: '#808390',
    light: '#999CA6',
    dark: '#737682',
  },
  
  // Feedback colors
  error: {
    main: '#FF4C51',
    light: '#FF7074',
    dark: '#E64449',
  },
  
  warning: {
    main: '#FF9F43',
    light: '#FFB269',
    dark: '#E68F3C',
  },
  
  info: {
    main: '#00BAD1',
    light: '#33C8DA',
    dark: '#00A7BC',
  },
  
  success: {
    main: '#28C76F',
    light: '#53D28C',
    dark: '#24B364',
  },
  
  // Neutral colors
  gray: {
    50: '#F8F7FA',
    100: '#EEEDF0',
    200: '#E2E1E5',
    300: '#D4D3D8',
    400: '#999CA6',
    500: '#808390',
    600: '#737682',
    700: '#5E616E',
    800: '#4A4D5A',
    900: '#2F3349',
  },
  
  // Background colors
  background: {
    default: '#F8F7FA',
    paper: '#FFFFFF',
  },
};

// CSS Classes helpers para usar con Tailwind
export const primaryClasses = {
  bg: 'bg-[#ec7734]',
  bgHover: 'hover:bg-[#d66a2e]',
  text: 'text-[#ec7734]',
  textHover: 'hover:text-[#ec7734]',
  border: 'border-[#ec7734]',
  ring: 'ring-[#ec7734]',
  focus: 'focus:ring-[#ec7734]',
  bgLight: 'bg-[#ec7734]/10',
};

export const secondaryClasses = {
  bg: 'bg-[#808390]',
  bgHover: 'hover:bg-[#737682]',
  text: 'text-[#808390]',
  textHover: 'hover:text-[#808390]',
  border: 'border-[#808390]',
};

export const successClasses = {
  bg: 'bg-[#28C76F]',
  text: 'text-[#28C76F]',
  border: 'border-[#28C76F]',
};

export const errorClasses = {
  bg: 'bg-[#FF4C51]',
  text: 'text-[#FF4C51]',
  border: 'border-[#FF4C51]',
};

export const warningClasses = {
  bg: 'bg-[#FF9F43]',
  text: 'text-[#FF9F43]',
  border: 'border-[#FF9F43]',
};

export const infoClasses = {
  bg: 'bg-[#00BAD1]',
  text: 'text-[#00BAD1]',
  border: 'border-[#00BAD1]',
};

