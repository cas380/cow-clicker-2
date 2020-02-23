from google.cloud import datastore

def test_put():
    client = datastore.Client()
    
    kind = 'UserEntityType' # Enum!
    name = 'uniqueID' # Unique identifier for key...
    
    task_key = client.key(kind, name) # We have a key
    task = datastore.Entity(key=task_key) # We have an empty datastore entity
    task['description'] = 'Buy milk' # Fill the empty entity
    client.put(task) # Put!!!!!!!!!!
