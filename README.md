# Spotify Clone

## Setup
1. Clone project
2. Create .env files in the root directory (example.env included)
3. Create .env file in api_server directory with DATABASE_URL
4. From the root directory, run [docker-compose up]

## To run locally:
1. cd into either api_server or client
2. install packages locally
3. npm start or flask run (with venv activated)

## To gain access to postgres inside container:
```bash
docker container exec -it spotify_clone_db_1 /bin/sh
psql -U flask_api -W flask_api_db
```
## To populate DB with seeder data:
```bash
docker container exec -it spotify_clone_api_1 /bin/sh
python3 database.py
```

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

## API Endpoints

### User
- Create User
- Delete User
- Update User
- Return Users
- User Auth -> /token

### Playlist
- Create Playlist
- Delete Playlist
- Update Playlist (add/remove)
- Return Playlist

### User Library
- Add/Remove Songs
- Return Song Library
- Return Artist Library
- Return Album Library
- Return Genre Library (optional)

### Spotify Library
- Return Song Library
- Return Artist Library
- Return Album Library
- Return Genre Library (optional)


#### Deployment Notes:
Flask App:

Deploying flask to heroku
- git subtree push heroku --prefix api_server master

Add heroku.yml
```bash
# add gunicorn package and swap these 2 lines in entrypoint.sh
python3 entry.py run -h 0.0.0.0
gunicorn app:app
```

deploying client folder from master branch
- git subtree push client --prefix client master


installing serve package globally to serve static assets
- npm install -g serve

deploying client folder on react-auth branch
- git push client `git subtree split --prefix client react-auth`:master --force

```bash
# production image build
FROM node:12-alpine as base

FROM base as build

ENV REACT_APP_API_SERVER_BASE_URL=https://spotify-clone-appacademy.herokuapp.com

WORKDIR /app

COPY . .

RUN npm install && npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
```

```bash
# deployment for specific branch for api_server
git push heroku `git subtree split --prefix api_server react-auth`:master --force
```
