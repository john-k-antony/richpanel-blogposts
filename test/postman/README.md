# Postman collection to Test Richpanel Blog Post API Service

## Pre-requisite

* Create a global variable named *blogpost_api_key* and set the value to the API Key that is configured with the Blog Post API server.
* All the collections send the Authorization HTTP header as 'bearer {{blogpost_api_key}}'

## Running the collection

* After setting the *blogpost_api_key* global variable, import all the collections into Postman.
* Run the Bootstrap collection first to create some blog posts in the system. Bootstrap collection uses POST /posts API to generate posts. This collection uses Postman Test scripts to call the create API multiple times.