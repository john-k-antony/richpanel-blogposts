const BlogPost = require('../models/blogpost');
const DataStore = require('../store/datastore');

const createBlogpost = async (payload) => {
    return new Promise((resolve, reject) => {
        let blogPost = new BlogPost(title=payload.title, contents=payload.contents, userId="1234");
        DataStore.put(blogPost);
        resolve(blogPost);
    });
};

const updateBlogpost = async (id, payload) => {
    return new Promise((resolve, reject) => {        
        resolve(null);
    });
};

module.exports = {
    createBlogpost,
    updateBlogpost,
}
  