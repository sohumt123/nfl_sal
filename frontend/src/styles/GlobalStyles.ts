import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    margin-bottom: ${theme.spacing.sm};
  }

  h1 {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
  }

  h3 {
    font-size: ${theme.typography.fontSize.xl};
  }

  h4 {
    font-size: ${theme.typography.fontSize.lg};
  }

  h5 {
    font-size: ${theme.typography.fontSize.base};
  }

  h6 {
    font-size: ${theme.typography.fontSize.sm};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.colors};

    &:hover {
      color: ${theme.colors.teamColors.hover};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    transition: ${theme.transitions.normal};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${theme.colors.border.medium};
    border-radius: ${theme.borderRadius.base};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    transition: ${theme.transitions.colors};

    &:focus {
      outline: none;
      border-color: ${theme.colors.accent};
      box-shadow: 0 0 0 2px ${theme.colors.accent}20;
    }
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border.medium};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.border.dark};
  }

  /* Custom utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

// Common styled components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
  }
`;

export const Card = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.base};
  border: 1px solid ${theme.colors.border.light};
  transition: ${theme.transitions.normal};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.base};
  transition: ${theme.transitions.normal};
  text-decoration: none;
  
  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.text.inverse};
          border: 1px solid ${theme.colors.secondary};
          
          &:hover {
            background: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.accent};
          border: 1px solid ${theme.colors.accent};
          
          &:hover {
            background: ${theme.colors.accent};
            color: ${theme.colors.text.inverse};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text.primary};
          border: 1px solid transparent;
          
          &:hover {
            background: ${theme.colors.surfaceHover};
          }
        `;
      default:
        return `
          background: ${theme.colors.accent};
          color: ${theme.colors.text.inverse};
          border: 1px solid ${theme.colors.accent};
          
          &:hover {
            background: ${theme.colors.teamColors.hover};
            border-color: ${theme.colors.teamColors.hover};
          }
        `;
    }
  }}
  
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
    }
  }
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.border.light};
  border-radius: 50%;
  border-top-color: ${theme.colors.accent};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  background: ${theme.colors.error}10;
  border: 1px solid ${theme.colors.error}30;
  border-radius: ${theme.borderRadius.base};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  font-size: ${theme.typography.fontSize.sm};
`;

export const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  background: ${theme.colors.success}10;
  border: 1px solid ${theme.colors.success}30;
  border-radius: ${theme.borderRadius.base};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  font-size: ${theme.typography.fontSize.sm};
`; 