const BlogPost = require('../models/blogpost');
const DataStore = require('../store/datastore');
const ResponseError = require('../common/responseerror');
const Constants = require('../config/constants');
const commonUtils = require('../utils/common');

const createBlogpost = async (callContext, payload) => {
    return new Promise((resolve, reject) => {
        let blogPost = new BlogPost(title=payload.title, contents=payload.contents, userId=callContext.getUserId());
        DataStore.put(blogPost);
        resolve(blogPost);
    });
};

const updateBlogpost = async (callContext, id, payload) => {
    return new Promise((resolve, reject) => {      
        let blogPost = DataStore.get(id.toString());
        if(blogPost) {
            // update payload and save the object back to store
            let updatedBlogPost = Object.assign({}, blogPost, {
                title: payload.title, 
                contents: payload.contents,
                modifiedAt: commonUtils.getCurrentTS() 
            })
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
  