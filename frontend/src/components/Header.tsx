import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBarChart, FiUsers, FiDollarSign, FiSettings } from 'react-icons/fi';
import { theme } from '../styles/theme';

const HeaderContainer = styled(motion.header)`
  background: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  backdrop-filter: blur(10px);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.teamColors.hover});
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.inverse};
  font-size: 20px;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const LogoText = styled.div`
  h1 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin: 0;
  }
  
  p {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavItem = styled(motion.button)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.base};
  background: ${props => props.active ? theme.colors.accent : 'transparent'};
  color: ${props => props.active ? theme.colors.text.inverse : theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: ${theme.typography.fontSize.sm};
  transition: ${theme.transitions.normal};
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? theme.colors.teamColors.hover : theme.colors.surfaceHover};
    color: ${props => props.active ? theme.colors.text.inverse : theme.colors.text.primary};
  }
  
  svg {
    font-size: 16px;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.success}10;
  border: 1px solid ${theme.colors.success}30;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  color: ${theme.colors.success};
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${theme.colors.success};
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
  
  span {
    width: 100%;
    height: 2px;
    background: ${theme.colors.text.primary};
    transition: ${theme.transitions.fast};
    
    &:nth-child(1) {
      transform-origin: top left;
    }
    
    &:nth-child(3) {
      transform-origin: bottom left;
    }
  }
`;

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage = 'dashboard', onNavigate }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiBarChart },
    { id: 'teams', label: 'Teams', icon: FiUsers },
    { id: 'salary-cap', label: 'Salary Cap', icon: FiDollarSign },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <HeaderContent>
        <Logo>
          <LogoIcon>
            <FiBarChart />
          </LogoIcon>
          <LogoText>
            <h1>NFL Salary Cap</h1>
            <p>Real-time Tracker</p>
          </LogoText>
        </Logo>
        
        <Navigation>
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              active={currentPage === item.id}
              onClick={() => onNavigate?.(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon />
              {item.label}
            </NavItem>
          ))}
        </Navigation>
        
        <UserActions>
          <StatusIndicator>
            API Connected
          </StatusIndicator>
          
          <MobileMenuButton>
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </UserActions>
      </HeaderContent>
    </HeaderContainer>
  );
}; 