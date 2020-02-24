from google.cloud import datastore

def test_put(user, pointsSave, cowSave):
    client = datastore.Client()
    
    kind = 'UserEntityType' # Enum!
    name = str(user) # Unique identifier for key... our user
    
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
    name = str(user) # Unique identifier for key... our user
    
    task_key = client.key(kind, name) # We have a key
    entity = client.get(key) # We have the entity for this key
    
    print(str(entity))
    return entity
