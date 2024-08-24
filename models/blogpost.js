const idGenerator = require('../utils/idGenerator');
const commonUtils = require('../utils/common');

class Blogpost {
    constructor(title = "", contents="", userId="") {
        this.id = idGenerator.next().toString();
        this.title = title;
        this.contents = contents;
        this.userId = userId;
        this.createdAt = commonUtils.getCurrentTS();
        this.modifiedAt = null;
    }
}

module.exports = Blogpost;