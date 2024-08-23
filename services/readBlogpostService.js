const BlogPost = require('../models/blogpost');

const getBlogpostById = async (id) => {
    return new Promise((resolve, reject) => {
        let blogPost = new BlogPost(title=`Title for ${id}`, contents=`Content for ${id}`, userId=`User for ${id}`);
        console.log(blogPost)
        resolve(blogPost);
    });
};

module.exports = {
    getBlogpostById
}
  