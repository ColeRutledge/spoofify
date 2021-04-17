<h2 align='center'>Spoofify</h2>
<h3 align='center'>A clone of the popular music streaming service built with Python, Flask, ReactJS, and PostgreSQL</h3>
</br>

---

</br>
<p>This was a team based project done during the Python and Flask curriculum of the App Academy six month bootcamp program. In it, we used a client side ReactJS app to talk with a Flask API server to retrieve relevant data to power the UI. It was a great project that really helped us develop a better understanding of working with modern web application architecture, authentication, and it was our first introduction to the wonderful world of Docker!</p>

### Takeaways:

<ul>
    <li>The team-based development experience with Docker and docker-compose was excellent!</li>
    <li>Working with the Spotify API to generate data for the application was simple and helpful.</li>
    <li>Using JSON Web Tokens (JWT) for auth was much more flexible than using session based auth in Express.</li>
    <li>React Hook Form was an amazing package to work with for handling form validation and error handling.</li>
</ul>

### Usage:

1. Clone project
2. Create .env files in the root directory (example.env included and below)
3. Create .env file in api_server directory with a `DATABASE_URL`
4. From the root directory, run `docker-compose up`

</br>

```bash
# .env example

# required in the root of the project
FLASK_ENV=development
POSTGRES_USER=db_user
POSTGRES_PASSWORD=password
POSTGRES_DB=db_name

# required inside of api_server/.env
DATABASE_URL=postgresql://db_user:password@postgres/db_name
```

---

<p style="margin-top: 5%" align='center'>
    <a href='https://spotify-clone-aa-react.herokuapp.com/' target='_blank'>Link to live demo -> Click Login and then on Demo User</a><br><i>you may have to give Heroku a minute!<i></br>
</p>

</br>

![screenshot](https://colerutledge.dev/static/img/spoofify.png)
