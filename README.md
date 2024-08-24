# Richpanel Blog Post API Service

Richpanel blog post API service provides a simple blog post system.

## Introduction

1. Blogpost service is a NodeJS + ExpressJS web server.
2. All the important commands are exposed as npm commands defined in ./package.json.
3. Application is dockerized. Details in ./Dockerfile.
4. ESLint used for performing linting tasks.
5. API specification is created using OpenAPI 3.0 and the open api spec is available in ./api folder. File name: BlogPost.yaml
6. [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) library is used to generate express routers from the open api spec in ./api folder

## Quick Install

### Pre-requisite

Make sure that following components are installed and configured properly

1. Latest version of GIT and cmd line tools
2. Node (Version 20.17.0) and NPM

### Blog Post API Service

To install the dependencies, run the following command in the application folder from the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* To update these packages later on, just run 

```bash
$ npm update
```


*Note: It is recommended to run*

```
$ npm prune
```

*to cleanup the npm dependencies that are no longer required*

## Running Blog Post API Service

Run the application using npm:

```bash
$ npm run start
```

Blog Post API service should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

Explore `.env.development` for development environment configuration options.

### Running in Production mode
To run the application with *production* environment configuration:

```bash
$ npm run start:prod
```

Explore `.env.production` for production environment configuration options.

### Running the linter
To run the ESLint :

```bash
$ npm run lint
```

Explore `eslint.config.mjs` for ESLint configuration options.

## Environment Variables Definition

- PORT  
  HTTP port on which Blog post API server listen to.  
  *Default: 3000*
- LIST_MAX_RECORDS_SIZE
  Maximum number of records (max limit) for the GET /posts listing response. This limiting is enforced a performance improvement  
  *Default: 500*
- API_KEY
  API Key used to authenticate API requests. All the REST API calls should include this API Key value in the HTTP Authorization header as a *bearer* key to authenticate access.

## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)

* Build and Deployment with Docker:
```bash
$ docker build -t richpanel/blogpost .
$ docker run -it --name blogpost-api -p 3000:8080 -e PORT='8080' -e API_KEY='<api_key>' richpanel/blogpost
```
Make sure that an API key is provided for API_KEY env variable and this key should be provided as the **Authorization** bearer HTTP request header when making REST API calls to this server.

## Design Decisions

* API first desing approach is followed. OpenAPI 3.0 api spec is created before the development and used the API spec as the basis for API implementation. express-openapi-validator library is used to auto generate the routes from the API spec.
* A very simple blogPost data model is used in the implementation to keep the implementation simple and quick. In a real scenarion, a blogPost object will be more complex with more data attributes and relation ships.
* User management is NOT implemented. Only a very basic API Key based authentication is provided based on the requirements.
* Response compression is enaled in Express layer to compress the large response results, improving the network latency.
* A hard limit is enforced for the maximum number of records that are returned from the GET /posts listing API. This hard limit is configured via ENV variable - *LIST_MAX_RECORDS_SIZE*
* Basic pagination support is provided for GET /posts listing API with **offset** and **limit** URL paramters. The list response will contain following response HTTP headers
    - Pagination-Count  
      Total number of posts
    - Pagination-Limit  
      Current response length
* The API server is designed and implemented as a state-less micro service and is expected to deploy as a multi instance cluster in a Kubernetes environment for better through put and low latency response times. This service can be easily setup as an elastic deployment with in Kubernetes and will react to HPA (Horizontal Pod Autoscaling) for handling unpredictable traffic.

## Assumptions

* Since this implementation is using an in-memory datastore, adding a caching layer for the GET /posts listing API might not add any significant performance improvement. So additional in-memory caching layer is omitted in this implementation. However, an external caching service like Redis is must have when this application is eventually setup with a SQL/NoSQL data store.

## Performance Load Test

* Provided autocannon load script is slightly modified to test the API server effectively. The modified script is located in test/autocannon/loadtest.js.
* All the API endpoints are tested with the modified script. However, for properly testing the DELETE endpoint, a more complex script is required to send the dynamic post id values for each run. It is possible to modify the script to achieve this. However, because of lack of time, it has been omitted. Because of this, except for the first DELETE call, all the subsequent calls with return an HTTP 404 error because the same post id is repeatedy sent to the DELETE endpoint. This is because the first request deletes the post with the given id.

## Out of scope / further improvements TODO

* GET /posts listing API filtering using graphQL and sorting implementation
* Integrate with external Redis server for caching GET /posts listing API response
* Integration with external OIDC/OAuth2.0 IdP (Identity Provider) for user registration and authentication
* HELM chart for deploying in a Kubernetes cluster
* Adding Prometheus /metric endpoint for capturing real time operation stats, /liveness and /rediness endpoint probes for Kubernetes deployment, integration and instrumentation with Zipkin / similar tracing tools for observability
* Adding unit test cases and code coverage metrics for the entire application code
* Integrating with static code analysis tools like SonarQube for code quality
* Adding pre-commit and pre-push GIT hooks to forcefull run linting and unit testing + code coverage
* Adding GitHub actions to setup CI to build the Docker image on every publish action from GitHub
* Adding more pagination related response HTTP header like current page number, next page number etc for GET /posts listing API
