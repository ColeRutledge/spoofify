from flask import Flask, Blueprint, Response, jsonify
from app.models import db, Song, Artist, Album


bp = Blueprint('song',__name__,url_prefix="/song")

@bp.route("/", methods=["GET"])
def get_all_songs():
    songs = Song.query.all()
    res = [{
        "title": song.title,
        "album": song.album.title,
        "artist": song.album.artist.name,
        "songLength": song.songLength
    } for song in songs]
    return jsonify(res)