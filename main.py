from flask import Flask, render_template, request
from DataStore import test_put
from User import User

app = Flask(__name__)


@app.route('/cowclicker.html')
def root():
  # use render_template to convert the template code to HTML.
  # this function will look in the templates/ folder for your file.
  return render_template('cowclicker.html', page_title='Index Title Python Variable hehehaha cow')


@app.route('/')
@app.route('/index.html')
def login():
  test_put()

  #request form allows python to obtain data from Form in html
  username = request.form['username']
  password = request.form['password']
  user = User(username, password)
 
  # put this into database, will read up on stuff
  return render_template('login.html', page_title='Save your work dude')
  
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
