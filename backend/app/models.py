from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import date

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    abbreviation = Column(String(5), nullable=False, unique=True)
    city = Column(String(50), nullable=False)
    conference = Column(String(3), nullable=False)  # NFC or AFC
    division = Column(String(10), nullable=False)   # North, South, East, West
    primary_color = Column(String(7))  # Hex color code
    secondary_color = Column(String(7))  # Hex color code
    
    # Relationships
    contracts = relationship("Contract", back_populates="team")

class Player(Base):
    __tablename__ = "players"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    position = Column(String(10), nullable=False)
    jersey_number = Column(Integer)
    height_inches = Column(Integer)
    weight_lbs = Column(Integer)
    birth_date = Column(Date)
    college = Column(String(100))
    draft_year = Column(Integer)
    draft_round = Column(Integer)
    draft_pick = Column(Integer)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    contracts = relationship("Contract", back_populates="player")

class Contract(Base):
    __tablename__ = "contracts"
    
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False)
    contract_year = Column(Integer, nullable=False)  # e.g., 2024
    total_value = Column(Float, nullable=False)
    guaranteed_money = Column(Float, default=0.0)
    signing_bonus = Column(Float, default=0.0)
    cap_hit = Column(Float, nullable=False)
    base_salary = Column(Float, nullable=False)
    roster_bonus = Column(Float, default=0.0)
    workout_bonus = Column(Float, default=0.0)
    incentives = Column(Float, default=0.0)
    dead_money = Column(Float, default=0.0)
    contract_length = Column(Integer)  # Total years
    contract_start_year = Column(Integer)
    contract_end_year = Column(Integer)
    is_franchise_tag = Column(Boolean, default=False)
    is_transition_tag = Column(Boolean, default=False)
    notes = Column(Text)
    
    # Relationships
    player = relationship("Player", back_populates="contracts")
    team = relationship("Team", back_populates="contracts")

class SalaryCap(Base):
    __tablename__ = "salary_caps"
    
    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, nullable=False, unique=True)
    salary_cap = Column(Float, nullable=False)
    salary_floor = Column(Float, nullable=False)
    luxury_tax_threshold = Column(Float)  # NFL doesn't have luxury tax, but keeping for future
    minimum_team_salary = Column(Float)
    notes = Column(Text) 