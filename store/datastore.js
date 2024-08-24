const Constants = require('../config/constants');

let dataStore = new Map();

const put = function(data) {
    dataStore.set(data.id, data);
}

const get = function(id) {
    return dataStore.get(id);
}

const remove = function(id) {
    let data = dataStore.get(id);
    dataStore.delete(id);
    return data;
}

const list = function(offset, limit) {
    let list = Array.from(dataStore.values());
    let start = (offset && offset > 0) ? offset: 0;

    let maxRecordSize = +process.env.LIST_MAX_RECORDS_SIZE ?
     +process.env.LIST_MAX_RECORDS_SIZE : Constants.DEFAULT_LIST_MAX_RECORDS_SIZE;

    let updatedLimit = (limit && limit > 0) ? limit : maxRecordSize;
    if (updatedLimit > maxRecordSize) {
        updatedLimit = maxRecordSize;
    }
    
    let end = start + updatedLimit;
    return list.slice(start, end);
}

const size = function() {
    return dataStore.size;
}

module.exports = {
    put,
    get,
    remove,
    list,
    size,
}