from flask import Flask, Blueprint, Response, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from app.models import db, Artist, Album, Song
from sqlalchemy.orm import joinedload, load_only
from sqlalchemy import text, or_, and_

bp = Blueprint('artist', __name__, url_prefix="/api/artist")


# Get all artists on spotify
@bp.route("/", strict_slashes=False, methods=['GET'])
# @jwt_required
def get_artists():
    artists = Artist.query.all()
    return {"artists": artists}
# res = [{
#     "name": artist.name,
#     "bio": artist.bio,
#     "image_url": artist.image_url
# } for artist in artists]
# return jsonify(res)
# artists = [artist.to_dict() for artist in artists]


# Get one artist
@bp.route("/<int:id>", methods=['GET'])
def get_artist(id):
    artist = Artist.query.get(id)
    res = {
        "name": artist.name,
        "bio": artist.bio,
        "image_url": artist.image_url
    }
    return jsonify(res)


# GET all albums for an artist
@bp.route("/<int:id>/albums", methods=["GET"])
def get_artist_albums(id):
    artist = Artist.query.options(joinedload("albums")).get(id)
    # albums = Album.query.filter_by(artist_id=id).all()
    albums = [album.to_dict() for album in artist.albums]
    

    payload = {"artist": {"artist_name": artist.name, "albums": albums}}
    return payload


# # GET all songs for an artist
# @bp.route("/<int:id>/songs", methods=["GET"])
# def get_artist_songs(id):
#     # q = db.session.query(Artist,Song).from_statement(text("SELECT artists.id from artists join albums on artists.id = albums.artist_id join songs on albums.id = songs.album_id WHERE artist_id =:id" )).params(id=id).all()
#     # q = db.session.query(Song).join(Album).join(Artist).filter(Artist.id==id).all()
#     artist = db.session.query(Artist,Album,Song).options(joinedload("albums").joinedload("songs")).filter(and_(Artist.id == id, Album.artist_id == id)).all()
#     # albums = [album.id for album in artist.albums]
#     # album = Album.query.options(joinedload("songs")).get(id)
#     # songs = [song.to_dict() for song in album.songs]

#     return jsonify(artist)


