from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from app.models import db
from app.config import Config
from app.api_routes import routes, artist


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
app.register_blueprint(routes.bp)
app.register_blueprint(artist.bp)
app.register
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
