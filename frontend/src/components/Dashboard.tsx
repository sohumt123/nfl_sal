import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { theme } from '../styles/theme';
import { Container, ErrorMessage } from '../styles/GlobalStyles';
import { TeamSelector } from './TeamSelector';
import { SalaryCapVisualization } from './SalaryCapVisualization';
import { Team, Contract, TeamCapSummary } from '../types';
import { apiService } from '../services/api';

const DashboardContainer = styled(motion.div)`
  flex: 1;
  padding: ${theme.spacing.xl} 0;
`;

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const YearSelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.base};
  padding: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.sm};
`;

const YearButton = styled(motion.button)<{ active: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  background: ${props => props.active ? theme.colors.accent : 'transparent'};
  color: ${props => props.active ? theme.colors.text.inverse : theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  
  &:hover {
    background: ${props => props.active ? theme.colors.teamColors.hover : theme.colors.surfaceHover};
    color: ${props => props.active ? theme.colors.text.inverse : theme.colors.text.primary};
  }
`;

const RefreshButton = styled(motion.button)<{ loading: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.base};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    background: ${theme.colors.surfaceHover};
    box-shadow: ${theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .icon {
    animation: ${props => props.loading ? 'spin 1s linear infinite' : 'none'};
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['5xl']};
  text-align: center;
  color: ${theme.colors.text.muted};
  
  .icon {
    font-size: 64px;
    margin-bottom: ${theme.spacing.lg};
    opacity: 0.5;
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    margin-bottom: ${theme.spacing.lg};
    max-width: 400px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.base};
  transition: ${theme.transitions.normal};
  
  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
  
  .label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${theme.spacing.xs};
  }
  
  .value {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
  }
`;

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [teamSummary, setTeamSummary] = useState<TeamCapSummary | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamsLoading, setTeamsLoading] = useState(true);


  const availableYears = Array.from({ length: 9 }, (_, i) => 2016 + i); // 2016-2024

  // Load teams on component mount
  useEffect(() => {
    const loadTeams = async () => {
      try {
        setTeamsLoading(true);
        const teamsData = await apiService.getTeams();
        setTeams(teamsData);
        // Auto-select first team if available
        if (teamsData.length > 0 && !selectedTeam) {
          setSelectedTeam(teamsData[0]);
        }
      } catch (err) {
        console.error('Error loading teams:', err);
        setError('Failed to load teams. Please check your connection and try again.');
      } finally {
        setTeamsLoading(false);
      }
    };

    loadTeams();
  }, [selectedTeam]);

  const loadTeamData = async () => {
    if (!selectedTeam) return;

    try {
      setLoading(true);
      setError(null);

      const [summaryData, contractsData] = await Promise.all([
        apiService.getTeamCapSummary(selectedTeam.id, selectedYear),
        apiService.getTeamContracts(selectedTeam.id, selectedYear)
      ]);

      setTeamSummary(summaryData);
      setContracts(contractsData);
    } catch (err) {
      console.error('Error loading team data:', err);
      setError('Failed to load salary cap data. This might be because there is no data for this team/year combination.');
      setTeamSummary(null);
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load team data when team or year changes
  useEffect(() => {
    if (selectedTeam && selectedYear) {
      loadTeamData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, selectedYear]);

  const handleRefresh = () => {
    if (selectedTeam) {
      loadTeamData();
    }
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setError(null);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setError(null);
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Container>
        <DashboardHeader>
          <HeaderLeft>
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              onTeamSelect={handleTeamSelect}
              loading={teamsLoading}
            />
            
            <YearSelector>
              <FiCalendar style={{ color: theme.colors.text.muted } as React.CSSProperties} />
              {availableYears.map((year) => (
                <YearButton
                  key={year}
                  active={selectedYear === year}
                  onClick={() => handleYearSelect(year)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {year}
                </YearButton>
              ))}
            </YearSelector>
          </HeaderLeft>
          
          <HeaderRight>
            <RefreshButton
              loading={loading}
              onClick={handleRefresh}
              disabled={loading || !selectedTeam}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiRefreshCw className="icon" />
              Refresh
            </RefreshButton>
          </HeaderRight>
        </DashboardHeader>

        {teamsLoading ? (
          <EmptyState>
            <div className="icon">
              <FiRefreshCw style={{ animation: 'spin 1s linear infinite' } as React.CSSProperties} />
            </div>
            <h3>Loading Teams</h3>
            <p>Please wait while we load the NFL teams...</p>
          </EmptyState>
        ) : !selectedTeam ? (
          <EmptyState>
            <div className="icon">
              <FiAlertCircle />
            </div>
            <h3>Select a Team</h3>
            <p>Choose an NFL team from the dropdown above to view their salary cap information.</p>
          </EmptyState>
        ) : (
          <>
            {error && (
              <ErrorMessage>
                <FiAlertCircle style={{ marginRight: theme.spacing.sm } as React.CSSProperties} />
                {error}
              </ErrorMessage>
            )}

            {teamSummary && (
              <StatsGrid>
                <StatCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="label">Total Teams</div>
                  <div className="value">{teams.length}</div>
                </StatCard>
                
                <StatCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="label">Active Contracts</div>
                  <div className="value">{contracts.length}</div>
                </StatCard>
                
                <StatCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="label">Selected Year</div>
                  <div className="value">{selectedYear}</div>
                </StatCard>
              </StatsGrid>
            )}

            <SalaryCapVisualization
              teamSummary={teamSummary}
              contracts={contracts}
              loading={loading}
              error={error || undefined}
            />
          </>
        )}
      </Container>
    </DashboardContainer>
  );
}; 