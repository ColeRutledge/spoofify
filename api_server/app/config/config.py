from os import environ
import datetime



class Config:
  # SQLALCHEMY_ECHO = True
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
  SECRET_KEY = environ.get('SECRET_KEY')
  JWT_ACCESS_TOKEN_EXPIRES = 10800
