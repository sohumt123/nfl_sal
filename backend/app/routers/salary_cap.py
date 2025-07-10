from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import List, Dict, Any
from app.database import get_db
from app.models import SalaryCap, Contract, Team
from app.schemas import SalaryCapSchema, SalaryCapCreateSchema

router = APIRouter()

@router.get("/", response_model=List[SalaryCapSchema])
async def get_salary_caps(db: Session = Depends(get_db)):
    """Get all salary cap data"""
    salary_caps = db.query(SalaryCap).order_by(SalaryCap.year.desc()).all()
    return salary_caps

@router.get("/{year}", response_model=SalaryCapSchema)
async def get_salary_cap_by_year(year: int, db: Session = Depends(get_db)):
    """Get salary cap data for a specific year"""
    salary_cap = db.query(SalaryCap).filter(SalaryCap.year == year).first()
    if not salary_cap:
        raise HTTPException(status_code=404, detail="Salary cap data not found for this year")
    return salary_cap

@router.get("/team/{team_id}/year/{year}/summary")
async def get_team_cap_summary(
    team_id: int, 
    year: int, 
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Get salary cap summary for a specific team and year"""
    
    # Get salary cap for the year
    salary_cap = db.query(SalaryCap).filter(SalaryCap.year == year).first()
    if not salary_cap:
        raise HTTPException(status_code=404, detail="Salary cap data not found for this year")
    
    # Get team
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Calculate total cap hit for the team
    total_cap_hit = db.query(func.sum(Contract.cap_hit)).filter(
        and_(Contract.team_id == team_id, Contract.contract_year == year)
    ).scalar() or 0.0
    
    # Calculate remaining cap space
    remaining_cap = salary_cap.salary_cap - total_cap_hit
    
    # Get contract count
    contract_count = db.query(func.count(Contract.id)).filter(
        and_(Contract.team_id == team_id, Contract.contract_year == year)
    ).scalar() or 0
    
    return {
        "team": {
            "id": team.id,
            "name": team.name,
            "abbreviation": team.abbreviation,
            "city": team.city
        },
        "year": year,
        "salary_cap": salary_cap.salary_cap,
        "salary_floor": salary_cap.salary_floor,
        "total_cap_hit": total_cap_hit,
        "remaining_cap": remaining_cap,
        "cap_percentage_used": (total_cap_hit / salary_cap.salary_cap) * 100,
        "contract_count": contract_count,
        "over_cap": total_cap_hit > salary_cap.salary_cap
    }

@router.post("/", response_model=SalaryCapSchema)
async def create_salary_cap(salary_cap: SalaryCapCreateSchema, db: Session = Depends(get_db)):
    """Create new salary cap data"""
    db_salary_cap = SalaryCap(**salary_cap.dict())
    db.add(db_salary_cap)
    db.commit()
    db.refresh(db_salary_cap)
    return db_salary_cap 