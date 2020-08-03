from flask import Flask, Blueprint, jsonify
from .models import db, Artist


bp = Blueprint('artist',__name__,url_prefix="/artist")

@bp.route("/")
def get_all_artist():
    artists = Artist.query.all()
    return jsonify(artists)

# @bp.route("/<int:id>")
# def get_artist():
