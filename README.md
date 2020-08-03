# Spotify Clone

## Containers:
### React Application:
- JWT
- React Hook Form
- React Router
- Hooks
- Material UI
- Elastic Search
- AWS

### Python Flask:
- JWT Auth
- Werkzeug Security for password encryption
- API Endpoints for Song/Playlist/User CRUD

### MongoDB DB
- User Info
- Library / Playlists
- Song / Artist Info
- Store songs?


### Package List
- Flask
- SQLAlchemy
- Alembic
- Flask
- Flask_RESTful
- python-dotenv
- psycopg2-binary (although we won't use this if Mongo)


## Setup
1. Clone project
2. Create .env files in the root directory (example.env included)
3. Create .env file in api_server directory with DATABASE_URL
4. From the root directory, run [docker-compose up]

## To run locally:
1. cd into either api_server or client
2. install packages locally
3. npm start or flask run (with venv activated)

