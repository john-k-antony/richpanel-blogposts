const BlogPost = require('../models/blogpost');
const DataStore = require('../store/datastore');
const ResponseError = require('../common/responseerror');
const Constants = require('../config/constants');
const commonUtils = require('../utils/common');

const createBlogpost = async (callContext, payload) => {
    return new Promise((resolve, reject) => {
        if (!payload) {
            return reject(new ResponseError(Constants.RESPONSE_ERROR_STATUS_INVALID_INPUT, `No data available to create`));
        }
        let blogPost = new BlogPost(title=payload.title, contents=payload.contents, userId=callContext.getUserId());
        DataStore.put(blogPost);
        resolve(blogPost);
    });
};

const updateBlogpost = async (callContext, id, payload) => {
    return new Promise((resolve, reject) => {      
        if (!id) {
            return reject(new ResponseError(Constants.RESPONSE_ERROR_STATUS_INVALID_INPUT, `No id provided`));
        }
        let blogPost = DataStore.get(id.toString());
        if(blogPost) {
            if (!payload) {
                return reject(new ResponseError(Constants.RESPONSE_ERROR_STATUS_INVALID_INPUT, `No data available to update`));
            }
            let sanitizedPayload = {
                modifiedAt: commonUtils.getCurrentTS(),
            };
            if (payload.title && payload.title.trim().length > 0) {
                sanitizedPayload.title = payload.title;
            }
            if (payload.contents && payload.contents.trim().length > 0) {
                sanitizedPayload.contents = payload.contents;
            }            
            let updatedBlogPost = Object.assign({}, blogPost, sanitizedPayload);
            DataStore.put(updatedBlogPost);
            resolve(updatedBlogPost);
        } else {
            reject(new ResponseError(Constants.RESPONSE_ERROR_STATUS_NOT_FOUND, `No blog post found for id: ${id}`));
        }
        resolve(null);
    });
};

module.exports = {
    createBlogpost,
    updateBlogpost,
}
  