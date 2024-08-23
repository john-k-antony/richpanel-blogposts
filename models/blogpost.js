const idGenerator = require('../utils/idGenerator');

class Blogpost {
    #currentId = 0;
    constructor(title = "", contents="", userId="") {
        this.id = this.#generateID().toString();
        this.title = title;
        this.contents = contents;
        this.userId = userId;
        this.createdAt = this.#getCreateTS();
    }

    #generateID() {
        return idGenerator.next();
    }

    #getCreateTS() {
        return new Date().toISOString();
    }
}

module.exports = Blogpost;