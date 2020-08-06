#!/usr/bin/env bash
pip3 install -r /app/requirements.txt
python3 entry.py db upgrade
gunicorn app:app
