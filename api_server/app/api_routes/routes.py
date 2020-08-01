from flask import Blueprint, render_template, jsonify, request, abort
from app.models import db, User


bp = Blueprint('index', __name__, url_prefix='')


@bp.before_request
def to_allowed_host():
  print(request.url_root)
  if 'host.docker.internal' not in request.url_root:
    abort(403)
  # if request.remote_addr != '127.0.0.1':
  #   abort(403)


@bp.route('/')
def index():
  # print('=======', request.url_root)
  return render_template('index.pug')


@bp.route('/create-user')
def create_user():
  new_user = {
    'id': len(User.query.all()) + 1,
    'name': 'Zaphod Beeblebrox',
    'email': 'zb@zbeeb.net',
  }
  user = User(**new_user)
  user.set_password = 'flask'
  print('*****MADE IT HERE*********', new_user)
  # db.session.add(user)
  # db.session.commit()
  return jsonify({ **new_user, 'password': user.hashed_password })
