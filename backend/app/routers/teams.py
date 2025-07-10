from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Team
from app.schemas import TeamSchema, TeamCreateSchema

router = APIRouter()

@router.get("/", response_model=List[TeamSchema])
async def get_teams(db: Session = Depends(get_db)):
    """Get all NFL teams"""
    teams = db.query(Team).all()
    return teams

@router.get("/{team_id}", response_model=TeamSchema)
async def get_team(team_id: int, db: Session = Depends(get_db)):
    """Get a specific team by ID"""
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@router.get("/abbreviation/{abbreviation}", response_model=TeamSchema)
async def get_team_by_abbreviation(abbreviation: str, db: Session = Depends(get_db)):
    """Get a team by abbreviation (e.g., 'KC', 'NE')"""
    team = db.query(Team).filter(Team.abbreviation == abbreviation.upper()).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    return team

@router.post("/", response_model=TeamSchema)
async def create_team(team: TeamCreateSchema, db: Session = Depends(get_db)):
    """Create a new team"""
    db_team = Team(**team.dict())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team 