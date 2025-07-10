import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiUsers } from 'react-icons/fi';
import { theme } from '../styles/theme';
import { Team } from '../types';

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 280px;
`;

const SelectorButton = styled(motion.button)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border: 2px solid ${props => props.isOpen ? theme.colors.accent : theme.colors.border.light};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}20;
  }
`;

const SelectedTeam = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

const TeamAvatar = styled.div<{ teamColor?: string }>`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, ${props => props.teamColor || theme.colors.accent}, ${props => props.teamColor || theme.colors.teamColors.hover});
  border-radius: ${theme.borderRadius.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.inverse};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const TeamInfo = styled.div`
  text-align: left;
  
  .name {
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.text.primary};
    margin-bottom: 2px;
  }
  
  .conference {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ChevronIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.secondary};
  font-size: 20px;
`;

const DropdownContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${theme.spacing.xs};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.base};
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.dropdown};
  max-height: 400px;
  overflow-y: auto;
`;

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  background: ${theme.colors.surface};
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 40px;
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.base};
  font-size: ${theme.typography.fontSize.sm};
  background: ${theme.colors.background};
  
  &::placeholder {
    color: ${theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px ${theme.colors.accent}20;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.muted};
  font-size: 16px;
  pointer-events: none;
`;

const ConferenceSection = styled.div`
  padding: ${theme.spacing.sm} 0;
`;

const ConferenceHeader = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border.light};
`;

const TeamOption = styled(motion.div)<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  cursor: pointer;
  background: ${props => props.isSelected ? theme.colors.accent + '10' : 'transparent'};
  border-left: 3px solid ${props => props.isSelected ? theme.colors.accent : 'transparent'};
  transition: ${theme.transitions.normal};
  
  &:hover {
    background: ${props => props.isSelected ? theme.colors.accent + '20' : theme.colors.surfaceHover};
  }
`;

const TeamOptionInfo = styled.div`
  flex: 1;
  
  .name {
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.primary};
    margin-bottom: 2px;
  }
  
  .location {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
  }
`;

const EmptyState = styled.div`
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.text.muted};
  
  .icon {
    font-size: 48px;
    margin-bottom: ${theme.spacing.md};
    opacity: 0.5;
  }
`;

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: Team | null;
  onTeamSelect: (team: Team) => void;
  loading?: boolean;
  error?: string;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({
  teams,
  selectedTeam,
  onTeamSelect,
  loading = false,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter teams based on search term
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.abbreviation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group teams by conference
  const afcTeams = filteredTeams.filter(team => team.conference === 'AFC');
  const nfcTeams = filteredTeams.filter(team => team.conference === 'NFC');

  const handleTeamSelect = (team: Team) => {
    onTeamSelect(team);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!loading) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SelectorContainer ref={selectorRef}>
      <SelectorButton
        isOpen={isOpen}
        onClick={handleToggle}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {selectedTeam ? (
          <SelectedTeam>
            <TeamAvatar teamColor={selectedTeam.primary_color}>
              {selectedTeam.abbreviation}
            </TeamAvatar>
            <TeamInfo>
              <div className="name">{selectedTeam.city} {selectedTeam.name}</div>
              <div className="conference">{selectedTeam.conference} {selectedTeam.division}</div>
            </TeamInfo>
          </SelectedTeam>
        ) : (
          <SelectedTeam>
            <TeamAvatar>
              <FiUsers />
            </TeamAvatar>
            <TeamInfo>
              <div className="name">Select a Team</div>
              <div className="conference">Choose team to view</div>
            </TeamInfo>
          </SelectedTeam>
        )}
        
        <ChevronIcon
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown />
        </ChevronIcon>
      </SelectorButton>

      <AnimatePresence>
        {isOpen && (
          <DropdownContainer
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <SearchContainer>
              <div style={{ position: 'relative' }}>
                <SearchIcon>
                  <FiSearch />
                </SearchIcon>
                <SearchInput
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </SearchContainer>

            {filteredTeams.length === 0 ? (
              <EmptyState>
                <div className="icon">
                  <FiUsers />
                </div>
                <p>No teams found</p>
              </EmptyState>
            ) : (
              <>
                {afcTeams.length > 0 && (
                  <ConferenceSection>
                    <ConferenceHeader>AFC</ConferenceHeader>
                    {afcTeams.map((team) => (
                      <TeamOption
                        key={team.id}
                        isSelected={selectedTeam?.id === team.id}
                        onClick={() => handleTeamSelect(team)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TeamAvatar teamColor={team.primary_color}>
                          {team.abbreviation}
                        </TeamAvatar>
                        <TeamOptionInfo>
                          <div className="name">{team.city} {team.name}</div>
                          <div className="location">{team.division}</div>
                        </TeamOptionInfo>
                      </TeamOption>
                    ))}
                  </ConferenceSection>
                )}

                {nfcTeams.length > 0 && (
                  <ConferenceSection>
                    <ConferenceHeader>NFC</ConferenceHeader>
                    {nfcTeams.map((team) => (
                      <TeamOption
                        key={team.id}
                        isSelected={selectedTeam?.id === team.id}
                        onClick={() => handleTeamSelect(team)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TeamAvatar teamColor={team.primary_color}>
                          {team.abbreviation}
                        </TeamAvatar>
                        <TeamOptionInfo>
                          <div className="name">{team.city} {team.name}</div>
                          <div className="location">{team.division}</div>
                        </TeamOptionInfo>
                      </TeamOption>
                    ))}
                  </ConferenceSection>
                )}
              </>
            )}
          </DropdownContainer>
        )}
      </AnimatePresence>
    </SelectorContainer>
  );
}; 