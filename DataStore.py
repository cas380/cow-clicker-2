from google.cloud import datastore
from User import User

USER = 'User'

def test_put():
    client = datastore.Client()
    
    kind = 'UserEntityType' # Enum!
    name = 'uniqueID' # Unique identifier for key...
    
    task_key = client.key(kind, name) # We have a key
    task = datastore.Entity(key=task_key) # We have an empty datastore entity
    task['description'] = 'Buy milk' # Fill the empty entity
    client.put(task) # Put!!!!!!!!!!

def load_key(client, item_id=None):
    client = datastore.Client()
    key = None
    
    if item_id:
        key = client.key(USER, int(item_id))
    else:
        key = client.key(USER)
    return key


def get_users(User):
    client = datastore.Client() # establish the client
    query = client.query(kind=USER) # build a query
    user_items = list(query.fetch()) # execute the query
    result = list()             # convert the datastore etities to objects
    for item in user_items:
        result.append(convert_to_object(item))

    log('')


def log(msg):
    print(DataStore.py:)

def convert_to_object(entity):
    user_id = entity.key.id_or_name
    return User(user_id, entity['username'], entity['password'])

