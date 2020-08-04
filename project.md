MVP - (from the a/A website)
Spotify
Song/Playlist CRUD
Search
Continuous play while navigating site
Following playlists/Friending users
Bonus: Radio (shuffle play)
Bonus: Explore Page


Containers:
React Application:
  - JWT
  - Formik
  - React Router
  - Hooks
  - Material UI
  - Elastic Search
  - AWS

Python Flask:
  - JWT Auth
  - Werkzeug Security for password encryption
  - API Endpoints for Song/Playlist/User CRUD

MongoDB DB
  - User Info
  - Library / Playlists
  - Song / Artist Info
  - Store songs?


Package List
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


docker container exec -it spotify_clone_db_1 /bin/sh
psql -U flask_api -W flask_api_db
