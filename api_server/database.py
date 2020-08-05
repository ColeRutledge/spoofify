from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import db, User, Artist, Album, Song, PlaylistSong, Playlist


with app.app_context():
    db.drop_all()
    db.create_all()

    user = User(user_name="Test", first_name="testOne", last_name="1", email="test@email.com",hashed_password="password1")
    user2 = User(user_name="Test Two", first_name="testTwo", last_name="2", email="test@mail.com",hashed_password="password2")
    db.session.add(user)
    db.session.add(user2)
    artist = Artist(name="Blink-182",bio="Blink-192 bio",image_url="Placeholder Image")
    artist2 = Artist(name="Chance the Rapper",bio="Chance the Rapper bio",image_url="Placeholder Image")
    db.session.add(artist)
    db.session.add(artist2)
    album = Album(title="Greatest Hits",artist_id=1,image_url="Placeholder Album Image")
    album2 = Album(title="Acid Rap",artist_id=2,image_url="Placeholder Album Image")
    db.session.add(album)
    db.session.add(album2)
    playlist = Playlist(name="My First Playlist", description="This is my first playlist on this application",image_url="Placeholder playlist Image", user_id=1)
    playlist2 = Playlist(name="My Second Playlist", description="This is ANOTHER playlist on this application",image_url="Placeholder playlist Image", user_id=2)
    db.session.add(playlist)
    db.session.add(playlist2)
    song = Song(title="All the Small Things", album_id = 1, song_url="placeholder songURL", song_length=180)
    song2 = Song(title="Acid Rain", album_id = 2, song_url="placeholder songURL", song_length=240)
    song3 = Song(title="Feeling This", album_id = 1, song_url="placeholder songURL", song_length=200)
    song4 = Song(title="Fourth Song", album_id = 1, song_url="placeholder songURL", song_length=200)
    db.session.add(song)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    playlistsong = PlaylistSong(playlist_id=1,song_id=1)
    playlistsong2 = PlaylistSong(playlist_id=1,song_id=2)
    playlistsong3 = PlaylistSong(playlist_id=1,song_id=3)
    playlistsong4 = PlaylistSong(playlist_id=2,song_id=4)
    db.session.add(playlistsong)
    db.session.add(playlistsong2)
    db.session.add(playlistsong3)
    db.session.add(playlistsong4)
    db.session.commit()
