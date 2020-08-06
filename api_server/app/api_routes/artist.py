from flask import Flask, Blueprint, Response, jsonify
from flask_jwt_extended import jwt_required
from app.models import db, Artist, Album, Song
from sqlalchemy.orm import joinedload, load_only


bp = Blueprint('artist', __name__, url_prefix="/api/artist")


# GET all artists on spotify
@bp.route("/", methods=['GET'])
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
# get one artist


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
    payload = {"artist": [{"artist_name": artist.name, "albums": albums}]}
    return payload


# GET all songs for an artist
@bp.route("/<int:id>/songs", methods=["GET"])
def get_artist_songs(id):
    # artist = Artist.query.options(joinedload("albums")).get(id)
    # albums = Album.query.options(joinedload("songs")).filter_by(artist_id=id).all()
    # albums = [album.id for album in albums]
    # songs = Song.query.all
    # payload = {"albums": albums}
    # payload = {"songs":[{"song_title": artist.album.song.title}]}
    return 
