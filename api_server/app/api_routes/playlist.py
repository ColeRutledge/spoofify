from flask import Flask, Blueprint, jsonify
from app.models import db, Playlist, PlaylistSong, Song

bp = Blueprint("playlist", __name__, url_prefix="/playlist")


#Get a playlist
@bp.route("/<int:id>/songs", methods=["GET"])
def get_playlist(id):
    playlistsongs = db.session.query(PlaylistSong).join(Playlist, PlaylistSong.playlist_id == Playlist.id).\
         join(Song, Song.id == PlaylistSong.song_id).filter(Playlist.id ==id).all()
    # for playlistsong in playlistsongs:
    #     playlistObject = {'playlist_name': playlistsong.playlist.name,
    #                       'description': playlistsong.playlist.description,
    #                       'songs':[]}
    #     for song in playlistsong.song:
    #         song = {"song_name": song.name}


    # return jsonify(q)
    # PlaylistSongs = PlaylistSong.query.join(Song).filter(Playlist.user_id == id).all()
    


    return jsonify(playlistsongs)
