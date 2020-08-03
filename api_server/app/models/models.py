from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  email = db.Column(db.String(255), nullable=False, unique=True)
  hashed_password = db.Column(db.String(128))

  playlists = db.relationship("Playlist", back_populates="user")

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def set_password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)


class Artist(db.Model):
  __tablename__ = 'artists'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  bio = db.Column(db.Text)
  imageURL = db.Column(db.String(255))

  albums = db.relationship("Album", back_populates="artist")


class Album(db.Model):
  __tablename__ = 'albums'
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"),nullable=False)
  imageURL = db.Column(db.String(255))

  artist = db.relationship("Artist", back_populates="albums")
  songs = db.relationship("Song", back_populates="album")


class Song(db.Model):
  __tablename__ = 'songs'
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  album_id = db.Column(db.Integer, db.ForeignKey("albums.id"),nullable=False)
  songURL = db.Column(db.String(255))
  songLength = db.Column(db.Time)

  album = db.relationship("Album", back_populates="songs")
  playlist_songs = db.relationship("PlaylistSong", back_populates="song")


class PlaylistSong(db.Model):
  __tablename__ = 'playlistsongs'
  id = db.Column(db.Integer, primary_key=True)
  playlist_id = db.Column(db.Integer,db.ForeignKey("playlists.id"), nullable=False)
  song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), nullable=False)

  song = db.relationship("Song", back_populates="playlist_songs")
  playlist = db.relationship("Playlist", back_populates="playlist_songs")


class Playlist(db.Model):
  __tablename__ = 'playlists'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  imageURL = db.Column(db.String(50))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

  playlist_songs = db.relationship("PlaylistSong", back_populates="playlist")
  user = db.relationship("User", back_populates="playlists")