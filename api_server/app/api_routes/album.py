from flask import Flask, Blueprint
from .models import db, Album

bp = Blueprint('album',__name__,url_prefix="/album")