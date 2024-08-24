const commonUtils = require('../utils/common');

class CallContext {
    constructor(request) {
        try {
            if (!request) {
              throw new Error('Request is required');
            }
            this.request = request;
            this.userId = request.userId;
            this.createdAt = commonUtils.getCreateTS();
        } catch (error) {
        console.log('Error creating CallContext: ', error);
        throw error;
        }
    }

    getUserId() {
        return this.userId;
    }
}

module.exports = CallContext;