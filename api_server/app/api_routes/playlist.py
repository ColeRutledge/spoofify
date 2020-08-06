from flask import Flask, Blueprint, jsonify, request
from app.models import db, Playlist, Song, PlaylistSong
from sqlalchemy.orm import joinedload
bp = Blueprint("playlist", __name__, url_prefix="/api/playlist")


# Get all playlists
@bp.route("/", methods=["GET"])
def get_playlists():
    playlists = Playlist.query.all()
    #  users = [user.to_dict() for user in playlists.user]
    payload = [{"description": playlist.description, "id": playlist.id, 
                "image_url":playlist.image_url, "name": playlist.name,
                "created_by":playlist.user.user_name} for playlist in playlists]
    return {"Playlists":payload}


# Get a playlist
@bp.route("/<int:id>/songs", methods=["GET"])
def get_playlist(id):
    playlist = Playlist.query.options(joinedload('songs')).get(id)
    songs = [song.to_dict() for song in playlist.songs]
    payload = {"Playlist": [{"name": playlist.name, "description": playlist.description,
                            "created_by": playlist.user.user_name, "image_url": playlist.image_url,
                            "songs": songs}]}
    # payload = [{"name": playlist.name, "description": playlist.description,
    #                         "created_by": playlist.user.user_name, "image_url": playlist.image_url,
    #                         "songs": songs}]
    return payload
         

# GET all user's playlists
@bp.route("/<int:user_id>/playlists", methods=["GET"])
def get_user_playlists(user_id):
    playlists = Playlist.query.filter_by(user_id=user_id).all()
    payload = [{
        "playlist_name": playlist.name,
        "description": playlist.description,
        "image_url": playlist.image_url,
        "created_by": playlist.user.user_name
    } for playlist in playlists]

    return {"Playlists":payload}

@bp.route("/create", methods=["POST"])
def create_playlist():
    data = request.json

    try:
        playlist = Playlist(name=data['name'], 
                            description=data['description'],
                            image_url = data['image_url'],
                            user_id = data['user_id'])
        db.session.add(playlist)
        db.session.commit()
        return {'playlist':playlist.to_dict()}
    except AssertionError as message:
        return jsonify({"error": str(message)}), 400

@bp.route("/<int:id>/delete", methods=["DELETE"])
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    db.session.delete(playlist)
    db.session.commit()
    return {'deleted': playlist.to_dict()}



# Add Song to playlist
@bp.route("/<int:playlistid>/song/<int:songid>",methods=["POST"])
def add_playlist_song(playlistid,songid):
    data = request.json

    try:
        playlistsong = PlaylistSong(playlist_id = playlistid,
                            song_id = songid)
        db.session.add(playlistsong)
        db.session.commit()
        return {'added song to playlist': playlistsong.to_dict()}
    except AssertionError as message:
        return jsonify({"error": str(message)}), 400

# Remove song from playlist
@bp.route("/<int:playlistid>/song/<int:songid>",methods=["DELETE"])
def del_playlist_song(playlistid,songid):
        
        playlistsong = PlaylistSong.query.filter_by(playlist_id=playlistid,song_id=songid).first()
        db.session.delete(playlistsong)
        db.session.commt()

        return {"Removed song from playlist": playlistsong.to_dict()}

