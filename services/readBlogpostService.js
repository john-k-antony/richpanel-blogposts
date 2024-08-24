const DataStore = require('../store/datastore');
const ResponseError = require('../common/responseerror');
const Constants = require('../config/constants');

const getBlogpostById = async (callContext, id) => {
    return new Promise((resolve, reject) => {
        let blogPost = DataStore.get(id.toString());
        if(blogPost) {
            resolve(blogPost);
        } else {
            reject(new ResponseError(Constants.RESPONSE_ERROR_STATUS_NOT_FOUND, `No blog post found for id: ${id}`));
        }
    });
};

module.exports = {
    getBlogpostById
}
  