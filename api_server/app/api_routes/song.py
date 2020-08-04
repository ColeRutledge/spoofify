from flask import Flask, Blueprint, Response, jsonify
from app.models import db, Song, Artist, Album


bp = Blueprint('song',__name__,url_prefix="/song")


# Get all songs on spotify

@bp.route("/", methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    res = [{
        "title": song.title,
        "album": song.album.title,
        "artist": song.album.artist.name,
        "song_length": song.song_length,
        "song_url": song.song_url
    } for song in songs]
    return jsonify(res)