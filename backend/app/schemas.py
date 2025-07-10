from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date

# Team Schemas
class TeamBase(BaseModel):
    name: str = Field(..., description="Team name")
    abbreviation: str = Field(..., description="Team abbreviation (e.g., KC, NE)")
    city: str = Field(..., description="Team city")
    conference: str = Field(..., description="NFC or AFC")
    division: str = Field(..., description="North, South, East, West")
    primary_color: Optional[str] = Field(None, description="Primary color hex code")
    secondary_color: Optional[str] = Field(None, description="Secondary color hex code")

class TeamCreateSchema(TeamBase):
    pass

class TeamSchema(TeamBase):
    id: int
    
    class Config:
        from_attributes = True

# Player Schemas
class PlayerBase(BaseModel):
    name: str = Field(..., description="Player name")
    position: str = Field(..., description="Player position")
    jersey_number: Optional[int] = Field(None, description="Jersey number")
    height_inches: Optional[int] = Field(None, description="Height in inches")
    weight_lbs: Optional[int] = Field(None, description="Weight in pounds")
    birth_date: Optional[date] = Field(None, description="Birth date")
    college: Optional[str] = Field(None, description="College")
    draft_year: Optional[int] = Field(None, description="Draft year")
    draft_round: Optional[int] = Field(None, description="Draft round")
    draft_pick: Optional[int] = Field(None, description="Draft pick number")
    is_active: bool = Field(True, description="Is player active")

class PlayerCreateSchema(PlayerBase):
    pass

class PlayerSchema(PlayerBase):
    id: int
    
    class Config:
        from_attributes = True

# Contract Schemas
class ContractBase(BaseModel):
    player_id: int = Field(..., description="Player ID")
    team_id: int = Field(..., description="Team ID")
    contract_year: int = Field(..., description="Contract year")
    total_value: float = Field(..., description="Total contract value")
    guaranteed_money: float = Field(0.0, description="Guaranteed money")
    signing_bonus: float = Field(0.0, description="Signing bonus")
    cap_hit: float = Field(..., description="Cap hit for this year")
    base_salary: float = Field(..., description="Base salary")
    roster_bonus: float = Field(0.0, description="Roster bonus")
    workout_bonus: float = Field(0.0, description="Workout bonus")
    incentives: float = Field(0.0, description="Incentives")
    dead_money: float = Field(0.0, description="Dead money if released")
    contract_length: Optional[int] = Field(None, description="Contract length in years")
    contract_start_year: Optional[int] = Field(None, description="Contract start year")
    contract_end_year: Optional[int] = Field(None, description="Contract end year")
    is_franchise_tag: bool = Field(False, description="Is franchise tag")
    is_transition_tag: bool = Field(False, description="Is transition tag")
    notes: Optional[str] = Field(None, description="Additional notes")

class ContractCreateSchema(ContractBase):
    pass

class ContractSchema(ContractBase):
    id: int
    
    class Config:
        from_attributes = True

# Salary Cap Schemas
class SalaryCapBase(BaseModel):
    year: int = Field(..., description="Year")
    salary_cap: float = Field(..., description="Salary cap amount")
    salary_floor: float = Field(..., description="Salary floor amount")
    luxury_tax_threshold: Optional[float] = Field(None, description="Luxury tax threshold")
    minimum_team_salary: Optional[float] = Field(None, description="Minimum team salary")
    notes: Optional[str] = Field(None, description="Additional notes")

class SalaryCapCreateSchema(SalaryCapBase):
    pass

class SalaryCapSchema(SalaryCapBase):
    id: int
    
    class Config:
        from_attributes = True 