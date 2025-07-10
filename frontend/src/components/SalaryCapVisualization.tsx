import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiInfo } from 'react-icons/fi';
import { theme } from '../styles/theme';
import { Contract, TeamCapSummary } from '../types';
import { LoadingSpinner } from '../styles/GlobalStyles';

const VisualizationContainer = styled(motion.div)`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  overflow: hidden;
`;

const VisualizationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.border.light};
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const TeamLogo = styled.div<{ teamColor?: string }>`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.teamColor || theme.colors.accent}, ${props => props.teamColor || theme.colors.teamColors.hover});
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.inverse};
  font-size: 24px;
  font-weight: ${theme.typography.fontWeight.bold};
  box-shadow: ${theme.shadows.md};
`;

const TeamDetails = styled.div`
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xs};
  }
  
  p {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.muted};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const CapSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const CapSummaryCard = styled(motion.div)<{ variant?: 'success' | 'warning' | 'error' }>`
  background: ${props => {
    switch (props.variant) {
      case 'success': return theme.colors.success + '10';
      case 'warning': return theme.colors.warning + '10';
      case 'error': return theme.colors.error + '10';
      default: return theme.colors.background;
    }
  }};
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'success': return theme.colors.success + '30';
      case 'warning': return theme.colors.warning + '30';
      case 'error': return theme.colors.error + '30';
      default: return theme.colors.border.light;
    }
  }};
  border-radius: ${theme.borderRadius.base};
  padding: ${theme.spacing.md};
  text-align: center;
  
  .value {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${props => {
      switch (props.variant) {
        case 'success': return theme.colors.success;
        case 'warning': return theme.colors.warning;
        case 'error': return theme.colors.error;
        default: return theme.colors.text.primary;
      }
    }};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const SalaryCapChart = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.base};
  overflow: hidden;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border.light};
`;

const CapThresholds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const CapLine = styled.div<{ position: number; label: string; color: string }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${props => props.position}%;
  height: 2px;
  background: ${props => props.color};
  z-index: 2;
  
  &::after {
    content: '${props => props.label}';
    position: absolute;
    right: ${theme.spacing.md};
    top: -12px;
    font-size: ${theme.typography.fontSize.xs};
    color: ${props => props.color};
    background: ${theme.colors.surface};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    box-shadow: ${theme.shadows.sm};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const ContractsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  padding: ${theme.spacing.md};
  gap: 2px;
`;

const ContractBlock = styled(motion.div)<{ 
  height: number; 
  teamColor?: string; 
  isHighlighted?: boolean;
}>`
  height: ${props => props.height}px;
  background: ${props => props.teamColor || theme.colors.accent};
  border-radius: ${theme.borderRadius.sm};
  position: relative;
  cursor: pointer;
  transition: ${theme.transitions.normal};
  border: 2px solid ${props => props.isHighlighted ? theme.colors.accent : 'transparent'};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
    z-index: 10;
  }
`;

const ContractTooltip = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.sm};
  white-space: nowrap;
  box-shadow: ${theme.shadows.lg};
  z-index: 20;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: ${theme.colors.primary};
  }
`;

const PlayerCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.base};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  transition: ${theme.transitions.normal};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-1px);
  }
`;

const PlayerAvatar = styled.div<{ bgColor?: string }>`
  width: 48px;
  height: 48px;
  background: ${props => props.bgColor || theme.colors.accent};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.inverse};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.lg};
`;

const PlayerInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .position {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ContractValue = styled.div`
  text-align: right;
  
  .amount {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.success};
  }
  
  .label {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

interface SalaryCapVisualizationProps {
  teamSummary: TeamCapSummary | null;
  contracts: Contract[];
  loading?: boolean;
  error?: string;
}

export const SalaryCapVisualization: React.FC<SalaryCapVisualizationProps> = ({
  teamSummary,
  contracts,
  loading = false,
  error
}) => {
  const [hoveredContract, setHoveredContract] = useState<Contract | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getContractHeight = (contract: Contract) => {
    if (!teamSummary) return 0;
    const percentage = (contract.cap_hit / teamSummary.salary_cap) * 100;
    return Math.max(percentage * 3, 8); // Min height of 8px
  };

  const getCapLinePosition = (amount: number) => {
    if (!teamSummary) return 0;
    return ((teamSummary.salary_cap - amount) / teamSummary.salary_cap) * 100;
  };

  if (loading) {
    return (
      <VisualizationContainer>
        <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
          <LoadingSpinner />
          <p style={{ marginTop: theme.spacing.md, color: theme.colors.text.secondary }}>
            Loading salary cap data...
          </p>
        </div>
      </VisualizationContainer>
    );
  }

  if (error) {
    return (
      <VisualizationContainer>
        <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
          <FiInfo style={{ fontSize: '48px', color: theme.colors.error, marginBottom: theme.spacing.md } as React.CSSProperties} />
          <p style={{ color: theme.colors.error, fontSize: theme.typography.fontSize.lg }}>
            {error}
          </p>
        </div>
      </VisualizationContainer>
    );
  }

  if (!teamSummary) {
    return (
      <VisualizationContainer>
        <div style={{ textAlign: 'center', padding: theme.spacing.xl }}>
          <p style={{ color: theme.colors.text.secondary }}>
            No salary cap data available
          </p>
        </div>
      </VisualizationContainer>
    );
  }

  return (
    <VisualizationContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VisualizationHeader>
        <TeamInfo>
          <TeamLogo>
            {teamSummary.team.abbreviation}
          </TeamLogo>
          <TeamDetails>
            <h2>{teamSummary.team.city} {teamSummary.team.name}</h2>
            <p>Salary Cap - {teamSummary.year}</p>
          </TeamDetails>
        </TeamInfo>
      </VisualizationHeader>

      <CapSummaryGrid>
        <CapSummaryCard variant="success">
          <div className="value">{formatCurrency(teamSummary.remaining_cap)}</div>
          <div className="label">Remaining Cap</div>
        </CapSummaryCard>
        
        <CapSummaryCard>
          <div className="value">{formatCurrency(teamSummary.total_cap_hit)}</div>
          <div className="label">Total Cap Hit</div>
        </CapSummaryCard>
        
        <CapSummaryCard variant={teamSummary.cap_percentage_used > 90 ? 'warning' : 'success'}>
          <div className="value">{teamSummary.cap_percentage_used.toFixed(1)}%</div>
          <div className="label">Cap Used</div>
        </CapSummaryCard>
        
        <CapSummaryCard>
          <div className="value">{teamSummary.contract_count}</div>
          <div className="label">Contracts</div>
        </CapSummaryCard>
      </CapSummaryGrid>

      <SalaryCapChart>
        <CapThresholds>
          <CapLine 
            position={getCapLinePosition(teamSummary.salary_cap)}
            label="Salary Cap"
            color={theme.colors.error}
          />
          <CapLine 
            position={getCapLinePosition(teamSummary.salary_floor)}
            label="Salary Floor"
            color={theme.colors.warning}
          />
        </CapThresholds>
        
        <ContractsContainer>
          {contracts.map((contract, index) => (
            <ContractBlock
              key={contract.id}
              height={getContractHeight(contract)}
              teamColor={theme.colors.accent}
              isHighlighted={selectedContract?.id === contract.id}
              onMouseEnter={() => setHoveredContract(contract)}
              onMouseLeave={() => setHoveredContract(null)}
              onClick={() => setSelectedContract(contract)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AnimatePresence>
                {hoveredContract?.id === contract.id && (
                  <ContractTooltip
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {contract.player?.name} - {formatCurrency(contract.cap_hit)}
                  </ContractTooltip>
                )}
              </AnimatePresence>
            </ContractBlock>
          ))}
        </ContractsContainer>
      </SalaryCapChart>

      {selectedContract && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlayerCard>
            <PlayerAvatar>
              <FiUser />
            </PlayerAvatar>
            <PlayerInfo>
              <div className="name">{selectedContract.player?.name || 'Unknown Player'}</div>
              <div className="position">{selectedContract.player?.position || 'N/A'}</div>
            </PlayerInfo>
            <ContractValue>
              <div className="amount">{formatCurrency(selectedContract.cap_hit)}</div>
              <div className="label">Cap Hit</div>
            </ContractValue>
          </PlayerCard>
        </motion.div>
      )}
    </VisualizationContainer>
  );
}; 