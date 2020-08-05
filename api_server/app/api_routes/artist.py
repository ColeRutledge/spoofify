from flask import Flask, Blueprint, Response, jsonify
from flask_jwt_extended import jwt_required
from app.models import db, Artist


bp = Blueprint('artist',__name__,url_prefix="/artist")

@bp.route("/", methods=['GET'])
@jwt_required
def get_artists():
    artists = Artist.query.all()
    res = [{
        "name": artist.name,
        "bio": artist.bio,
        "imageURL": artist.imageURL
    } for artist in artists]
    return jsonify(res)


@bp.route("/<int:id>", methods=['GET'])
def get_artist(id):
    artist = Artist.query.get(id)
    res = {
        "name": artist.name,
        "bio": artist.bio,
        "imageURL": artist.imageURL
    }
    return jsonify(res)
