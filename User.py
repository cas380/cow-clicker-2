# User object containing username and password
# stored in database
from hashlib import sha256

class User(object):
    def __init__(self, username, password, doHash):
        self.username = username
        if doHash:
            self.password = sha256(bytes(password, encoding='utf-8')).hexdigest()
            # if password == '5ab5c89513f...' some hash
        else:
            self.password = password
    
    def to_dict(self):
        return {
            'username': self.username,
            'password': self.password,
        }

    def get_username(self):
        return self.username

    def get_password(self):
        return self.password

    def to_string(self):
        return "User({}, {})".format(self.username, self.password)