from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from dataclasses import dataclass

db = SQLAlchemy()


# playlistsongs = db.Table("playlistsongs", db.Model.metadata,
# db.Column('song_id',db.Integer, db.ForeignKey("songs.id"), primary_key=True),
# db.Column('playlist_id',db.Integer, db.ForeignKey("playlists.id"), primary_key=True)
# )


class PlaylistSong(db.Model):

  __tablename__ = 'playlistsongs'
  playlist_id = db.Column(db.Integer,db.ForeignKey("playlists.id"),primary_key=True, nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey("songs.id"),primary_key=True, nullable=False)

  def to_dict(self):
    return {"playlist_id": self.playlist_id, "song_id": self.song_id}




@dataclass
class User(db.Model, UserMixin):
  id: int
  user_name: str
  first_name: str
  last_name: str
  email: str
  hashed_password:str

  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  user_name = db.Column(db.String(50), nullable=False)
  first_name = db.Column(db.String(50), nullable=False)
  last_name = db.Column(db.String(50), nullable=False)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(128))
  #cascade for referential integrity 
  playlists = db.relationship("Playlist", back_populates="user",cascade="all, delete-orphan")

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def set_password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def get_token(self):
    return create_access_token(identity={'email': self.email, 'id': self.id})

  def to_dict(self):
    return {"id": self.id, "user_name": self.user_name, "first_name": self.first_name, "last_name": self.last_name, "email": self.email}

@dataclass
class Artist(db.Model):
  id: int
  name: str
  bio: str
  image_url: str

  __tablename__ = 'artists'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  bio = db.Column(db.Text)
  image_url = db.Column(db.String(255))

  albums = db.relationship("Album", back_populates="artist")
  def to_dict(self):
    return {"id": self.id, "name": self.name, "bio": self.bio, "image_url": self.image_url}

@dataclass
class Album(db.Model):
  id: int
  title: str
  artist: Artist
  image_url: str

  __tablename__ = 'albums'
  id:int  = db.Column(db.Integer, primary_key=True)
  title:str = db.Column(db.String(100), nullable=False)
  artist_id:int = db.Column(db.Integer, db.ForeignKey("artists.id"),nullable=False)
  image_url:str = db.Column(db.String(255))

  artist = db.relationship("Artist", back_populates="albums")
  songs = db.relationship("Song", back_populates="album")
  # artist = db.relationship(Artist)

  def to_dict(self):
    return {"id": self.id, "title": self.title, "artist_id": self.artist_id, "image_url": self.image_url}




@dataclass
class Song(db.Model):
  id: int
  title: str
  song_url: str
  song_length: int
  album: Album

  __tablename__ = 'songs'
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  album_id = db.Column(db.Integer, db.ForeignKey("albums.id"),nullable=False)
  song_url = db.Column(db.String(255))
  #song length measured in seconds Todo: convert to minutes
  song_length = db.Column(db.Integer)

  
  album = db.relationship("Album", back_populates="songs")
  playlists = db.relationship("Playlist", secondary="playlistsongs",back_populates="songs")

  def to_dict(self):
    return {"id": self.id, "title": self.title, "album_id": self.album_id, "song_url": self.song_url, "song_length": self.song_length}

@dataclass
class Playlist(db.Model):
  id: int
  name: str
  description: str
  image_url: str
  user: User

  __tablename__ = 'playlists'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  image_url = db.Column(db.String(50))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  songs = db.relationship("Song", secondary="playlistsongs",back_populates="playlists")
  user = db.relationship("User", back_populates="playlists")


  def to_dict(self):
    return {"id": self.id, "name": self.name, "description": self.description, "image_url": self.image_url, "user_id": self.user_id}


