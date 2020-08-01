from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from app.models import db
from app.config import Config
from app.api_routes import bp


app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
app.register_blueprint(bp)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
