from flask import Flask, render_template, request
import flask
from DataStore import test_put, test_grab
from User import User

app = Flask(__name__)


@app.route('/cowclicker.html')
def root():
  user = session.get('user', None)
  entity = test_grab(user) # user's data for sure (needed to start game)
  #points = request.form["points"] #json get points from js 
  return render_template('cowclicker.html', page_title='Index Title Python Variable hehehaha cow', init_points=entity['points'])


@app.route('/to-cow-game', methods=['POST'])
def signin():
    username = flask.request.form.get('username')
    password = flask.request.form.get('password')
    user = User(username, password)

    entity = test_grab(user) # user's data
    if not entity:
      test_put(user, 0, 0) # saves zeroes for new game
    entity = test_grab(user) # user's data for sure (needed to start game)

    session['user'] = user
    return flask.redirect('/cowclicker.html')


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
