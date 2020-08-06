from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from app.models import db
from app.config import Config
from .api_routes import main, artist, album, song, playlist


app = Flask(__name__)
app.config.from_object(Config)
jwt = JWTManager(app)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
app.register_blueprint(main.bp)
app.register_blueprint(artist.bp)
app.register_blueprint(album.bp)
app.register_blueprint(song.bp)
app.register_blueprint(playlist.bp)


app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
