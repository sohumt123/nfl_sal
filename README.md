# NFL Salary Cap Tracker

A full-stack application for tracking NFL team salary caps and player contracts in real-time.

## Features

- **Real-time Salary Cap Tracking**: Monitor team salary caps and remaining space
- **Player Contract Management**: Track individual player contracts and cap hits
- **Historical Data**: View salary cap data from 2016 onwards
- **Interactive Visualizations**: Stacked bar charts showing team salary breakdowns
- **Search & Filter**: Find players and contracts with advanced filtering
- **Daily Updates**: Automated data refresh from external sources

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Database (development) - easily replaceable with PostgreSQL
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server for running FastAPI

### Frontend
- **React**: User interface library
- **TypeScript**: Type-safe JavaScript
- **Chart.js/Recharts**: Data visualization
- **Axios**: HTTP client for API calls

## Project Structure

```
nfl_sal/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── teams.py
│   │   │   ├── players.py
│   │   │   ├── contracts.py
│   │   │   └── salary_cap.py
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── requirements.txt
│   ├── .env.example
│   └── run.py
├── frontend/
│   └── (React app - to be created)
└── README.md
```

## Getting Started

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run the development server**:
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

### Frontend Setup

(To be added in the next phase)

## Database Schema

### Teams
- Basic team information (name, abbreviation, city, conference, division)
- Team colors for UI theming

### Players
- Player personal information
- Position, draft information
- Active status tracking

### Contracts
- Player contracts by year
- Cap hits, guaranteed money, bonuses
- Contract details and structure

### Salary Caps
- Annual salary cap limits
- Salary floor requirements
- Historical cap data

## API Endpoints

### Teams
- `GET /api/v1/teams/` - Get all teams
- `GET /api/v1/teams/{id}` - Get team by ID
- `GET /api/v1/teams/abbreviation/{abbr}` - Get team by abbreviation

### Players
- `GET /api/v1/players/` - Get all players (with filtering)
- `GET /api/v1/players/{id}` - Get player by ID
- `GET /api/v1/players/search/{name}` - Search players by name

### Contracts
- `GET /api/v1/contracts/` - Get all contracts (with filtering)
- `GET /api/v1/contracts/team/{team_id}/year/{year}` - Get team contracts by year

### Salary Cap
- `GET /api/v1/salary-cap/` - Get all salary cap data
- `GET /api/v1/salary-cap/{year}` - Get salary cap by year
- `GET /api/v1/salary-cap/team/{team_id}/year/{year}/summary` - Get team cap summary

## Development Status

### ✅ Completed
- [x] Project structure setup
- [x] FastAPI backend foundation
- [x] Database models and schemas
- [x] Basic API endpoints
- [x] CORS configuration
- [x] API documentation

### 🚧 In Progress
- [ ] Frontend React application
- [ ] Data scraping utilities
- [ ] Mock data insertion
- [ ] Salary cap visualization

### 📋 Planned
- [ ] Real-time data updates
- [ ] Advanced filtering
- [ ] Mobile responsiveness
- [ ] Export functionality
- [ ] Historical trend analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes. Please respect the terms of service of any data sources used. 