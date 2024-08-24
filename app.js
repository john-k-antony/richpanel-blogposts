const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
var compression = require('compression')
const OpenApiValidator = require('express-openapi-validator');
const ApiKeyAuthHandler = require('./auth/apikeyAuthHandler');
const ErrorHandler = require('./handlers/errorResponseHandler');

require('dotenv').config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'});

const port = process.env.PORT;
const app = express();
app.use(compression({ filter: (req, res) => {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }    
    // fallback to standard filter function
    return compression.filter(req, res)
    }    
}));
const apiSpec = path.join(__dirname, 'api', 'BlogPost.yaml');

// Install bodyParsers for the request types that the API will support
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(logger('dev'));

app.use('/spec', express.static(apiSpec));

// Install the OpenApiValidator on your express app
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: true, // default false
    validateSecurity: {
        handlers: {
            APIKey: function(req, scopes, schema) {
                return ApiKeyAuthHandler.authenticate(req, scopes, schema);
            },
        }
    },    
    // Provide the base path to the operation handlers directory
    operationHandlers: path.join(__dirname), // default false
  })
);

// Create a custom error handler
app.use((err, req, res, next) => {
  // format errors
  return ErrorHandler.getResponseError(err, res);
});

http.createServer(app).listen(port);
console.log(`Listening on port ${port}`);

module.exports = app;