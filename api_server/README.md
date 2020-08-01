# Boilerplate for Flask API App

### Steps to Configure Project
1. Edit Pipfile to determine required dependencies
2. Install required dependencies
```bash
pipenv install --dev  
```
3. Configure .flaskenv with correct filename for entry point of app and change name of entry point file ("entry.py") to reflect changes
4. Create a .env file with the following info:
```bash
# include a configured database url to connect db to SQLAlchemy/Flask
DATABASE_URL=postgresql://db_username:password@localhost/db_name

# import secrets 
# secrets.token_hex(16) -> will print 16 bit hex value in Python shell
SECRET_KEY= # include for form.csrf_token 
```
5. If not using forms, remove forms directory
6. If not using pylint, remove setup.cfg along with packages and settings in .vscode directory
7. If not using templates or pug, remove templates directory and/or configuration for pypug
8. Update routes.py in app.routes directory to reflect correct root route
9. Update models.py in app.models directory to reflect correct root model name
10. Update form.py in app.forms directory to reflect correct form name
11. Ensure all init files in subdirectories are importing correct module names based on edits
12. Run the following to confirm that Flask is configured correctly:
```bash
pipenv shell  # start venv flask run
flask run     # start app on port 5000 by default
```
13. Run the following to confirm database connection to app:
```bash
flask db init   # will create migrations folder

# add to migrations/alembic.ini for time stamps on migrations:
file_template = %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s

# after models have been created run the following commands:
flask db migrate -m 'comment'   # will create tables migration files from models
flask db upgrade                # will create tables in database
```
## Happy coding!
