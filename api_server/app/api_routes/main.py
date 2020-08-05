from flask import Blueprint, render_template, jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import exists
from app.models import db, User


bp = Blueprint('index', __name__)


# @bp.before_request
# def to_allowed_host():
#   if 'host.docker.internal' not in request.url_root:
#     abort(403)
  # if request.remote_addr != '127.0.0.1':
  #   abort(403)


@bp.route('/')
def index():
  return render_template('index.pug')


@bp.route('/register', methods=['POST'])
def create_user():
  data = request.get_json()

  (ret, ), = db.session.query(exists().where(User.email == data['email']))
  if ret:
    return {'error': 'User already exists. Please try again.'}

  new_user = {
    'id': len(User.query.all()) + 1,
    'user_name': data['userName'],
    'first_name': data['firstName'],
    'last_name': data['lastName'],
    'email': data['email'],
  }

  user = User(**new_user)
  user.set_password = data['password']

  print()
  print('*****USER ADDED*****', { **new_user, 'password': user.hashed_password[:30] })
  print()
  db.session.add(user)
  db.session.commit()
  return {'token': user.get_token()}, 201


@bp.route('/users')
@jwt_required
def get_users():
  print()
  print('********GETTING USERS********')
  print()
  users = User.query.all()
  res = [{
    'id': user.id,
    'user_name': user.user_name,
    'first_name': user.first_name,
    'last_name': user.last_name,
    'email': user.email,
    #'first_name': user.first_name,
    #'last_name': user.last_name,
    'password': user.password,
    } for user in users]
  return jsonify(res), 200


@bp.route('/login', methods=['POST'])
def login():

  data = request.get_json()
  email = data['email']
  password = data['password']

  print()
  print('********GETTING TOKEN********')
  print()

  try:
    user = User.query.filter(User.email == email).one()
    return {'token': user.get_token()} if user.check_password(password) else {'error': 'Login failed.'}
  except:
    return {'error': 'Login failed.'}
