const getCurrentTS = function() {
    return new Date().toISOString();
}

module.exports = {
    getCurrentTS,
}