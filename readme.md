# Documentation for the Identity API
This API allows users to create an identity consisting of their email, name, and country, it also gives them the flexibility to manipulate their identity with whatever CRUD operation they like. All successful requests returns a JSON in this format {message: Request successful, data: {}}. All errors are returned as a text.

# Base URL
- https://identity-apis.herokuapp.com

# Endpoints or Routes
The endpoint and their description  are as follows

## Create Identity
- <b>Endpoint:</b> /identity
- <b>Method:</b> POST
- <b>Description:</b> 
    - It creates a new identity. 
    - You must provide all the fields email, name and country in your request body as JSON or else this will return an error.

## Read Identity
Please note that all queries to the database are case sensistive.    
This consists of 2 endpoints:

### 1. Fetch identities using query parameters
- <b>Endpoint:</b> /identity
- <b>Method:</b> GET
- <b>Description:</b> 
    - It returns every identity in the database that matches the query parameters you provide. 
    - If you don't provide any parameters, it will return all the records in the database.

### 2. Fetch identities using an id
- <b>Endpoint:</b> /identity/id
- <b>Method:</b> GET
- <b>Description:</b> 
    - It returns the identity in the database that matches the given id.
    - If the id is incorrect or the identity doesn't exist, it'll return an error.

## Update Identity
Please note that all queries to the database are case sensistive.   
This consists of 2 endpoints:

### 1. Update identities using query parameters
- <b>Endpoint:</b> /identity
- <b>Method:</b> PATCH
- <b>Description:</b> 
    - It updates the first identity in the database that matches the query parameters you provide. 
    - If you don't provide any parameters, it will return return an error. 
    - You must provide the new set of data in your request body or else it'll return an error
    - You can update an identity using the email query parameter as this is a unique field for all identities.


### 2. Update identities using an id
- <b>Endpoint:</b> /identity/id
- <b>Method:</b> PATCH
- <b>Description:</b> 
    - It updates the identity in the database that matches the given id. 
    - If the id is incorrect or the identity doesn't exist, it'll return an error.

## Delete Identity
Please note that all queries to the database are case sensistive.  
This consists of 2 endpoints:

### 1. Delete identities using query parameters
- <b>Endpoint:</b> /identity
- <b>Method:</b> DELETE
- <b>Description:</b> 
    - It deletes the first identity in the database that matches the query parameters you provide. 
    - If you don't provide any parameter, it will return an error.
    - This is a safe precaution to avoid deleting all the entries in the database by mistake.

### 2. Delete identities using an id
- <b>Endpoint:</b> /identity/id
- <b>Method:</b> DELETE
- <b>Description:</b> 
    - It deletes the identity in the database that matches the given id.
    - If the id is incorrect or the identity doesn't exist, it'll return an error.


# That's All!
This is the solution to a task given to us by Mr. Buka from the Zuri Training first edition. It lead me to do a lot of research and I hope my answers are tailored to real life scenerios.   

# Thank you.
