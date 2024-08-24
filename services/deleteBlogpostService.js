const DataStore = require('../store/datastore');

const deleteBlogpostById = async (callContext, id) => {
    return new Promise((resolve, reject) => {
        let blogPost = DataStore.remove(id);
        resolve(blogPost);
    });
};

module.exports = {
    deleteBlogpostById
}
  