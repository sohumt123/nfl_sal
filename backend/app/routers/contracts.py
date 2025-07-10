from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from app.database import get_db
from app.models import Contract, Player, Team
from app.schemas import ContractSchema, ContractCreateSchema

router = APIRouter()

@router.get("/", response_model=List[ContractSchema])
async def get_contracts(
    skip: int = 0,
    limit: int = 100,
    team_id: Optional[int] = Query(None, description="Filter by team"),
    player_id: Optional[int] = Query(None, description="Filter by player"),
    contract_year: Optional[int] = Query(None, description="Filter by contract year"),
    db: Session = Depends(get_db)
):
    """Get all contracts with optional filtering"""
    query = db.query(Contract)
    
    if team_id:
        query = query.filter(Contract.team_id == team_id)
    
    if player_id:
        query = query.filter(Contract.player_id == player_id)
    
    if contract_year:
        query = query.filter(Contract.contract_year == contract_year)
    
    contracts = query.offset(skip).limit(limit).all()
    return contracts

@router.get("/{contract_id}", response_model=ContractSchema)
async def get_contract(contract_id: int, db: Session = Depends(get_db)):
    """Get a specific contract by ID"""
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract

@router.get("/team/{team_id}/year/{year}", response_model=List[ContractSchema])
async def get_team_contracts_by_year(
    team_id: int, 
    year: int, 
    db: Session = Depends(get_db)
):
    """Get all contracts for a specific team and year"""
    contracts = db.query(Contract).filter(
        and_(Contract.team_id == team_id, Contract.contract_year == year)
    ).all()
    return contracts

@router.post("/", response_model=ContractSchema)
async def create_contract(contract: ContractCreateSchema, db: Session = Depends(get_db)):
    """Create a new contract"""
    db_contract = Contract(**contract.dict())
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)
    return db_contract 