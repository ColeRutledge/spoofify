from flask import Flask, Blueprint, jsonify
from app.models import db, Album, Artist

bp = Blueprint('album',__name__,url_prefix="/album")


#GET all albums on Spotify
@bp.route("/", methods=["GET"])
def get_albums():
    albums = Album.query.join(Artist,Album.artist_id == Artist.id).all()
    res = [{"title": album.title,
            "artist": album.artist.name} for album in albums]
    
    return jsonify(res)


# GET one album
@bp.route("/<int:id>", methods=["GET"])
def get_album(id):
    album = Album.query.get(id)
    res = {"title": album.title,
           "artist": album.artist.name}
    return jsonify(res)


# GET all albums for an artist
@bp.route("/artist/<int:id>", methods=["GET"])
def get_artist_album(id):
    albums = Album.query.filter_by(artist_id=id).all()
    res = [{"title": album.title,
           "artist": album.artist.name} for album in albums]
    return jsonify(res)
