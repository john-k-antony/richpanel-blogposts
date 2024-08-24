const DataStore = require('../store/datastore');
const ResponseError = require('../common/responseerror');
const Constants = require('../config/constants');

const listBlogposts = function(callContext, offset, limit) {
    return new Promise((resolve, reject) => {
        let blogPosts = DataStore.list(offset, limit);
        let totalSize = DataStore.size();
        resolve({size: totalSize, data: blogPosts});
    });
}

module.exports = {
    listBlogposts
}
