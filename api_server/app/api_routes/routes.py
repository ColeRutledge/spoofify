from flask import Blueprint, render_template, jsonify, request, abort
from app.models import db, User


bp = Blueprint('index', __name__)


@bp.before_request
def to_allowed_host():
  if 'host.docker.internal' not in request.url_root:
    abort(403)
  # if request.remote_addr != '127.0.0.1':
  #   abort(403)


@bp.route('/')
def index():
  return render_template('index.pug')


@bp.route('/create-user', methods=['POST'])
def create_user():
  data = request.get_json()

  new_user = {
    'id': len(User.query.all()) + 1,
    'name': data['name'],
    'email': data['email'],
  }
  user = User(**new_user)
  user.set_password = data['password']

  print()
  print('*****USER ADDED*****', { **new_user, 'password': user.hashed_password[:30] })
  print()
  db.session.add(user)
  db.session.commit()
  return jsonify({ **new_user, 'password': user.hashed_password }), 201


@bp.route('/users')
def get_users():
  print()
  print('********GETTING USERS********')
  print()
  users = User.query.all()
  res = [{
    'id': user.id,
    'name': user.name,
    'email': user.email,
    'password': user.password,
    } for user in users]
  return jsonify(res)
