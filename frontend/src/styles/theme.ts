export const theme = {
  // Color palette - Professional and modern
  colors: {
    primary: '#1a202c', // Dark blue-gray
    secondary: '#2d3748', // Lighter gray
    accent: '#4299e1', // Professional blue
    success: '#38a169', // Green
    warning: '#ed8936', // Orange
    error: '#e53e3e', // Red
    
    // Background colors
    background: '#f7fafc', // Light gray background
    surface: '#ffffff', // White surface
    surfaceHover: '#f1f5f9', // Light hover
    
    // Text colors
    text: {
      primary: '#1a202c', // Dark text
      secondary: '#4a5568', // Gray text
      muted: '#718096', // Muted text
      inverse: '#ffffff', // White text
    },
    
    // Border colors
    border: {
      light: '#e2e8f0', // Light border
      medium: '#cbd5e0', // Medium border
      dark: '#a0aec0', // Dark border
    },
    
    // Salary cap specific colors
    salaryCapVisual: {
      capHit: '#4299e1', // Blue for cap hits
      guaranteed: '#38a169', // Green for guaranteed money
      remaining: '#e2e8f0', // Light gray for remaining cap
      overCap: '#e53e3e', // Red for over cap
      capLine: '#2d3748', // Dark line for cap limit
      floor: '#ed8936', // Orange for salary floor
    },
    
    // NFL team colors (can be overridden by actual team colors)
    teamColors: {
      default: '#4299e1',
      hover: '#3182ce',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
    '5xl': '8rem',  // 128px
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  
  // Transitions
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
    
    // Specific transition types
    transform: 'transform 0.3s ease-in-out',
    opacity: 'opacity 0.3s ease-in-out',
    colors: 'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out',
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },
};

export type Theme = typeof theme; 