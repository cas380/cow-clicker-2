from flask import Flask, render_template, request, session
# RuntimeError: The session is unavailable because no secret key was set. 
# Set the secret_key on the application to something unique and secret.
import flask
from DataStore import test_put, test_grab
from User import User

app = Flask(__name__)

@app.route('/cowclicker.html', methods=['GET', 'POST']) # accept re-routing from form
def game():
  user = request.data
  entity = test_grab(user) # user's data for sure (needed to start game)
  #points = request.form["points"] #json get points from js                                        # entity['points']
  return render_template('cowclicker.html', page_title='Index Title Python Variable hehehaha cow', init_points=entity['points'])
#Nonetype from entity error 

@app.route('/to-cow-game', methods=['POST'])
def signin():
    username = flask.request.form.get('username')
    password = flask.request.form.get('password')
    user = User(username, password)

    entity = test_grab(user) # user's data
    if not entity:
      test_put(user, 0, 0) # saves zeroes for new game
    entity = test_grab(user) # user's data for sure (needed to start game)

    return flask.redirect(flask.url_for('game', data=user), code=307) # Redirect code


@app.route('/store.html')
def store():
  return render_template('store.html', page_title='Buy some cows pls')


@app.route('/')
@app.route('/login.html')
def login():
  # put this into database, will read up on stuff
  return render_template('login.html', page_title='Save your work dude')
  
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
