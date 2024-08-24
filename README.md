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

## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)

* Build and Deployment with Docker:
```bash
$ docker build -t richpanel/blogpost .
$ docker run -it --name blogpost-api -p 3000:8080 -e PORT='8080' -e API_KEY='<api_key>' richpanel/blogpost
$
```
Make sure that an API key is provided for API_KEY env variable and this key should be provided as the **Authorization** bearer HTTP request header when making REST API calls to this server.
