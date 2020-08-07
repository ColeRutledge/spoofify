from flask import Flask, Blueprint, Response, jsonify
from app.models import db, Song, Artist, Album
from flask_jwt_extended import jwt_required

bp = Blueprint('song',__name__,url_prefix="/api/song")


# Get all songs on spotify

@bp.route("/", strict_slashes=False, methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    res = [{
        "title": song.title,
        "album": song.album.title,
        "song_id": song.id,
        "artist": song.album.artist.name,
        "song_length": song.song_length,
        "song_url": song.song_url
    } for song in songs]
    return jsonify(res)