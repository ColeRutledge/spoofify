#!/usr/bin/env bash
pip3 install -r /app/requirements.txt
python3 entry.py db upgrade
python3 database.py
python3 entry.py run -h 0.0.0.0
# gunicorn app:app
