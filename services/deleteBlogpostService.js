const DataStore = require('../store/datastore');

const deleteBlogpostById = async (id) => {
    return new Promise((resolve, reject) => {
        let blogPost = DataStore.remove(id);
        resolve(blogPost);
    });
};

module.exports = {
    deleteBlogpostById
}
  