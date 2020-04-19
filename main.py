# https://palletsprojects.com/en/1.1.x/quickstart/#sessions
from flask import Flask, render_template # basic back-end utilities
from flask import redirect, url_for # Redirects
  # url_for("handler_method_name", argument1=None, ...)
  # request.args.get("argument1")
from flask import request, session # Sessions
from flask import jsonify # ...
from flask import flash # for error messages
import json

from DataStore import test_put, test_grab
from User import User

app = Flask(__name__) # definitely secret and not on the GitHub repo
app.secret_key = b'0`[x;g.s|+ddi~9^mc@z?'

# Main page of site; the login
@app.route('/')
@app.route('/login.html')
def login():
  return render_template('login.html')

# Register page
@app.route('/register.html')
def registerPage():
  return render_template('register.html')

@app.route('/register', methods=['POST'])
def register():
  username = request.form.get('username')
  password = request.form.get('password')
  
  user = User(username, password, True)
  entity = test_grab(user)

  if not entity:
    test_put(user, 0, 1)
    return redirect(url_for("login"))
  else: 
    flash("User already exists")
    return render_template('register.html')
  
# Midpage to put user data in a session, routing to the game
@app.route('/to-cow-game', methods=['POST'])
def signin():
  username = request.form.get('username')
  password = request.form.get('password')
  user = User(username, password, True)

  entity = test_grab(user) # user's data
  if not entity:
    flash("User does not exist")
    return render_template('login.html')
  else:
    entity = test_grab(user) # user's data for sure (needed to start game)
    session["userDict"] = user.to_dict()
    return redirect(url_for("game"))

@app.route('/cowclicker.html', methods=['GET', 'POST']) # accept re-routing from form
def game():
  if "userDict" in session:
    username = session["userDict"]["username"]
    password = session["userDict"]["password"]
    user = User(username, password, False)
  else: # check to make sure someone didn't type out this URL
    return redirect(url_for("login"))

  print(type(user)) # is a User
  print(user) # is a User
  entity = test_grab(user) # user's data for sure (needed to start game)

  if entity: # shouldn't ever be empty??????
    return render_template('cowclicker.html', init_points=entity['points'], init_cows=entity['cows'])
    #init_username=entity['username'])
  else:
    return render_template('cowclicker.html', init_points=0, init_cows=1)

# Fired from within cowclicker whenever a cow is clicked
@app.route('/update-user', methods=['POST'])
def save_to_datastore():
  if "userDict" in session:
    username = session["userDict"]["username"]
    password = session["userDict"]["password"]
    user = User(username, password, False)
  else: # check to make sure someone didn't type out this URL
    return redirect(url_for("login"))

  points = request.form["points"]
  cows = request.form["cows"]
  user = User(username, password, False)
  
  test_put(user, points, cows)
  return "OK!"

@app.route('/to-store')
def loadState():
	return json.dumps()

@app.route('/store.html', methods=['GET', 'POST'])
def store():
  if "userDict" in session:
    username = session["userDict"]["username"]
    password = session["userDict"]["password"]
    user = User(username, password, False)
  else: # check to make sure someone didn't type out this URL
    return redirect(url_for("login"))

  print(type(user)) # is a User
  print(user) # is a User
  entity = test_grab(user) # user's data for sure (needed to start game)

  if entity: # shouldn't ever be empty??????
    return render_template('store.html', init_points=entity['points'], init_cows=entity['cows'])
    #, init_username=entity['username'])
  else:
    return render_template('store.html', init_points=0, init_cows=1)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)