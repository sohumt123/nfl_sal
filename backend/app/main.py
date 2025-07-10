from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routers import teams, players, contracts, salary_cap

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NFL Salary Cap Tracker API",
    description="API for tracking NFL team salary caps and player contracts",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(teams.router, prefix="/api/v1/teams", tags=["teams"])
app.include_router(players.router, prefix="/api/v1/players", tags=["players"])
app.include_router(contracts.router, prefix="/api/v1/contracts", tags=["contracts"])
app.include_router(salary_cap.router, prefix="/api/v1/salary-cap", tags=["salary-cap"])

@app.get("/")
async def root():
    return {"message": "NFL Salary Cap Tracker API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 