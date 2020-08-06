from flask import Flask, Blueprint, Response, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from app.models import db, Artist, Album, Song


bp = Blueprint('artist',__name__,url_prefix="/artist")


# GET all artists on spotify
@bp.route("/", strict_slashes=False, methods=['GET'])
@jwt_required
def get_artists():
    print()
    print('**********GETTING ARTISTS**********')
    print()
    # artists = Artist.query.all()
    # res = [{
    #     "name": artist.name,
    #     "bio": artist.bio,
    #     "image_url": artist.image_url
    # } for artist in artists]
    # return jsonify(res)
    artists = db.session.query(Artist).all()
    artists = [artist.to_dict() for artist in artists]
    return {"artists": artists}


# get one artist
@bp.route("/<int:id>", methods=['GET'])
def get_artist(id):
    artist = Artist.query.get(id)
    res = {
        "name": artist.name,
        "bio": artist.bio,
        "image_url": artist.image_url
    }
    return jsonify({"artist":res})


# GET all albums for an artist

@bp.route("/<int:id>/albums", methods=["GET"])
def get_artist_albums(id):
    albums = Album.query.filter_by(artist_id=id).all()
    res = [{"title": album.title,
           "artist": album.artist.name} for album in albums]
    # albums = db.session.query(Album,Artist,Song).filter(Artist.id == id).all()

    return jsonify(res)


# GET all songs for an artist
@bp.route("/<int:id>/songs",methods=["GET"])
def get_artist_songs(id):
    artists = Artist.query.filter_by(id=id).all()
    res= [{"song_title": artist.album.song.title,
    "song_url": artist.album.song.song_url,
    "song_length": artist.album.song.song_length,
    "album_title": artist.album.title,
    "artist_name": song.album.artist.name} for artist in artists]
    return jsonify(res)
