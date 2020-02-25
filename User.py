# User object containing username and password
# stored in database
from hashlib import sha256

class User(object):
    def __init__(self, username, password):
        self.username = username
        self.password = sha256(password).hexdigest()
        # if password == '5ab5c89513f...' some hash
    
    def to_dict(self):
        return {
            'username': self.username,
            'password': self.password,
        }

    def to_string(self):
        return "User({}, {})".format(self.username, self.password)