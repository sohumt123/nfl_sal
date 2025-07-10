import axios from 'axios';
import { Team, Player, Contract, SalaryCap, TeamCapSummary } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Teams
  getTeams: async (): Promise<Team[]> => {
    const response = await api.get('/api/v1/teams/');
    return response.data;
  },

  getTeam: async (id: number): Promise<Team> => {
    const response = await api.get(`/api/v1/teams/${id}`);
    return response.data;
  },

  getTeamByAbbreviation: async (abbreviation: string): Promise<Team> => {
    const response = await api.get(`/api/v1/teams/abbreviation/${abbreviation}`);
    return response.data;
  },

  // Players
  getPlayers: async (params?: {
    skip?: number;
    limit?: number;
    position?: string;
    active_only?: boolean;
  }): Promise<Player[]> => {
    const response = await api.get('/api/v1/players/', { params });
    return response.data;
  },

  getPlayer: async (id: number): Promise<Player> => {
    const response = await api.get(`/api/v1/players/${id}`);
    return response.data;
  },

  searchPlayers: async (name: string): Promise<Player[]> => {
    const response = await api.get(`/api/v1/players/search/${name}`);
    return response.data;
  },

  // Contracts
  getContracts: async (params?: {
    skip?: number;
    limit?: number;
    team_id?: number;
    player_id?: number;
    contract_year?: number;
  }): Promise<Contract[]> => {
    const response = await api.get('/api/v1/contracts/', { params });
    return response.data;
  },

  getContract: async (id: number): Promise<Contract> => {
    const response = await api.get(`/api/v1/contracts/${id}`);
    return response.data;
  },

  getTeamContracts: async (teamId: number, year: number): Promise<Contract[]> => {
    const response = await api.get(`/api/v1/contracts/team/${teamId}/year/${year}`);
    return response.data;
  },

  // Salary Cap
  getSalaryCaps: async (): Promise<SalaryCap[]> => {
    const response = await api.get('/api/v1/salary-cap/');
    return response.data;
  },

  getSalaryCapByYear: async (year: number): Promise<SalaryCap> => {
    const response = await api.get(`/api/v1/salary-cap/${year}`);
    return response.data;
  },

  getTeamCapSummary: async (teamId: number, year: number): Promise<TeamCapSummary> => {
    const response = await api.get(`/api/v1/salary-cap/team/${teamId}/year/${year}/summary`);
    return response.data;
  },
};

export default apiService; 