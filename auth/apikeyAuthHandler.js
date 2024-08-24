const CallContext = require('../common/callcontext');


function getBearerToken(req) {
    const authHeader = String(req.headers['authorization'] || '');
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      return token;
    }    
    return null;
}

const authenticate = function(req, scopes, schema) {
    let token = getBearerToken(req);
    if (token) {
        // check the token with env variable API_KEY
        if (token !== process.env.API_KEY) {
            throw Error('Invalid API Key');
        }
        req.userId = `U-${token}`;
        let cc = new CallContext(req);
        req.callContext = cc;
        return true;    
    } else {
        throw Error('No API key provided');  
    }
}

module.exports = {
    authenticate,
}