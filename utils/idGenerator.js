let currentId = 0;

const generateNextId = function() {
    return ++currentId;
}

module.exports = {
    next: generateNextId
}