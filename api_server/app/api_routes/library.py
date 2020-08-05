from flask import Flask, Blueprint, jsonify
from ..models import Playlist

bp = Blueprint("library", __name__, url_prefix="/library")

# GET all user's playlists
@bp.route("/<int:user_id>/playlists",methods=["GET"])
def get_user_playlists(user_id):
    playlists = Playlist.query.filter_by(user_id = user_id).all()
    res = [{
        "playlist_name": playlist.name,
        "description": playlist.description,
        "image_url": playlist.image_url,
        "created_by": playlist.user.user_name
    } for playlist in playlists]

    return jsonify(res)


# GET