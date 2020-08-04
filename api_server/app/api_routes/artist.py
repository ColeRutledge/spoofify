from flask import Flask, Blueprint, Response, jsonify
from app.models import db, Artist


bp = Blueprint('artist',__name__,url_prefix="/artist")


# GET all artists on spotify
@bp.route("/", methods=['GET'])
def get_artists():
    artists = Artist.query.all()
    res = [{
        "name": artist.name,
        "bio": artist.bio,
        "image_url": artist.image_url
    } for artist in artists]
    return jsonify(res)


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