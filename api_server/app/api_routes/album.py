from flask import Flask, Blueprint, jsonify
from app.models import db, Album, Artist, Song

bp = Blueprint('album',__name__,url_prefix="/album")


#GET all albums on Spotify
@bp.route("/", methods=["GET"])
def get_albums():
    albums = Album.query.join(Artist,Album.artist_id == Artist.id).all()
    res = [{"album_id":album.id,
            "title": album.title,
            "artist": album.artist.name} for album in albums]
    
    return jsonify(res)


# GET one album
@bp.route("/<int:id>", methods=["GET"])
def get_album(id):
    album = Album.query.get(id)
    res = {"title": album.title,
           "artist": album.artist.name}
    return jsonify(res)




# GET all songs for an album
@bp.route("/<int:id>/songs")
def get_album_songs(id):
    
    songs = Song.query.filter_by(album_id=id).all()
    # res = [{"title": song.title,
    # "album":song.album.title,
    # "song_length": song.song_length,
    # "song_url": song.song_url} for song in songs]

    return jsonify(songs)

# GET one song from album
@bp.route("/<int:id>/<int:song_id>")
def get_album_song(id,song_id):
    songs = Song.query.filter_by(album_id=id,id=song_id).all()
    res = [{"title": song.title,
    "album": song.album.title,
    "song_length": song.song_length,
    "song_url": song.song_url} for song in songs]
    return jsonify(res)