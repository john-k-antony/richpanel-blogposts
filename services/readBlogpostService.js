const DataStore = require('../store/datastore');

const getBlogpostById = async (callContext, id) => {
    return new Promise((resolve, reject) => {
        let blogPost = DataStore.get(id);
        resolve(blogPost);
    });
};

module.exports = {
    getBlogpostById
}
  