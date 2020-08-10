from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from app.models import db, Playlist, Song, PlaylistSong, Album, Artist
from sqlalchemy.orm import joinedload
from sqlalchemy import text
from flask_jwt_extended import jwt_required

bp = Blueprint("playlist", __name__, url_prefix="/api/playlist")



# Get all playlists
@bp.route("/", strict_slashes=False, methods=["GET"])
@jwt_required
def get_playlists():
    playlists = Playlist.query.all()
    #  users = [user.to_dict() for user in playlists.user]
    payload = [{"description": playlist.description, "id": playlist.id,
                "image_url":playlist.image_url, "name": playlist.name,
                "created_by":playlist.user.user_name} for playlist in playlists]
    return {"Playlists":payload}


# Get all songs in playlist
@bp.route("/<int:id>/songs", methods=["GET"])
def get_playlist(id):
    playlist = Playlist.query.options(joinedload('songs')).get(id)
    songs = [{"album_title":song.album.title, "artist_name":song.album.artist.name,"title":song.title,
              "album_id":song.album.id, "id": song.id,"song_length":song.song_length} for song in playlist.songs]
    
    # payload = {"Playlist": [{"name": playlist.name, "description": playlist.description,
    #                         "created_by": playlist.user.user_name, "image_url": playlist.image_url,
    #                         "songs": songs}]}
    payload = [{"name": playlist.name, "description": playlist.description,
                            "created_by": playlist.user.user_name, "image_url": playlist.image_url,
                            "songs": songs}]
    return {"data":payload}
         

# # GET all user's playlists
# @bp.route("/<int:user_id>/playlists", methods=["GET"])
# def get_user_playlists(user_id):
#     playlists = Playlist.query.filter_by(user_id=user_id).all()
#     payload = [{
#         "playlist_name": playlist.name,
#         "description": playlist.description,
#         "image_url": playlist.image_url,
#         "created_by": playlist.user.user_name
#     } for playlist in playlists]

#     return {"Playlists":payload}

@bp.route("/<int:userid>/playlists", methods=["GET"])
def get_user_playlists(userid):
    stmt = text("SELECT playlists.name, songs.title as song_name, albums.title as album_title FROM playlists join playlistsongs on playlists.id = playlistsongs.playlist_id join songs on playlistsongs.song_id = songs.id join albums on songs.album_id = albums.id  WHERE playlists.user_id = :userid")
    playlists = Playlist.query.options(joinedload("songs").joinedload("album")).filter(Playlist.user_id==userid)
    playlist1 = db.session.query("name","song_name","album_title").from_statement(stmt).params(userid=userid).all()
    playlist2 = db.session.query(Song.title,Album.title,Artist.name,Song.song_url,Song.song_length,Album.image_url,Artist.image_url,Artist.bio,Playlist.name).select_from(Playlist).join(PlaylistSong).join(Song).join(Album).join(Artist).filter(Playlist.user_id==userid).all()
    # playlist2 = db.session.query(Album.title).select_from(Playlist).join(PlaylistSong).join(Song).join(Album).join(Artist).filter(Playlist.user_id==userid).distinct()
    # payload = [{"song_title":playlist[0]}for playlist in playlist2]

    payload = [{"song_title":playlist[0], "album_title":playlist[1],"artist_name":playlist[2],"song_url":playlist[3],"song_length":playlist[4],"album_image":playlist[5],"artist_image":playlist[6],"artist_bio":playlist[7],"playlist_name":playlist[8]}for playlist in playlist2]
  
    # .all() returns an array
    

    return {"Data":payload}

@bp.route("/create", methods=["POST"])
@jwt_required
def create_playlist():
    data = request.json

    try:
        playlist = Playlist(name=data['playlistName'],
                            user_id = data['id'])
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
