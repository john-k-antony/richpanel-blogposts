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
    let end = (limit && limit > 0) ? (start + limit) : dataStore.size
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