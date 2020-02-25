from google.cloud import datastore
import os
from User import User

# file is uploaded to github (THE PRIVATE KEY IS SHOWING!!!)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'Cow Clicker 2-b9e05ca406a5.json'

def test_put(user: User, pointsSave, cowSave):
    client = datastore.Client()
    
    kind = 'UserEntityType' # Enum!
    name = user.to_string() # Unique identifier for key... our user
    
    task_key = client.key(kind, name) # We have a key
    task = datastore.Entity(key=task_key) # We have an empty datastore entity

    # Fill the empty entity
    task['points'] = pointsSave 
    task['cows'] = cowSave

    client.put(task) # Put!!!

#Returns NoneType if user doesn't exist
def test_grab(user):
    client = datastore.Client()

    kind = 'UserEntityType' # Enum!
    name = user.to_string() # Unique identifier for key... our user
    
    task_key = client.key(kind, name) # We have a key
    entity = client.get(task_key) # We have the entity for this key
    
    print(str(entity))
    return entity
