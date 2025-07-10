// Team types
export interface Team {
  id: number;
  name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  primary_color?: string;
  secondary_color?: string;
}

// Player types
export interface Player {
  id: number;
  name: string;
  position: string;
  jersey_number?: number;
  height_inches?: number;
  weight_lbs?: number;
  birth_date?: string;
  college?: string;
  draft_year?: number;
  draft_round?: number;
  draft_pick?: number;
  is_active: boolean;
}

// Contract types
export interface Contract {
  id: number;
  player_id: number;
  team_id: number;
  contract_year: number;
  total_value: number;
  guaranteed_money: number;
  signing_bonus: number;
  cap_hit: number;
  base_salary: number;
  roster_bonus: number;
  workout_bonus: number;
  incentives: number;
  dead_money: number;
  contract_length?: number;
  contract_start_year?: number;
  contract_end_year?: number;
  is_franchise_tag: boolean;
  is_transition_tag: boolean;
  notes?: string;
  player?: Player;
}

// Salary Cap types
export interface SalaryCap {
  id: number;
  year: number;
  salary_cap: number;
  salary_floor: number;
  luxury_tax_threshold?: number;
  minimum_team_salary?: number;
  notes?: string;
}

// Team Cap Summary
export interface TeamCapSummary {
  team: {
    id: number;
    name: string;
    abbreviation: string;
    city: string;
  };
  year: number;
  salary_cap: number;
  salary_floor: number;
  total_cap_hit: number;
  remaining_cap: number;
  cap_percentage_used: number;
  contract_count: number;
  over_cap: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
} 