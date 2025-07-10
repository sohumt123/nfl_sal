from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import Player
from app.schemas import PlayerSchema, PlayerCreateSchema

router = APIRouter()

@router.get("/", response_model=List[PlayerSchema])
async def get_players(
    skip: int = 0,
    limit: int = 100,
    position: Optional[str] = Query(None, description="Filter by position"),
    active_only: bool = Query(True, description="Show only active players"),
    db: Session = Depends(get_db)
):
    """Get all players with optional filtering"""
    query = db.query(Player)
    
    if active_only:
        query = query.filter(Player.is_active == True)
    
    if position:
        query = query.filter(Player.position == position.upper())
    
    players = query.offset(skip).limit(limit).all()
    return players

@router.get("/{player_id}", response_model=PlayerSchema)
async def get_player(player_id: int, db: Session = Depends(get_db)):
    """Get a specific player by ID"""
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@router.get("/search/{name}", response_model=List[PlayerSchema])
async def search_players(name: str, db: Session = Depends(get_db)):
    """Search players by name"""
    players = db.query(Player).filter(
        Player.name.ilike(f"%{name}%")
    ).limit(20).all()
    return players

@router.post("/", response_model=PlayerSchema)
async def create_player(player: PlayerCreateSchema, db: Session = Depends(get_db)):
    """Create a new player"""
    db_player = Player(**player.dict())
    db.add(db_player)
    db.commit()
    db.refresh(db_player)
    return db_player 